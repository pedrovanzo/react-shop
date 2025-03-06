import { useState, useEffect } from "react";
import {
  loginEmailPassword,
  checkUser,
} from "../../../data/auth";

export default function SignIn() {
  const user: any = checkUser();
  const [userData, setUserData]: any = useState(null);
  function handleLogin() {
    loginEmailPassword();
  }
  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, [user]);
  return (
    <>
      <div>TESTING: `firebase emulators:start --only auth`</div>
      {userData ? (
        <>
          Welcome, {userData.email}
          otherline
        </>
      ) : (
        <>
          <div className="max-w-[512px] flex flex-col gap-4">
            <p className="text-default">login</p>
            <input
              type="text"
              placeholder="email"
              className="outline outline-slate-500 p-1 rounded"
            />
            <input
              type="password"
              placeholder="password"
              className="outline outline-slate-500 p-1 rounded"
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
        </>
      )}
    </>
  );
}
