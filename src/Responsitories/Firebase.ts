import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseapikey = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const firebasedomain = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const firebasepjid = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const firebasepbucket = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const firebasesenderid = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseappid = import.meta.env.VITE_APP_FIREBASE_APP_ID;
const firebasemeasurementid = import.meta.env.VITE_APP_FIREBASE_MEA_ID;

const firebaseConfig = {
  apiKey: firebaseapikey,
  authDomain: firebasedomain,
  projectId: firebasepjid,
  storageBucket: firebasepbucket,
  messagingSenderId: firebasesenderid,
  appId: firebaseappid,
  measurementId: firebasemeasurementid
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; // Đảm bảo đúng cú pháp export
