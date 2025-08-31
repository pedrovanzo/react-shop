import { useState, useEffect, useCallback } from "react";
import "./game.css";
import { Link } from "react-router-dom";

const gridSize = 21;
const initialSnake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
];
const initialFood = { x: 15, y: 15 };

const SnakeGame = () => {
    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(initialFood);
    const [direction, setDirection] = useState("RIGHT");
    const [gameOver, setGameOver] = useState(false);

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
            case "UP":
                head.y -= 1;
                break;
            case "DOWN":
                head.y += 1;
                break;
            case "LEFT":
                head.x -= 1;
                break;
            case "RIGHT":
                head.x += 1;
                break;
            default:
                break;
        }

        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            setFood({
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            });
        } else {
            newSnake.pop();
        }

        if (
            head.x < 0 ||
            head.x >= gridSize ||
            head.y < 0 ||
            head.y >= gridSize ||
            newSnake
                .slice(1)
                .some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
            setGameOver(true);
        }

        setSnake(newSnake);
    }, [snake, direction, food, gameOver]);

    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(moveSnake, 75);

        return () => clearInterval(interval);
    }, [moveSnake, gameOver]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (gameOver) return;

        if (e.key === "ArrowUp" && direction !== "DOWN") {
            setDirection("UP");
        } else if (e.key === "ArrowDown" && direction !== "UP") {
            setDirection("DOWN");
        } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
            setDirection("LEFT");
        } else if (e.key === "ArrowRight" && direction !== "LEFT") {
            setDirection("RIGHT");
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [direction, gameOver]);

    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < gridSize; y++) {
            const row = [];
            for (let x = 0; x < gridSize; x++) {
                const isSnake = snake.some(
                    (segment) => segment.x === x && segment.y === y
                );
                const isFood = food.x === x && food.y === y;

                row.push(
                    <div
                        key={`${x}-${y}`}
                        className={`cell ${isSnake ? "snake" : ""} ${
                            isFood ? "food" : ""
                        }`}
                    />
                );
            }
            grid.push(
                <div key={y} className="row">
                    {row}
                </div>
            );
        }
        return grid;
    };

    return (
        <div className="relative h-[90vh] m-0 p-0 flex items-center justify-center">
            <h1 className="absolute hidden top-2 left-2 text-2xl text-neutral-400 md:block">
                Snake
            </h1>
            <div>
                <div className="snake-game relative">
                    {gameOver && (
                        <div className="game-over absolute inset-0 flex items-center justify-center">
                            <div>Game Over</div>
                        </div>
                    )}
                    <div className="grid">{renderGrid()}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <Link reloadDocument to={'/snake'} className="text-white">
                        Reset
                    </Link>
                    <Link to={{ pathname: "/" }} className="text-white">
                        Return
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
