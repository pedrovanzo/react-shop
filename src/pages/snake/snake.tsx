export const snake_speed = 1;
const snakeBody = [
    { x: 10, y: 11 },
    { x: 11, y: 11 },
    { x: 12, y: 11 },
];
export function updateSnake() {
    console.log("updating snake");
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += 1
    snakeBody[0].y += 0
}
export function drawSnake(snakeBoard: any) {
    console.log("drawind snake");
    snakeBody.forEach((segment) => {
        const snakeElement: HTMLDivElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y.toString();
        snakeElement.style.gridColumnStart = segment.x.toString();
        snakeElement.classList.add("snake");
        snakeBoard.appendChild(snakeElement);
    });
}
