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

const loginEmailPassword = async (emailRef: string, passwordRef: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            emailRef,
            passwordRef
        );
        console.log(userCredential);
    } catch (error) {
        console.log(error);
    }
};

const createAccount = async (emailRef: string, passwordRef: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            emailRef,
            passwordRef
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

export { loginEmailPassword, createAccount, checkUser };
