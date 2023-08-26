import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7CyHNQ1THbnccSF-xO84szv1Unb5Vewc",
  authDomain: "disney-hotstar-yup.firebaseapp.com",
  projectId: "disney-hotstar-yup",
  storageBucket: "disney-hotstar-yup.appspot.com",
  messagingSenderId: "437610920458",
  appId: "1:437610920458:web:87c9506cf67b3842777df3",
  measurementId: "G-F7J1YR7DG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, provider, storage, db, signInWithPopup};
