import { getInputDirection } from "./input.ts";
import { SnakePosition } from "./SnakeInterfaces.ts";

export const snake_speed = 2;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
export function updateSnake() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}
export function drawSnake(snakeBoard: HTMLElement) {
    console.log("drawind snake");
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y.toString();
        snakeElement.style.gridColumnStart = segment.x.toString();
        snakeElement.classList.add("snake");
        snakeBoard.appendChild(snakeElement);
    });
}
export function expandSnake(amount: number) {
    newSegments += amount;
}
export function onSnake(position: SnakePosition, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    });
}
export function getSnakeHead() {
    return snakeBody[0];
}
export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}
function equalPositions(pos1: SnakePosition, pos2: SnakePosition) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}
function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}
