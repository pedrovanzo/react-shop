import { useEffect } from "react";
import "./snake.css";
export function Snake() {
    useEffect(() => {
        const bodyDocument = document.body;
        bodyDocument.style;
        bodyDocument.style.padding = "0";
        bodyDocument.style.backgroundColor = "hsl(0, 0%, 0%)";
        fetch("/index.html").then((res)=>{console.log(res)})
        // game();
    }, []);
    return (
        <>
            <div>CONVER JS to JSX</div>
        </>
    );
}
