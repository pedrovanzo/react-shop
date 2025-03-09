import { useState } from "react";
import { createAccount } from "../../../data/auth";
import { useFirebaseAuth } from "../../../contexts/auth";
import LoadingSpinner from "../../../components/loading/spinner";

export default function SignUp() {
  const { user, userIsLoading } = useFirebaseAuth();
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  function handleCreateAccount() {
    setSignUpLoading(true);
    createAccount().then(() => {
      setSignUpLoading(false);
    });
  }
  if (userIsLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  return (
    <>
      <div>TESTING: `firebase emulators:start --only auth`</div>
      <div className="relative w-full max-w-lg">
        {signUpLoading ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-contrast/90">
              <LoadingSpinner text="signing up..." />
            </div>
          </>
        ) : null}
        {user ? (
          <>
            Welcome, {user.email}
            otherline
          </>
        ) : (
          <>
            <div className="max-w-[512px] flex flex-col gap-4">
              <p className="text-default">register</p>
              <input
                type="text"
                placeholder="email"
                className="border border-slate-500 p-1 rounded"
              />
              <input
                type="password"
                placeholder="password"
                className="border border-slate-500 p-1 rounded"
              />
              <button
                type="button"
                className="p-2 bg-blue-500 text-contrast"
                data-signup
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateAccount();
                }}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
