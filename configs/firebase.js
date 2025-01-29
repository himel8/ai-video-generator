// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tooblio-d099c.firebaseapp.com",
  projectId: "tooblio-d099c",
  storageBucket: "tooblio-d099c.firebasestorage.app",
  messagingSenderId: "223172711617",
  appId: "1:223172711617:web:de7f38394f987eddcd3040",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
