import { useRef, useState } from "react";
import { createAccount } from "../../../data/auth";
import { useFirebaseAuth } from "../../../contexts/auth";
import LoadingSpinner from "../../../components/loading/spinner";
import Navbar from "../../../components/navigation/navbar";

export default function SignUp() {
    const { user, userIsLoading } = useFirebaseAuth();
    const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    function handleCreateAccount(email: string, password: string) {
        setSignUpLoading(true);
        createAccount(email, password).then(() => {
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
            <Navbar />
            <div className="relative w-full max-w-lg">
                {signUpLoading ? (
                    <>
                        <div className="absolute inset-0 flex items-center justify-center bg-contrast/90">
                            <LoadingSpinner text="signing up..." />
                        </div>
                    </>
                ) : null}
                {user ? null : (
                    <>
                        <div className="max-w-[512px] flex flex-col gap-4">
                            <p className="text-default">Sign Up</p>
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
                                data-signup
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCreateAccount(
                                        emailRef.current!.value,
                                        passwordRef.current!.value
                                    );
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
