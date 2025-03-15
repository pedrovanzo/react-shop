import { useEffect, useState } from "react";

export function AbortSandbox() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        const handleClick = () => {
            console.log("Clicked");
        };
        document.addEventListener("click", handleClick, {
            signal: controller.signal,
        });
        return () => {
            controller.abort();
        };
    }, [count]);
    useEffect(() => {}, []);
    return (
        <div className="flex flex-col gap-2 m-2">
            <button
                style={{ all: "revert" }}
                onClick={() => setCount((c) => c + 1)}
            >
                Count: {count}
            </button>
            <button
                style={{ all: "revert" }}
                onClick={async () => {
                    // console.log(await insertIntoDb());
                }}
            >
                Insert DB Data
            </button>
            <div>
                Abort - Retry tomorow. firebase request must be inside a
                promise, that will be rejected based on user input, by using
                abort
            </div>
            <div className="text-sm"><a href="https://youtu.be/BeZfiCPhZbI?t=685" target="_blank" className="text-blue-500 underline">https://youtu.be/BeZfiCPhZbI?t=685</a></div>
        </div>
    );
}
