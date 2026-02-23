import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

// Firebase Config
const firebaseConfig = {
    projectId: "opinnowebsite",
    appId: "1:571973007321:web:849308facc4e9ce67f8bc8",
    storageBucket: "opinnowebsite.firebasestorage.app",
    apiKey: "AIzaSyDN9iuyp9g9R-_qCwZFpf_HMCATPyAxzNA",
    authDomain: "opinnowebsite.firebaseapp.com",
    messagingSenderId: "571973007321",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DB_FILES = [
    { label: 'production', path: 'backup_data/MySQL Opinno/dbtxe2glmgdjoi', lang: 'en' },
    { label: 'staging5', path: 'backup_data/MySQL Opinno/dbo4vhz6xh7dua', lang: 'it' },
    { label: 'staging2', path: 'backup_data/MySQL Opinno/dbgvgd7jgwr8gx', lang: 'es' },
];

function parseTuple(sql, startPos) {
    let pos = sql.indexOf('(', startPos);
    if (pos === -1) return null;
    let endPos = pos;
    let inString = false;
    let escaped = false;
    const fields = [];
    let currentField = '';

    for (let i = pos + 1; i < sql.length; i++) {
        const char = sql[i];
        if (char === "'" && !escaped) {
            inString = !inString;
        } else if (char === "\\" && !escaped) {
            escaped = true;
            continue;
        } else if (char === "," && !inString) {
            fields.push(currentField.trim().replace(/^'|'$/g, ''));
            currentField = '';
        } else if (char === ")" && !inString) {
            fields.push(currentField.trim().replace(/^'|'$/g, ''));
            endPos = i;
            break;
        } else {
            if (escaped) {
                if (char === 'n') currentField += '\n';
                else if (char === 'r') currentField += '\r';
                else if (char === 't') currentField += '\t';
                else currentField += char;
            } else {
                currentField += char;
            }
        }
        escaped = false;
    }
    return { fields, nextPos: endPos };
}

function categorizePost(post) {
    const cats = post.categories.map(c => c.slug);
    const ptype = post.post_type;
    const metaType = post.meta.type;

    // High Priority Taxonomy (News/Press first)
    if (cats.includes('news') || cats.includes('noticias') || cats.includes('notizia') || cats.includes('notizie') || cats.includes('news-it') || cats.includes('news-es')) {
        return { category: 'story', subCategory: 'news' };
    }
    if (cats.includes('press') || cats.includes('prensa') || cats.includes('stampa') || cats.includes('press-releases') || cats.includes('press-it') || cats.includes('press-es')) {
        return { category: 'story', subCategory: 'press-releases' };
    }
    if (cats.includes('voices') || cats.includes('entrevistas') || cats.includes('interviste') || cats.includes('voices-es') || cats.includes('voices-it')) {
        return { category: 'insight', subCategory: 'voices' };
    }
    if (cats.includes('publications') || cats.includes('publicaciones') || cats.includes('pubblicazioni') || cats.includes('publications-es') || cats.includes('publications-it')) {
        return { category: 'insight', subCategory: 'publications' };
    }
    if (cats.includes('conferences') || cats.includes('conferencias') || cats.includes('conferenze') || cats.includes('conference') || cats.includes('conference-es')) {
        return { category: 'insight', subCategory: 'conferences' };
    }
    if (cats.includes('impact-stories') || cats.includes('storie-di-impatto') || cats.includes('impact-stories-es') || cats.includes('impact-stories-it') || cats.includes('story')) {
        return { category: 'story', subCategory: 'impact' };
    }
    if (cats.includes('articles') || cats.includes('articulos') || cats.includes('articoli') || cats.includes('articles-es') || cats.includes('articles-it')) {
        return { category: 'insight', subCategory: 'articles' };
    }

    if (ptype === 'story' || ptype === 'impact-story' || metaType === 'story') return { category: 'story', subCategory: 'impact' };
    if (ptype === 'insight' || ptype === 'article') return { category: 'insight', subCategory: 'articles' };
    if (ptype === 'challenge') return { category: 'challenge' };
    if (ptype === 'event' || ptype === 'tribe_events' || ptype === 'webinar') return { category: 'event' };
    if (ptype === 'job' || ptype === 'jobs') return { category: 'job' };

    if (ptype === 'post') return { category: 'insight', subCategory: 'articles' };
    return { category: 'page' };
}

function processDbFile(filePath, defaultLang, label) {
    console.log(`   Loading ${label}...`);
    const sql = readFileSync(filePath, 'utf8');

    const posts = [];
    const attachments = {};
    const postMeta = {};
    const termMap = {};
    const taxonomyMap = {};
    const relationshipMap = {};

    function parseTable(regex, callback) {
        let match;
        while ((match = regex.exec(sql)) !== null) {
            let pos = match.index + match[0].length;
            while (pos < sql.length) {
                const tuple = parseTuple(sql, pos);
                if (!tuple) break;
                callback(tuple.fields);
                pos = tuple.nextPos + 1;
                while (sql[pos] === ' ' || sql[pos] === '\n' || sql[pos] === '\r') pos++;
                if (sql[pos] === ';') break;
            }
        }
    }

    // Pass 1: Collect ALL posts including attachments
    parseTable(/INSERT INTO `ncj_posts` VALUES\s*/g, f => {
        if (f[20] === 'attachment') {
            attachments[f[0]] = f[18];
        } else if (f[7] === 'publish' && (f[20] === 'post' || f[20] === 'page' || f[20] === 'story' || f[20] === 'article' || f[20] === 'insight')) {
            posts.push({
                ID: f[0],
                post_content: f[4],
                post_title: f[5],
                post_excerpt: f[6],
                post_name: f[11],
                guid: f[18],
                post_type: f[20],
                lang: defaultLang,
                categories: [],
                tags: [],
                publishedAt: f[2],
            });
        }
    });

    parseTable(/INSERT INTO `ncj_postmeta` VALUES\s*/g, (f) => {
        if (f.length < 4) return;
        if (!postMeta[f[1]]) postMeta[f[1]] = {};
        postMeta[f[1]][f[2]] = f[3];
    });

    parseTable(/INSERT INTO `ncj_terms` VALUES\s*/g, f => termMap[f[0]] = { name: f[1], slug: f[2] });
    parseTable(/INSERT INTO `ncj_term_taxonomy` VALUES\s*/g, f => taxonomyMap[f[0]] = { termId: f[1], taxonomy: f[2] });
    parseTable(/INSERT INTO `ncj_term_relationships` VALUES\s*/g, f => {
        if (!relationshipMap[f[0]]) relationshipMap[f[0]] = new Set();
        relationshipMap[f[0]].add(f[1]);
    });

    const postIndex = {};
    posts.forEach(p => postIndex[p.ID] = p);
    parseTable(/INSERT INTO `ncj_icl_translations` VALUES\s*/g, f => {
        if (postIndex[f[2]]) postIndex[f[2]].lang = f[4];
    });

    console.log(`   Transforming...`);
    const results = posts
        .filter(p => p.post_content?.length > 20)
        .map(post => {
            post.meta = postMeta[post.ID] || {};
            const taxIds = relationshipMap[post.ID];
            if (taxIds) {
                taxIds.forEach(tid => {
                    const tx = taxonomyMap[tid];
                    if (tx && (tx.taxonomy.includes('category') || tx.taxonomy.endsWith('-tx') || tx.taxonomy.includes('type'))) {
                        const term = termMap[tx.termId];
                        if (term) post.categories.push(term);
                    } else if (tx && tx.taxonomy === 'post_tag') {
                        const term = termMap[tx.termId];
                        if (term) post.tags.push(term);
                    }
                });
            }

            const { category, subCategory } = categorizePost(post);
            let featuredImage = '';
            let attachId = post.meta._thumbnail_id || post.meta.main_image;
            if (attachId && attachments[attachId]) {
                featuredImage = attachments[attachId];
            }

            const slugPath = `${category === 'page' ? '' : category + '/'}${post.post_name}`;
            return {
                docId: `${post.lang}-${post.post_name}`,
                data: {
                    wpId: post.ID,
                    title: post.post_title,
                    content: post.post_content,
                    excerpt: post.post_excerpt,
                    slug: post.post_name,
                    slugPath,
                    category,
                    subCategory: subCategory || 'none',
                    lang: post.lang || defaultLang,
                    featuredImage,
                    publishedAt: post.publishedAt,
                    wpCategories: post.categories,
                    wpTags: post.tags,
                    type: ptypeMap[post.post_type] || 'post'
                }
            };
        });

    console.log(`   Found ${results.length} valid docs.`);
    return results;
}

const ptypeMap = { story: 'case-study', article: 'post', post: 'post', insight: 'post' };

async function main() {
    const dryRun = process.argv.includes('--dry-run');
    console.log(`🚀 WP → Firestore Import v7.1${dryRun ? ' (DRY RUN)' : ''}`);

    const allResults = {};

    for (const dbInfo of DB_FILES) {
        try {
            const docs = processDbFile(dbInfo.path, dbInfo.lang, dbInfo.label);
            docs.forEach(doc => {
                const key = `${doc.data.lang}-${doc.data.slug}`;
                if (!allResults[key]) {
                    allResults[key] = doc.data;
                }
            });
        } catch (err) {
            console.error(`Error processing ${dbInfo.label}:`, err.message);
        }
    }

    const finalDocs = Object.values(allResults);
    console.log(`\n✨ Final count: ${finalDocs.length}`);

    if (dryRun) {
        const categories = {};
        const unmappedCats = {};
        finalDocs.forEach(d => {
            const catKey = `${d.category}:${d.subCategory}`;
            categories[catKey] = (categories[catKey] || 0) + 1;

            if (catKey === 'story:impact' || catKey === 'insight:articles' || catKey === 'page:none' || catKey === 'post:none') {
                d.wpCategories.forEach(c => {
                    unmappedCats[c.slug] = (unmappedCats[c.slug] || 0) + 1;
                });
            }
        });
        console.log('Categories:', JSON.stringify(categories, null, 2));
        console.log('Unmapped Taxonomy Slugs:', Object.entries(unmappedCats).sort((a, b) => b[1] - a[1]).slice(0, 30));
        return;
    }

    const contentRef = collection(db, 'content');
    let count = 0;
    for (const data of finalDocs) {
        await setDoc(doc(contentRef, `${data.lang}-${data.slug}`), data);
        count++;
        if (count % 100 === 0) console.log(`   Imported ${count}...`);
    }

    console.log(`\n✅ SUCCESS: Imported ${count} documents.`);
}

main().catch(console.error);
