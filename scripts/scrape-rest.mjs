import axios from 'axios';
import * as cheerio from 'cheerio';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    projectId: "opinnowebsite",
    appId: "1:571973007321:web:849308facc4e9ce67f8bc8",
    storageBucket: "opinnowebsite.firebasestorage.app",
    apiKey: "AIzaSyDN9iuyp9g9R-_qCwZFpf_HMCATPyAxzNA",
    authDomain: "opinnowebsite.firebaseapp.com",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeSitemap() {
    console.log("Scraping sitemap links...");
    try {
        // Fetch all possible links from the homepage which gives a good overview of content structure
        const { data } = await axios.get('https://opinno.com/');
        const $ = cheerio.load(data);
        
        const allLinks = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.startsWith('https://opinno.com/')) {
                allLinks.push(href);
            }
        });
        
        const uniqueLinks = [...new Set(allLinks)];
        
        // Filter out irrelevant links like social media, pagination, etc.
        const contentLinks = uniqueLinks.filter(link => {
            const pathParts = new URL(link).pathname.split('/').filter(Boolean);
            if(pathParts.length < 2) return false; // skip root folders like /work/ or /about/ (already done)
            if(['feed', 'wp-json', 'tag', 'category', 'comments', 'author'].includes(pathParts[0])) return false;
            return true;
        });

        console.log(`Found ${contentLinks.length} nested content links.`);

        // Process a batch to populate the database properly
        let i = 0;
        for (const link of contentLinks.slice(0, 50)) { // Get a good batch of 50 varied pages
            const pathParts = new URL(link).pathname.split('/').filter(Boolean);
            let slug = pathParts[pathParts.length - 1]; // Use last part as slug usually
            if(!slug || slug.length < 3) continue;
            
            // Generate a unique clean slug
            slug = pathParts.join('-');
            
            console.log(`[${i++/50}] Scraping: ${link}...`);
            try {
                const pageRes = await axios.get(link);
                const $page = cheerio.load(pageRes.data);
                
                const title = $page('title').text().split('-')[0].trim() || $page('h1').first().text().trim() || slug.toUpperCase();
                
                $page('script, style, noscript, nav, footer, header').remove();
                
                // Content extraction strategy
                let cleanText = '';
                if ($page('main').length) cleanText = $page('main').text();
                else if ($page('.elementor-section-wrap').length) cleanText = $page('.elementor-section-wrap').text(); 
                else cleanText = $page('body').text();
                
                cleanText = cleanText.replace(/\s+/g, ' ').trim();
                
                // Image extraction
                let heroImage = $page('meta[property="og:image"]').attr('content') || $page('.elementor-image img').first().attr('src') || $page('img').first().attr('src') || '';
                if (heroImage && !heroImage.startsWith('http')) {
                    heroImage = `https://opinno.com${heroImage.startsWith('/') ? '' : '/'}${heroImage}`;
                }
                
                // Categorize
                let type = 'post';
                if(pathParts[0] === 'story' || pathParts[0] === 'stories') type = 'case-study';
                
                const docData = {
                    title,
                    content: cleanText || "Content could not be accurately scraped from this page layout.",
                    slugPath: slug,
                    lang: 'en',
                    excerpt: cleanText ? cleanText.substring(0, 200) + '...' : "No excerpt available.",
                    type,
                    publishedAt: new Date().toISOString(),
                    featuredImage: heroImage
                };
        
                await setDoc(doc(db, 'content', slug), docData);
                console.log(`✅ Saved ${slug} (${type})`);
            } catch (innerError) {
                 console.error(`❌ Error scraping ${link}:`, innerError.message);
            }
            await delay(1000); // polite scraping
        }

    } catch (error) {
        console.error(`❌ Error fetching base links:`, error.message);
    }
    console.log("Migration Complete.");
    process.exit(0);
}

scrapeSitemap();
