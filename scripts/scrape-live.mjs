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

const PAGES_TO_SCRAPE = [
    { url: 'https://opinno.com/about/', slug: 'about' },
    { url: 'https://opinno.com/open-innovation/', slug: 'open-innovation' },
    { url: 'https://opinno.com/corporate-transformation/', slug: 'corporate-transformation' },
    { url: 'https://opinno.com/venture-building/', slug: 'venture-building' },
    { url: 'https://opinno.com/clients/', slug: 'clients' },
    { url: 'https://opinno.com/work/', slug: 'work' },
];

async function scrapePage(pageData) {
    console.log(`Scraping ${pageData.url}...`);
    try {
        const { data } = await axios.get(pageData.url);
        const $ = cheerio.load(data);

        const title = $('title').text().split('-')[0].trim() || $('h1').first().text().trim() || pageData.slug.replace('-', ' ').toUpperCase();

        // Remove structural elements that shouldn't be in the article body
        $('script, style, noscript, nav, footer, header').remove();

        const $main = $('main').length ? $('main') : $('body');
        const cleanText = $main.text().replace(/\s+/g, ' ').trim();

        // Get a high quality image
        const ogImage = $('meta[property="og:image"]').attr('content');
        const firstImg = $('img').first().attr('src');
        let heroImage = ogImage || firstImg || '';

        if (heroImage && !heroImage.startsWith('http')) {
            heroImage = `https://opinno.com${heroImage.startsWith('/') ? '' : '/'}${heroImage}`;
        }

        const docData = {
            title,
            // Store cleaned up text as content, adding some markdown-like line break mapping
            content: cleanText,
            slugPath: pageData.slug,
            lang: 'en',
            excerpt: cleanText.substring(0, 200) + '...',
            type: 'page',
            publishedAt: new Date().toISOString(),
            featuredImage: heroImage
        };

        await setDoc(doc(db, 'content', pageData.slug), docData);
        console.log(`✅ Saved ${pageData.slug} to Firestore!`);

    } catch (error) {
        if (error.response?.status === 404) {
            console.log(`⚠️ Page not found: ${pageData.url}`);
        } else {
            console.error(`❌ Error scraping ${pageData.url}:`, error.message);
        }
    }
}

async function run() {
    console.log("Starting static page scraper...");
    for (const page of PAGES_TO_SCRAPE) {
        await scrapePage(page);
        await new Promise(r => setTimeout(r, 1000));
    }
    console.log("Finished scraping static pages!");
    process.exit(0);
}

run();
