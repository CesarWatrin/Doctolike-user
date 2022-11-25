import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwUs4IdJ9Xy3_r3S51KjsSXQD_NGoi2w8",
  authDomain: "doctolike-cdc2a.firebaseapp.com",
  projectId: "doctolike-cdc2a",
  storageBucket: "doctolike-cdc2a.appspot.com",
  messagingSenderId: "164599579913",
  appId: "1:164599579913:web:217e4ca1286fd7f0b17fd8",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
