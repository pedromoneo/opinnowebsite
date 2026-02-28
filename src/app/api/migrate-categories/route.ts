import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

/**
 * Migration API to fix category/subCategory/cmsCategory on all existing posts.
 *
 * Mapping (based on existing data patterns):
 *
 *   Existing data                          → Correct values
 *   ─────────────────────────────────────────────────────────────────
 *   category=insight, subCategory=articles  → insights / insights  / insights
 *   category=insight, subCategory=voices    → insights / voices    / voices
 *   category=insight, subCategory=publications → insights / publications / publications
 *   category=insight, subCategory=none      → insights / insights  / insights
 *   category=story,  subCategory=impact     → story   / impact    / impact stories
 *   category=story,  subCategory=news       → story   / news      / news
 *   category=story,  subCategory=press-releases → story / press-releases / press releases
 *   category=story,  subCategory=press      → story   / press     / press releases
 *   category=story,  subCategory=none       → story   / impact    / impact stories
 *   category=page   (any sub)               → SKIP (leave pages unchanged)
 *   cmsCategory=article (legacy)            → same logic as above based on category
 *   category=(empty)                        → insights / insights  / insights
 *
 * GET  → dry run (shows what would change)
 * POST → execute migration
 */

function deriveFields(data: Record<string, any>): {
    cmsCategory: string;
    category: string;
    subCategory: string;
    changes: string[];
    skip: boolean;
} {
    const changes: string[] = [];
    const rawCategory = (data.category || '').toLowerCase();
    const rawSubCategory = (data.subCategory || '').toLowerCase();
    const rawCmsCategory = (data.cmsCategory || '').toLowerCase();

    // Skip pages entirely — they don't need category migration
    if (rawCategory === 'page') {
        return { cmsCategory: data.cmsCategory || '', category: data.category, subCategory: data.subCategory || '', changes: [], skip: true };
    }

    let category: string;
    let subCategory: string;
    let cmsCategory: string;

    // Step 1: If cmsCategory is already set and valid, use it as source of truth
    if (rawCmsCategory && rawCmsCategory !== 'article') {
        // cmsCategory already set to a valid value — derive category + subCategory from it
        if (rawCmsCategory === 'news') {
            category = 'story';
            subCategory = 'news';
            cmsCategory = 'news';
        } else if (rawCmsCategory === 'impact stories') {
            category = 'story';
            subCategory = 'impact';
            cmsCategory = 'impact stories';
        } else if (rawCmsCategory === 'press releases') {
            category = 'story';
            subCategory = 'press-releases';
            cmsCategory = 'press releases';
        } else if (rawCmsCategory === 'voices') {
            category = 'insights';
            subCategory = 'voices';
            cmsCategory = 'voices';
        } else if (rawCmsCategory === 'publications') {
            category = 'insights';
            subCategory = 'publications';
            cmsCategory = 'publications';
        } else {
            // 'insights' or any unknown → default to insights
            category = 'insights';
            subCategory = 'insights';
            cmsCategory = 'insights';
        }
    } else {
        // Step 2: No cmsCategory (or legacy 'article') — infer from existing category + subCategory
        if (rawCategory === 'story' || rawCategory === 'stories') {
            if (rawSubCategory === 'news') {
                category = 'story';
                subCategory = 'news';
                cmsCategory = 'news';
            } else if (rawSubCategory === 'press-releases' || rawSubCategory === 'press') {
                category = 'story';
                subCategory = rawSubCategory; // preserve press-releases or press
                cmsCategory = 'press releases';
            } else {
                // impact, none, or any other → default to impact stories
                category = 'story';
                subCategory = 'impact';
                cmsCategory = 'impact stories';
            }
        } else if (rawCategory === 'insight' || rawCategory === 'insights') {
            if (rawSubCategory === 'voices') {
                category = 'insights';
                subCategory = 'voices';
                cmsCategory = 'voices';
            } else if (rawSubCategory === 'publications') {
                category = 'insights';
                subCategory = 'publications';
                cmsCategory = 'publications';
            } else {
                // articles, none, insights, or any other → default to insights
                category = 'insights';
                subCategory = 'insights';
                cmsCategory = 'insights';
            }
        } else {
            // Empty category or unknown → default to insights
            category = 'insights';
            subCategory = 'insights';
            cmsCategory = 'insights';
        }
    }

    // Record what changed
    if (data.category !== category) {
        changes.push(`category: '${data.category || '(empty)'}' → '${category}'`);
    }
    if ((data.subCategory || '') !== subCategory) {
        changes.push(`subCategory: '${data.subCategory || '(empty)'}' → '${subCategory}'`);
    }
    if ((data.cmsCategory || '') !== cmsCategory) {
        changes.push(`cmsCategory: '${data.cmsCategory || '(empty)'}' → '${cmsCategory}'`);
    }

    return { cmsCategory, category, subCategory, changes, skip: false };
}

export async function GET() {
    try {
        const db = getAdminDb();
        if (!db) {
            return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
        }

        const snapshot = await db.collection('content').get();
        const report: any[] = [];

        let skippedPages = 0;

        snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const { cmsCategory, category, subCategory, changes, skip } = deriveFields(data);

            if (skip) {
                skippedPages++;
                return;
            }

            if (changes.length > 0) {
                report.push({
                    id: doc.id,
                    title: data.title?.substring(0, 80),
                    lang: data.lang,
                    current: {
                        cmsCategory: data.cmsCategory || '(empty)',
                        category: data.category || '(empty)',
                        subCategory: data.subCategory || '(empty)',
                    },
                    proposed: { cmsCategory, category, subCategory },
                    changes,
                });
            }
        });

        return NextResponse.json({
            mode: 'DRY RUN',
            totalDocs: snapshot.size,
            skippedPages,
            docsToUpdate: report.length,
            docsUnchanged: snapshot.size - report.length - skippedPages,
            updates: report,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // Require API key for safety
        const apiKey = req.headers.get('x-api-key');
        const validApiKey = process.env.CMS_API_KEY;
        if (!validApiKey || apiKey !== validApiKey) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = getAdminDb();
        if (!db) {
            return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
        }

        const snapshot = await db.collection('content').get();
        const results: any[] = [];
        let updated = 0;
        let skipped = 0;

        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            const { cmsCategory, category, subCategory, changes, skip } = deriveFields(data);

            if (skip) {
                skipped++;
                continue;
            }

            if (changes.length > 0) {
                await db.collection('content').doc(docSnap.id).update({
                    cmsCategory,
                    category,
                    subCategory,
                });
                updated++;
                results.push({
                    id: docSnap.id,
                    title: data.title?.substring(0, 60),
                    changes,
                });
            } else {
                skipped++;
            }
        }

        return NextResponse.json({
            mode: 'EXECUTED',
            totalDocs: snapshot.size,
            updated,
            skipped,
            results,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
