import { useRef } from "react";
import FloatingLabelInput from "../../input/floatingLabelInput";
import { Link } from "react-router-dom";

export default function SignInEmailComponent() {
    const emailRef = useRef<HTMLInputElement>(null);
    return (
        <div className="rounded-lg p-4 w-full max-w-xl">
            <div className="hidden relative z-0 w-full mb-2 group">
                <input
                    type="email"
                    name="email"
                    placeholder=""
                    ref={emailRef}
                    className="block rounded py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                    htmlFor="email"
                    className="absolute bg-contrast text-sm text-default/50 duration-300 transform scale-75 top-10 -z-1 origin-[0] left-1.75 peer-focus:px-1 peer-focus:z-10 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3"
                >
                    Email
                </label>
            </div>
            <FloatingLabelInput type="email" inputColor="blue" labelColor="blue" text="Email" />
            <div className="min-h-6 my-2">
                {/* <p className="text-red-600 leading-none">Invalid email, try again</p> */}
            </div>
            <div className="flex justify-end">
                <Link
                    to={{ pathname: "/signup" }}
                    className="py-3 px-6 text-default leading-none"
                >
                    Create account
                </Link>
                <button
                    type="button"
                    className="rounded py-3 px-6 bg-blue-500 text-contrast leading-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
