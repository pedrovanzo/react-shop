import { useState, useEffect, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../data/firebase";
import firebase from "firebase/compat/app";

type User = firebase.User | null;
type ContextState = { user: User; userIsLoading: boolean };
const auth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);
const FirebaseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userIsLoading, setUserIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      setUserIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const value = { user, userIsLoading };
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
  return context;
}
const authSignout = async () => {
  console.log("Signed out");
  if (window.confirm("Are you sure you want to sign out?"))
  await auth.signOut();
};
export { FirebaseAuthProvider, useFirebaseAuth, authSignout };
