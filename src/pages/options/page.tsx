import { useEffect, useState } from "react";
import "./../../App.css";
import { useFirebaseAuth } from "../../contexts/auth";
import LoadingDash from "../../components/loading/dash";
import Navbar from "../../components/navigation/navbar";
function UseremailFB() {
    const { user, userIsLoading } = useFirebaseAuth();
    return (
        <>
            <div className="my-1 flex items-center text-default leading-none">
                {userIsLoading ? (
                    <LoadingDash classes="w-40 my-2" />
                ) : (
                    user?.email || "unauthenticated"
                )}
            </div>
        </>
    );
}
export default function Options() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return (
            storedTheme ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    });
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        console.log(theme);
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    const insertOrdinalTheme = (theme: any) => {
        document.documentElement.setAttribute("data-theme-ordinal", theme);
    };
    return (
        <>
            <Navbar />
            <div className="my-2 flex flex-col gap-4 w-fit">
                <button
                    className="p-2 rounded-md leading-none text-contrast bg-default"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? "Dark" : "Light"} Mode
                </button>
                <button
                    className="p-2 rounded-md leading-none bg-contrast text-default"
                    onClick={() => insertOrdinalTheme("null")}
                >
                    Default Mode
                </button>
                <button
                    className="p-2 rounded-md leading-none bg-red-700 text-red-100"
                    onClick={() => insertOrdinalTheme("red")}
                >
                    Red Mode
                </button>
                <button
                    className="p-2 rounded-md leading-none bg-blue-700 text-blue-100"
                    onClick={() => insertOrdinalTheme("blue")}
                >
                    Blue Mode
                </button>
                <button
                    className="p-2 rounded-md leading-none bg-green-700 text-green-100"
                    onClick={() => insertOrdinalTheme("green")}
                >
                    Green Mode
                </button>
            </div>
            <br />
            <div className="w-60 bg-primary/15">
                <div className="w-full p-2 bg-primary"></div>
                <div className="p-2 text-default">Theme building</div>
            </div>
            <br />
            <div className="w-60 bg-primary/15">
                <div className="w-full p-2 bg-primary">
                    <div className="p-2 text-secondary">Theme building</div>
                </div>
            </div>
            <p className="text-default">
                Light and Dark mode changes between preset light and dark
                colors.
                <br />
                Colored Modes add different color on elements that are able to
                have an ordinal color attributed to (primary, secondary...)
            </p>
            <UseremailFB />
        </>
    );
}
