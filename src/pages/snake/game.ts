import { updateFood, drawFood } from "./food.ts";
import {
    snake_speed,
    updateSnake,
    drawSnake,
    getSnakeHead,
    snakeIntersection,
} from "./snake.ts";
import { outsideGrid } from "./grid.ts";
// import { useRef } from "react";
// import { boardRefForGame, Snake } from "./page.tsx";
// const gameBoard = document.getElementById("snake-board");
// const boardRef = useRef<HTMLDivElement | null>(null)
// const gameBoard = Snake.boardRef.current
let boardRefForGame: any
let gameBoard: any
let lastRenderTime = 0;
let gameOver = false;
document.addEventListener("DOMContentLoaded", (()=>{
    boardRefForGame = document.querySelector("#snake-board")
    gameBoard = boardRefForGame
}))
export function main(currentTime: number) {
    if (gameOver) {
        if (confirm("Game over. Press ok to restart")) {
            window.location.href = "/snake";
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 200;
    if (secondsSinceLastRender < 1 / snake_speed) return;
    lastRenderTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);
function update() {
    updateSnake();
    updateFood();
    checkDeath();
}
function draw() {
    gameBoard!.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
