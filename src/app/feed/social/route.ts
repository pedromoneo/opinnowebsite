import { getAdminDb } from "@/lib/firebase-admin";
import RSS from "rss";
import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

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

    // Read lang from middleware header (/{lang}/feed/social rewrite) or query param
    const { searchParams } = new URL(request.url);
    const lang = request.headers.get('x-feed-lang') || searchParams.get('lang') || 'en';
    const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 50);

    const feed = new RSS({
        title: "Opinno | Social Feed (LinkedIn)",
        description: "Social media posts optimized for LinkedIn generated via AI.",
        feed_url: `${siteUrl}/feed/social?lang=${lang}`,
        site_url: `${siteUrl}/${lang}`,
        image_url: `${siteUrl}/favicon.png`,
        language: lang,
        pubDate: new Date(),
        custom_namespaces: {
            'media': 'http://search.yahoo.com/mrss/'
        }
    });

    try {
        // Query using simple field combinations that have existing indexes.
        // Status filtering and sorting done in application code.
        const [insightsNew, insightsLegacy, storyDocs] = await Promise.all([
            db.collection("content")
                .where("lang", "==", lang)
                .where("category", "==", "insights")
                .limit(50)
                .get(),
            db.collection("content")
                .where("lang", "==", lang)
                .where("category", "==", "insight")
                .limit(50)
                .get(),
            db.collection("content")
                .where("lang", "==", lang)
                .where("category", "==", "story")
                .limit(50)
                .get(),
        ]);

        // Merge, deduplicate, filter by status, and sort
        const seen = new Set<string>();
        let allDocs = [...insightsNew.docs, ...insightsLegacy.docs, ...storyDocs.docs]
            .filter(doc => {
                if (seen.has(doc.id)) return false;
                seen.add(doc.id);
                const data = doc.data();
                const status = data.status || '';
                return data.title && (status === 'published' || status === 'featured');
            })
            .sort((a, b) => {
                const dateA = parseRSSDate(a.data().publishedAt).getTime();
                const dateB = parseRSSDate(b.data().publishedAt).getTime();
                return dateB - dateA;
            })
            .slice(0, limit);

        allDocs.forEach((doc) => {
            const data = doc.data();
            let imageUrl = data.featuredImage || data.thumbnailUrl || data.bannerUrl || '';
            if (imageUrl && imageUrl.startsWith('http://')) {
                imageUrl = imageUrl.replace('http://', 'https://');
            }
            const imageType = getImageType(imageUrl);

            // Priority: Pre-generated AI social post -> Excerpt -> Title
            const socialText = data.socialPosts?.linkedin || data.excerpt || data.title;
            const postUrl = `${siteUrl}/${data.lang || lang}/${data.slugPath || ''}`;

            const item: any = {
                title: socialText,
                description: `<div>${imageUrl && !imageUrl.includes('?') ? `<img src="${imageUrl}" style="max-width:100%; margin-bottom: 20px;" /><br/>` : ""}${data.excerpt || data.title || ""}</div>`,
                url: postUrl,
                guid: doc.id,
                date: parseRSSDate(data.publishedAt || data.createdAt),
                custom_elements: []
            };

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
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (error) {
        console.error("Error generating Social RSS feed:", error);
        return new NextResponse("Error generating social feed", { status: 500 });
    }
}
