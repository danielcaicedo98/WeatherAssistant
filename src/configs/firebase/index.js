// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4kBBYqsKOmRIzUS6GUEaih5R11oWycy0",
  authDomain: "weather-assistant-6cb91.firebaseapp.com",
  projectId: "weather-assistant-6cb91",
  storageBucket: "weather-assistant-6cb91.firebasestorage.app",
  messagingSenderId: "452584517375",
  appId: "1:452584517375:web:46839229974f366b3326ca",
  measurementId: "G-9X71TWQTGN"
};

const app = initializeApp(firebaseConfig);

export const fbApp = app;
const auth = getAuth(fbApp);
export const fbAuth = auth;