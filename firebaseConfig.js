import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmcu_ZwXapQbmlDSx6g99CfWOaf1aYSNw",
  authDomain: "youngfolio-2fb73.firebaseapp.com",
  projectId: "youngfolio-2fb73",
  storageBucket: "youngfolio-2fb73.firebasestorage.app",
  messagingSenderId: "1012037955991",
  appId: "1:1012037955991:web:62e99a46cc42d6962694d2",
  measurementId: "G-XCSGBM571K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, signInAnonymously, storage };
