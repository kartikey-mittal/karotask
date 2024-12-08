import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration (replace with your Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyBW3djf3kOudTICuZnBqDq0oFNhkPCjpmg",
  authDomain: "karotask-2024.firebaseapp.com",
  projectId: "karotask-2024",
  storageBucket: "karotask-2024.appspot.com",
  messagingSenderId: "925362201050",
  appId: "1:925362201050:web:cef8d3971f8da77df7a0e3",
  measurementId: "G-V6ZGV1JX6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage };
