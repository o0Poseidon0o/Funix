// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzgFTzi-tP9Mng9GLL0Lx8PQRo0xFWLOw",
  authDomain: "react-asm3-final.firebaseapp.com",
  projectId: "react-asm3-final",
  storageBucket: "react-asm3-final.appspot.com",
  messagingSenderId: "104814132363",
  appId: "1:104814132363:web:d0c82c6493fb92daa1e88e",
  measurementId: "G-MXT9GVW5YW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
