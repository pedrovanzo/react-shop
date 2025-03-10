import {
  getAuth,
  // connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { firebaseApp } from "./firebase";
import { useEffect, useState } from "react";
const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
  const loginEmail = "custom@provider.test";
  const loginPassword = "password";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential)
  } catch (error) {
    console.log(error);
  }
};

const createAccount = async () => {
  const loginEmail = "custom@provider.test";
  const loginPassword = "password";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential)
  } catch (error) {
    console.log(error);
  }
};

const checkUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return user;
};

export {
  loginEmailPassword,
  createAccount,
  checkUser,
};
