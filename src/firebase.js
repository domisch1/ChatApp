import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBge_odepTxMnAfrIw_LircL3qhg-vmY50",
  authDomain: "chatapp-4a05b.firebaseapp.com",
  projectId: "chatapp-4a05b",
  storageBucket: "chatapp-4a05b.appspot.com",
  messagingSenderId: "830626185239",
  appId: "1:830626185239:web:4c390484b09d2816099c52",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
