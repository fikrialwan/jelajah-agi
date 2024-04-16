import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "jelajah-agi.firebaseapp.com",
  projectId: "jelajah-agi",
  storageBucket: "jelajah-agi.appspot.com",
  messagingSenderId: "470976376345",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-QCS1R87P68",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
