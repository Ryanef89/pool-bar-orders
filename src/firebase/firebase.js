import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgaVaydRTfnoGWIAJS7o_ujQkDpwMn3Bw",
  authDomain: "pool-bar-orders.firebaseapp.com",
  projectId: "pool-bar-orders",
  storageBucket: "pool-bar-orders.firebasestorage.app",
  messagingSenderId: "200582800468",
  appId: "1:200582800468:web:95e429dd392e3f588579c1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);