import { onSnake, expandSnake } from "./snake.ts"
import { randomGridPosition } from "./grid.ts"
let food = getRandomFoodPosition();
const expansion_rate = 2;
export function updateFood() {
    if (onSnake(food)) {
        expandSnake(expansion_rate);
        food = getRandomFoodPosition();
    }
}
export function drawFood(snakeBoard: HTMLElement) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y.toString();
    foodElement.style.gridColumnStart = food.x.toString();
    foodElement.classList.add("food");
    snakeBoard.appendChild(foodElement);
}
function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}