import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query, where } from 'firebase/firestore';

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

async function inspectCategories() {
    console.log('--- Inspecting Categories (Summary by Lang) ---');
    const contentRef = collection(db, 'content');
    const q = query(contentRef, where('category', 'in', ['story', 'insight']));
    const snap = await getDocs(q);

    const stats = {};

    snap.forEach(doc => {
        const d = doc.data();
        const key = `${d.category}:${d.subCategory}:${d.lang}`;
        stats[key] = (stats[key] || 0) + 1;
    });

    console.log(JSON.stringify(stats, null, 2));
}

inspectCategories().catch(console.error);
