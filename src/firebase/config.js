// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVA9agyjpHWkW3XTWLv69tLmZRhDUXhk8",
  authDomain: "progvaryum.firebaseapp.com",
  projectId: "progvaryum",
  storageBucket: "progvaryum.firebasestorage.app",
  messagingSenderId: "216122119996",
  appId: "1:216122119996:web:0f54ce3cacbae1dfed3039"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;