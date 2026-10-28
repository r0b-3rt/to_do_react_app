// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArVsY9K9sP19G4EfCOkzNooHpJiB4jlLs",
    authDomain: "todo-app-d8caa.firebaseapp.com",
    projectId: "todo-app-d8caa",
    storageBucket: "todo-app-d8caa.firebasestorage.app",
    messagingSenderId: "818582257094",
    appId: "1:818582257094:web:36f35b7347b5c7e69146c7",
    measurementId: "G-C6XQ29DLR2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
