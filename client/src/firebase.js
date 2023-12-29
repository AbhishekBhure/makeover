// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "makeover-3436f.firebaseapp.com",
  projectId: "makeover-3436f",
  storageBucket: "makeover-3436f.appspot.com",
  messagingSenderId: "585612941592",
  appId: "1:585612941592:web:4984d7d9d7bffdee2b666d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
