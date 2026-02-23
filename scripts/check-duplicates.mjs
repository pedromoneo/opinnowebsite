import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function checkDuplicates() {
    const snap = await getDocs(collection(db, 'content'));
    const seen = new Map();
    const duplicates = [];

    snap.forEach(doc => {
        const data = doc.data();
        const key = data.wpId || data.slugPath;
        if (seen.has(key)) {
            duplicates.push({
                key,
                originalId: seen.get(key),
                newId: doc.id,
                title: data.title
            });
        } else {
            seen.set(key, doc.id);
        }
    });

    console.log(`Total docs: ${snap.size}`);
    console.log(`Duplicates found: ${duplicates.length}`);
    if (duplicates.length > 0) {
        console.log('Sample duplicates:');
        console.log(JSON.stringify(duplicates.slice(0, 5), null, 2));
    }
}

checkDuplicates().catch(console.error);
