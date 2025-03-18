import { snake_speed, updateSnake, drawSnake } from "./snake";
const gameBoard = document.getElementById("snake-board");
let lastRenderTime = 0;
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snake_speed) return;
    // console.log("render");
    lastRenderTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);
function update() {
    updateSnake();
}
function draw() {
    drawSnake(gameBoard);
}
