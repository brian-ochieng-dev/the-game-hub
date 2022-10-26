// @ts-nocheck
import { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import Swipe from "react-easy-swipe";
import { v1 } from "uuid";
import useEvent from "hooks/UseEvent";
import GameOver from "components/game-over/GameOver";
import Block from "./Cell";
import {
  matrix,
  difficulty,
  UP_ARROW,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  result,
} from "./constants";
import { Container } from "../../globalStyles";
import { TwentyFortyEightContainer } from "./TwentyFortyEight.styled";

function TwentyFortyEight() {
  const [data, setData] = useState(matrix);
  const [results, setResults] = useState(result);

  //  AddNumber - Add an item
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      const rand1 = Math.floor(Math.random() * 4);
      const rand2 = Math.floor(Math.random() * 4);
      attempts += 1;
      if (newGrid[rand1][rand2] === 0) {
        // eslint-disable-next-line no-param-reassign
        newGrid[rand1][rand2] = Math.random() * difficulty > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const isGameOver = checkIfGameOver();
        if (isGameOver) {
          setResults(() => ({ ...results, gameOver: true }));
        }
      }
    }
  };

  //  Initialize
  const initialize = () => {
    const newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  //  swipe functions
  // eslint-disable-next-line consistent-return
  const swipeLeft = (dummy) => {
    const oldGrid = data;
    const newArray = cloneDeep(data);

    for (let i = 0; i < 4; i += 1) {
      const b = newArray[i];
      let current = 0;
      let next = 1;
      while (current < 4) {
        if (next === 4) {
          next = current + 1;
          current += 1;
          // eslint-disable-next-line no-continue
          continue;
        }
        if (b[current] === 0 && b[next] === 0) {
          next += 1;
        } else if (b[current] === 0 && b[next] !== 0) {
          b[current] = b[next];
          b[next] = 0;
          next += 1;
        } else if (b[current] !== 0 && b[next] === 0) {
          next += 1;
        } else if (b[current] !== 0 && b[next] !== 0) {
          if (b[current] === b[next]) {
            b[current] += b[next];
            b[next] = 0;
            next = current + 1;
            current += 1;
          } else {
            current += 1;
            next = current + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    }
    setData(newArray);
  };

  // eslint-disable-next-line consistent-return
  const swipeRight = (dummy) => {
    const oldData = data;
    const newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i -= 1) {
      const b = newArray[i];
      let current = b.length - 1;
      let next = current - 1;
      while (current > 0) {
        if (next === -1) {
          next = current - 1;
          current -= 1;
          // eslint-disable-next-line no-continue
          continue;
        }
        if (b[current] === 0 && b[next] === 0) {
          next -= 1;
        } else if (b[current] === 0 && b[next] !== 0) {
          b[current] = b[next];
          b[next] = 0;
          next -= 1;
        } else if (b[current] !== 0 && b[next] === 0) {
          next -= 1;
        } else if (b[current] !== 0 && b[next] !== 0) {
          if (b[current] === b[next]) {
            b[current] += b[next];
            b[next] = 0;
            next = current - 1;
            current -= 1;
          } else {
            current -= 1;
            next = current - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    }
    setData(newArray);
  };

  // eslint-disable-next-line consistent-return
  const swipeDown = (dummy) => {
    const b = cloneDeep(data);
    const oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i -= 1) {
      let current = b.length - 1;
      let next = current - 1;
      while (current > 0) {
        if (next === -1) {
          next = current - 1;
          current -= 1;
          // eslint-disable-next-line no-continue
          continue;
        }
        if (b[current][i] === 0 && b[next][i] === 0) {
          next -= 1;
        } else if (b[current][i] === 0 && b[next][i] !== 0) {
          b[current][i] = b[next][i];
          b[next][i] = 0;
          next -= 1;
        } else if (b[current][i] !== 0 && b[next][i] === 0) {
          next -= 1;
        } else if (b[current][i] !== 0 && b[next][i] !== 0) {
          if (b[current][i] === b[next][i]) {
            b[current][i] += b[next][i];
            b[next][i] = 0;
            next = current - 1;
            current -= 1;
          } else {
            current -= 1;
            next = current - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    }
    setData(b);
  };

  // eslint-disable-next-line consistent-return
  const swipeUp = (dummy) => {
    const b = cloneDeep(data);
    const oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i += 1) {
      let current = 0;
      let next = 1;
      while (current < 4) {
        if (next === 4) {
          next = current + 1;
          current += 1;
          // eslint-disable-next-line no-continue
          continue;
        }
        if (b[current][i] === 0 && b[next][i] === 0) {
          next += 1;
        } else if (b[current][i] === 0 && b[next][i] !== 0) {
          b[current][i] = b[next][i];
          b[next][i] = 0;
          next += 1;
        } else if (b[current][i] !== 0 && b[next][i] === 0) {
          next += 1;
        } else if (b[current][i] !== 0 && b[next][i] !== 0) {
          if (b[current][i] === b[next][i]) {
            b[current][i] += b[next][i];
            b[next][i] = 0;
            next = current + 1;
            current += 1;
          } else {
            current += 1;
            next = current + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    }
    setData(b);
  };

  // Check Game over
  const checkIfGameOver = () => {
    const checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    const checker2 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    const checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    const checker4 = swipeUp(true);

    return JSON.stringify(data) === JSON.stringify(checker4);
  };

  //  Reset
  const resetGame = () => {
    setResults(() => ({ ...results, gameOver: false }));
    const emptyGrid = matrix;

    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  const handleKeyDown = (event) => {
    if (results.gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }

    const isGameOver = checkIfGameOver();
    if (isGameOver) {
      setResults(() => ({ ...results, gameOver: true }));
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  This is a custom function
  useEvent("keydown", handleKeyDown);

  return (
    <Container>
      <TwentyFortyEightContainer>
        {!results.gameOver ? (
          <Swipe
            onSwipeDown={swipeDown}
            onSwipeLeft={swipeLeft}
            onSwipeRight={swipeRight}
            onSwipeUp={swipeUp}
            style={{ overflowY: "hidden" }}
          >
            {data.map((row) => {
              return (
                <div style={{ display: "flex" }} key={v1()}>
                  {row.map((digit) => (
                    <Block num={digit} key={v1()} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        ) : (
          <GameOver resetGame={resetGame} />
        )}
      </TwentyFortyEightContainer>
    </Container>
  );
}
export default TwentyFortyEight;
