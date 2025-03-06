import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.DB_apiKey,
  authDomain: import.meta.env.DB_authDomain,
  projectId: import.meta.env.DB_projectId,
  storageBucket: import.meta.env.DB_storageBucket,
  messagingSenderId: import.meta.env.DB_messagingSenderId,
  appId: import.meta.env.DB_appId,
  measurementId: import.meta.env.DB_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db, app as firebaseApp }