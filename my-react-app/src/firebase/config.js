// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzaIxlWYikdAm1NUJAGG25QUqvh4gR9nM",
  authDomain: "smell-project.firebaseapp.com",
  projectId: "smell-project",
  storageBucket: "smell-project.firebasestorage.app",
  messagingSenderId: "39839277858",
  appId: "1:39839277858:web:e3648a4435fae861a33b7b",
  measurementId: "G-WSPL8LCPHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (this is what you need for your smell map)
export const db = getFirestore(app);

export default app;