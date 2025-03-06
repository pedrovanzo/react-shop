import { useState, useEffect, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../data/firebase";
import firebase from "firebase/compat/app";

type User = firebase.User | null;
type ContextState = { user: User };
const auth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);
const FirebaseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const value = { user };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}
const authSignout = async () => {
  console.log("Signed out");
  await auth.signOut();
};
export { FirebaseAuthProvider, useFirebaseAuth, authSignout };
