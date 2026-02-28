import { getAdminDb } from "@/lib/firebase-admin";
import RSS from "rss";
import { NextResponse } from "next/server";

export const revalidate = 600; // Cache for 10 minutes

function parseRSSDate(date: any): Date {
    if (!date) return new Date();
    if (typeof date.toDate === 'function') return date.toDate();
    if (date instanceof Date) return date;
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) return parsed;
    return new Date();
}

function getImageType(url: string): string {
    if (!url) return 'image/jpeg';
    const lower = url.toLowerCase();
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.gif')) return 'image/gif';
    if (lower.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
}

export async function GET(request: Request) {
    const db = getAdminDb();
    if (!db) {
        return new NextResponse("Database not initialized", { status: 500 });
    }

    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "opinno.com";
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    // Read lang from middleware header (/{lang}/feed rewrite) or query param
    const { searchParams } = new URL(request.url);
    const lang = request.headers.get('x-feed-lang') || searchParams.get('lang') || 'en';
    const categoryFilter = searchParams.get('category'); // optional: 'insights' or 'story'

    const feedTitle = categoryFilter
        ? `Opinno | ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}`
        : 'Opinno | All Content';

    const feed = new RSS({
        title: feedTitle,
        description: `Latest content from Opinno - Innovation consulting and beyond. Ref: ${new Date().getTime()}`,
        feed_url: `${siteUrl}/feed?lang=${lang}${categoryFilter ? `&category=${categoryFilter}` : ''}`,
        site_url: `${siteUrl}/${lang}`,
        image_url: `${siteUrl}/favicon.png`,
        language: lang,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Opinno`,
        custom_namespaces: {
            'media': 'http://search.yahoo.com/mrss/'
        }
    });

    try {
        // Query using simple field combinations that have existing indexes.
        // Status and date filtering/sorting are done in application code
        // (matching the pattern used by the rest of the site).
        let docs: any[] = [];

        if (categoryFilter) {
            // Query for the specific category (category + lang has an existing index)
            const snapshot = await db.collection("content")
                .where("lang", "==", lang)
                .where("category", "==", categoryFilter)
                .limit(100)
                .get();
            docs = snapshot.docs;

            // Also fetch legacy 'insight' posts if querying 'insights'
            if (categoryFilter === 'insights') {
                const legacySnapshot = await db.collection("content")
                    .where("lang", "==", lang)
                    .where("category", "==", "insight")
                    .limit(100)
                    .get();
                docs = [...docs, ...legacySnapshot.docs];
            }
        } else {
            // Fetch both main categories to get all content
            const [insightsNew, insightsLegacy, storyDocs] = await Promise.all([
                db.collection("content")
                    .where("lang", "==", lang)
                    .where("category", "==", "insights")
                    .limit(100)
                    .get(),
                db.collection("content")
                    .where("lang", "==", lang)
                    .where("category", "==", "insight")
                    .limit(100)
                    .get(),
                db.collection("content")
                    .where("lang", "==", lang)
                    .where("category", "==", "story")
                    .limit(100)
                    .get(),
            ]);
            docs = [...insightsNew.docs, ...insightsLegacy.docs, ...storyDocs.docs];
        }

        // Deduplicate, filter by status, and ensure title exists
        const seen = new Set<string>();
        docs = docs.filter(doc => {
            if (seen.has(doc.id)) return false;
            seen.add(doc.id);
            const data = doc.data();
            const status = data.status || '';
            return data.title && (status === 'published' || status === 'featured');
        });

        // Sort by publishedAt descending
        docs.sort((a, b) => {
            const dateA = parseRSSDate(a.data().publishedAt).getTime();
            const dateB = parseRSSDate(b.data().publishedAt).getTime();
            return dateB - dateA;
        });

        // Limit to 50 items
        docs = docs.slice(0, 50);

        docs.forEach((doc) => {
            const data = doc.data();
            let imageUrl = data.featuredImage || data.thumbnailUrl || data.bannerUrl || '';
            if (imageUrl && imageUrl.startsWith('http://')) {
                imageUrl = imageUrl.replace('http://', 'https://');
            }
            const imageType = getImageType(imageUrl);
            const tags = data.wpTags || data.tags || [];
            const postUrl = `${siteUrl}/${data.lang || lang}/${data.slugPath || ''}`;

            const item: any = {
                title: data.title || "Untitled",
                description: `<div>${imageUrl && !imageUrl.includes('?') ? `<img src="${imageUrl}" style="max-width:100%; margin-bottom: 20px;" /><br/>` : ""}${data.excerpt || ""}</div>`,
                url: postUrl,
                guid: doc.id,
                categories: [data.cmsCategory || data.category || "General", ...tags],
                author: data.author || "Opinno",
                date: parseRSSDate(data.publishedAt || data.createdAt),
                custom_elements: [
                    { "content:encoded": data.htmlContent || data.content || data.excerpt || "" },
                ],
            };

            // Add subtitle if present
            if (data.subtitle) {
                item.custom_elements.push({ "subtitle": data.subtitle });
            }

            // Add image as enclosure and media:content
            if (imageUrl && !imageUrl.includes('?')) {
                item.enclosure = { url: imageUrl, type: imageType };
                item.custom_elements.push({
                    'media:content': {
                        _attr: {
                            url: imageUrl,
                            medium: 'image',
                            type: imageType
                        }
                    }
                });
            }

            feed.item(item);
        });

        const xml = feed.xml();

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/rss+xml; charset=utf-8",
                "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
            },
        });
    } catch (error) {
        console.error("Error generating RSS feed:", error);
        return new NextResponse("Error generating feed", { status: 500 });
    }
}
