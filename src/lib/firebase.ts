// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "vista-2wvzo",
  "appId": "1:756578572551:web:592787b87f5e66e259cda2",
  "storageBucket": "vista-2wvzo.firebasestorage.app",
  "apiKey": "AIzaSyB6h3iBrki_0AUTgBjcW4Jih--YgA96FWY",
  "authDomain": "vista-2wvzo.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "756578572551"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
