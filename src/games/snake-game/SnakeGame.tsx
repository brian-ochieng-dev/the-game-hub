import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "globalStyles";
import useInterval from "hooks/UseInterval";
import {
  canvasSize,
  appleStart,
  directions,
  scale,
  snakeStart,
  initialSpeed,
  directionStart,
  maxPoints,
  UP_ARROW,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
} from "./constants";
import {
  Canvas,
  Button,
  ButtonContainer,
  Points,
  GameOver,
  FinishedGame,
} from "./SnakeGame.styled";

interface Coordinates {
  x: number;
  y: number;
}

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Coordinates>(directionStart);
  const [snake, setSnake] = useState<Array<Coordinates>>(snakeStart);
  const [apple, setApple] = useState<Coordinates>(appleStart);
  const [speed, setSpeed] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [hasFinishedGame, setHasFinishedGame] = useState<boolean>(false);

  const startGame = () => {
    setHasFinishedGame(false);
    setPoints(0);
    setIsPlaying(true);
    setSnake(snakeStart);
    setApple(appleStart);
    setDirection(directionStart);
    setSpeed(initialSpeed);
    setGameOver(false);
    wrapperRef.current?.focus();
  };

  // update endGame
  const endGame = () => {
    setIsPlaying(false);
    setSpeed(null);
    setGameOver(true);
  };

  const createRandomApple = () => {
    return {
      x: Math.floor((Math.random() * canvasSize.x - 10) / scale),
      y: Math.floor((Math.random() * canvasSize.y - 10) / scale),
    };
  };

  const moveSnake = (event: React.KeyboardEvent) => {
    const { key } = event;

    // Check if key is arrow key
    if (
      key === UP_ARROW ||
      key === DOWN_ARROW ||
      key === RIGHT_ARROW ||
      key === LEFT_ARROW
    ) {
      // disable backwards key, this means no collision when going right, and then pressing ArrowLeft
      if (direction.x + directions[key].x && direction.y + directions[key].y) {
        setDirection(directions[key]);
      }
    }
  };

  const checkCollision = (
    piece: Coordinates,
    snakeCoordinates: Coordinates[] = snake,
  ) => {
    // Wall Collision Detection
    if (
      piece.x * scale >= canvasSize.x ||
      piece.x < 0 ||
      piece.y * scale >= canvasSize.y ||
      piece.y < 0
    ) {
      return true;
    }
    // Snake Collision Detection
    // eslint-disable-next-line no-restricted-syntax
    for (const segment of snakeCoordinates) {
      if (piece.x === segment.x && piece.y === segment.y) {
        return true;
      }
    }
    return false;
  };

  const checkAppleCollision = (newSnake: Coordinates[]) => {
    if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
      let newApple = createRandomApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createRandomApple();
      }
      setPoints(points + 1);
      if (points === maxPoints) {
        setHasFinishedGame(true);
        endGame();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = [...snake];
    const newSnakeHead: Coordinates = {
      x: snakeCopy[0].x + direction.x,
      y: snakeCopy[0].y + direction.y,
    };
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      endGame();
    }
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    }
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context == null) {
      throw new Error("Could not get context");
    }

    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, canvasSize.x, canvasSize.y);

    // Draw Snake
    context.fillStyle = "#404346";
    snake.forEach(({ x, y }) => context.fillRect(x, y, 1, 1));

    // Draw Apple
    context.fillStyle = "#F20000";
    context.fillRect(apple.x, apple.y, 1, 1);
  }, [snake, apple]);

  useInterval(() => gameLoop(), speed);

  return (
    <Container>
      <Canvas
        ref={wrapperRef}
        role="button"
        tabIndex={0}
        onKeyDown={(event: React.KeyboardEvent) => moveSnake(event)}
      >
        <canvas
          style={
            gameOver
              ? { border: "2px solid #404346", opacity: 0.5 }
              : { border: "2px solid #404346" }
          }
          ref={canvasRef}
          width={canvasSize.x}
          height={canvasSize.y}
        />
        <Points>{points}</Points>
        {gameOver && <GameOver>Game Over</GameOver>}
        {hasFinishedGame && <FinishedGame>Congratulations</FinishedGame>}
        <ButtonContainer>
          {!isPlaying && (
            <Button type="submit" onClick={startGame}>
              {!gameOver ? "Play" : "Replay"}
            </Button>
          )}
          {gameOver && (
            <Link to="/">
              <Button type="submit">Home</Button>
            </Link>
          )}
        </ButtonContainer>
      </Canvas>
    </Container>
  );
}

export default SnakeGame;
