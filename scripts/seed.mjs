import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

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

const seedData = async () => {
    console.log('Starting seed process...');

    const posts = [
        {
            slugPath: 'my-first-post',
            lang: 'en',
            title: 'Global Innovation Leaders',
            content: 'Here is some rich, simulated WordPress converted content! Opinno connect leaders with deep tech startups around the planet. \n\nWe provide Venture Building and Agile transformation.',
            excerpt: 'Opinno connect leaders with deep tech startups around the planet.',
            type: 'post',
            publishedAt: new Date().toISOString(),
            featuredImage: '/assets/sample-case.jpg'
        },
        {
            slugPath: 'santander-framework',
            lang: 'es',
            title: 'Santander Open Innovation Framework',
            content: 'Este es el caso de estudio dinámico sobre Santander, renderizado directamente desde Firebase Firestore de manera server-side gracias a Next.js App Router!',
            excerpt: 'El framework de innovación abierta de Santander desarrollado junto a Opinno.',
            type: 'case-study',
            publishedAt: new Date().toISOString(),
            featuredImage: '/assets/sample-case2.png'
        },
        {
            slugPath: 'digital-transformation-guide',
            lang: 'en',
            title: 'Digital Transformation Guide for 2026',
            content: 'Step by step guide on implementing digital transformation using modern tools and cultural shifts. Open Innovation is the key.',
            excerpt: 'Step by step guide on implementing digital transformation.',
            type: 'post',
            publishedAt: new Date().toISOString(),
            featuredImage: '/assets/sample-case.jpg'
        }
    ];

    for (const post of posts) {
        const docRef = doc(db, 'content', post.slugPath);
        await setDoc(docRef, post);
        console.log(`Seeded post: ${post.slugPath}`);
    }

    console.log('Seeding complete. Exiting...');
    process.exit(0);
};

seedData().catch(console.error);
