// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCqxlua7Nnx6J8QqgN5sWJOELd-7xKHl_g",
  authDomain: "time-sheet-25326.firebaseapp.com",
  projectId: "time-sheet-25326",
  storageBucket: "time-sheet-25326.appspot.com",
  messagingSenderId: "176802663420",
  appId: "1:176802663420:web:651ecbe27507c387898079",
  measurementId: "G-VDKC7Z0SZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
