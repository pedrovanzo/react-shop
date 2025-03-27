import { useEffect } from "react";
import "./snake.css";
// import "./game.ts"
// import { main } from "./game.ts";
export function Snake() {
    // const boardRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        // const boardElement = boardRef.current
        const bodyDocument = document.body;
        bodyDocument.style;
        bodyDocument.style.padding = "0";
        bodyDocument.style.backgroundColor = "hsl(0, 0%, 0%)";
        const boardRefForGame = document.querySelector("#snake-board")
        console.log("WORKS??", boardRefForGame)
        // main(0);
    }, []);
    return (
        <>
            <div id="snake-board"></div>
        </>
    );
}
