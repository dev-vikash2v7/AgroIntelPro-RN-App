import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBs6wrl0ZW9jxsWEy6E4T0GJaZvA_OH9HQ",
  authDomain: "agroaid-3e2b7.firebaseapp.com",
  projectId: "agroaid-3e2b7",
  storageBucket: "agroaid-3e2b7.appspot.com",
  messagingSenderId: "926871118893",
  appId: "1:926871118893:web:7a592659a97d8ae866c4a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
