// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-96a02.firebaseapp.com",
  projectId: "mern-blog-96a02",
  storageBucket: "mern-blog-96a02.firebasestorage.app",
  messagingSenderId: "644310269131",
  appId: "1:644310269131:web:dd5bc440b11238a362ef4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);