// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU4roLgEJVemLTY6H3F94-KzVAZtorITQ",
  authDomain: "ad320-cp4-148aa.firebaseapp.com",
  databaseURL: "https://ad320-cp4-148aa-default-rtdb.firebaseio.com",
  projectId: "ad320-cp4-148aa",
  storageBucket: "ad320-cp4-148aa.firebasestorage.app",
  messagingSenderId: "808271820015",
  appId: "1:808271820015:web:731ac08703dbea58efd71a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { ref, set };

