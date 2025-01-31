// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-zwlHZ8_kYcwLKE9SSchwk-CkdRH87E8",
  authDomain: "ai-video-ecc4b.firebaseapp.com",
  projectId: "ai-video-ecc4b",
  storageBucket: "ai-video-ecc4b.firebasestorage.app",
  messagingSenderId: "487924584209",
  appId: "1:487924584209:web:7fedff18ccc112f841c6b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
