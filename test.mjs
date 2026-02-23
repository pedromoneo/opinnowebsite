import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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
    const q = query(collection(db, "content"), where("lang", "==", "es"), where("category", "==", "story"));
    const snap = await getDocs(q);
    console.log("Total ES stories:", snap.size);
    snap.docs.slice(0, 5).forEach(d => console.log(d.id, " - ", d.data().title));
}
test().catch(console.error);
