import { useRef, useState } from "react";
import { loginEmailPassword } from "../../../data/auth";
import { useFirebaseAuth } from "../../../contexts/auth";
import LoadingSpinner from "../../../components/loading/spinner";
import { Navigate } from "react-router-dom";
import Navbar from "../../../components/navigation/navbar";
// import SignInEmailComponent from "../../../components/auth/signin/email";

export default function SignIn() {
    const { user, userIsLoading } = useFirebaseAuth();
    const [signInLoading, setSignInLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    function handleLogin(email: string, password: string) {
        setSignInLoading(true);
        loginEmailPassword(email, password)
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
            <Navbar />
            {/* <LoadingSpinner isCancelable /> */}
            {/* <SignInEmailComponent /> */}
            <div className="relative w-full max-w-lg">
                {signInLoading ? (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center bg-contrast/90">
                            <LoadingSpinner text="signing in..." />
                        </div>
                    </>
                ) : null}
                <div className="max-w-[512px] flex flex-col gap-4">
                    <p className="text-default">Sign In</p>
                    <input
                        type="text"
                        placeholder="email"
                        className="border border-slate-500 p-1 rounded"
                        ref={emailRef}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="border border-slate-500 p-1 rounded"
                        ref={passwordRef}
                    />
                    <button
                        type="button"
                        className="p-2 bg-blue-500 text-contrast"
                        data-signin
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin(
                                emailRef ? emailRef.current!.value : "",
                                passwordRef ? passwordRef.current!.value : ""
                            );
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>
            <div className="my-2 text-default/50 text-sm">react@shop.test | password</div>
        </>
    );
}
