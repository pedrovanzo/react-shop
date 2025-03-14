import { useState } from "react";
import { loginEmailPassword } from "../../../data/auth";
import { useFirebaseAuth } from "../../../contexts/auth";
import LoadingSpinner from "../../../components/loading/spinner";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const { user, userIsLoading } = useFirebaseAuth();
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  function handleLogin() {
    setSignInLoading(true);
    loginEmailPassword()
      .then(() => {
        setSignInLoading(false);
      })
      .catch((error) => {
        console.log("Sign in failed", error);
        setSignInLoading(false);
      });
  }
  // {userIsLoading && <LoadingSpinner abortSignal={abortController.signal} />}
  {
    userIsLoading && <LoadingSpinner />;
  }
  if (user) return <Navigate to={{ pathname: "/" }} />;
  return (
    <>
      {/* <LoadingSpinner isCancelable /> */}
      <div>TESTING: `firebase emulators:start --only auth`</div>
      <div className="relative w-full max-w-lg">
        {signInLoading ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-contrast/90">
              <LoadingSpinner text="signing in..." />
            </div>
          </>
        ) : null}
        <div className="max-w-[512px] flex flex-col gap-4">
          <p className="text-default">login</p>
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
            data-signin
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
