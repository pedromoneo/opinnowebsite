import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

async function test() {
    const d = await getDoc(doc(db, 'content', 'es-venture-building-how-not-to-die'));
    console.log(d.exists() ? 'Found: ' + d.data().title : 'Not found');
    const dEn = await getDoc(doc(db, 'content', 'en-venture-building-how-not-to-die'));
    console.log(dEn.exists() ? 'Found EN: ' + dEn.data().title : 'Not found EN');
    const dAlt = await getDoc(doc(db, 'content', 'es-venture-building'));
    console.log(dAlt.exists() ? 'Found ALT: ' + dAlt.data().title : 'Not found ALT');
    process.exit(0);
}
test();
