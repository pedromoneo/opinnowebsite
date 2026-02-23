import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

async function purge() {
    console.log("Fetching all content...");
    const snap = await getDocs(collection(db, 'content'));
    const total = snap.size;
    console.log(`Found ${total} documents.`);

    let deleted = 0;
    const increment = () => {
        deleted++;
        if (deleted % 100 === 0) console.log(`Deleted ${deleted}/${total}`);
    };

    const chunkSize = 200;
    for (let i = 0; i < snap.docs.length; i += chunkSize) {
        const chunk = snap.docs.slice(i, i + chunkSize);
        await Promise.all(chunk.map(d => deleteDoc(doc(db, 'content', d.id)).then(increment)));
    }
    console.log("Purge complete.");
}

purge().catch(console.error);
