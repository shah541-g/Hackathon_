import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC_jVrZo4xDRinwVgfUGr3iHkV9Naiu154",
  authDomain: "promstack.firebaseapp.com",
  projectId: "promstack",
  storageBucket: "promstack.firebasestorage.app",
  messagingSenderId: "231443991563",
  appId: "1:231443991563:web:28055de9840cda4724cb0e",
  measurementId: "G-8SCH170X60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)