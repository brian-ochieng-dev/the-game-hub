import { useState, useEffect, ChangeEvent } from "react";
import GameOver from "components/game-over/GameOver";
import {
  MathGameContainer,
  ProblemContainer,
  NumContainer,
  SymbolContainer,
  Input,
} from "./MathGame.styled";
import { emptyGameData, symbols, gameDifficulty, result } from "./constants";

interface GameDataTypes {
  number1: string;
  number2: string;
  number3: string;
  symbol1: string;
  symbol2: string;
  answer: number;
}

/*
 fixme: fix game level switching
 fixme: restart button
 fixme: numbers are not increasing
 fixme: symbols are not changing as they should
 todo: only show problems with integer answers
*/

function MathGame() {
  const [data, setData] = useState<GameDataTypes>(emptyGameData);
  const [difficulty, setDifficulty] = useState(gameDifficulty);
  const [userGuess, setUserGuess] = useState("");
  const [count, setCount] = useState(1);
  const [results, setResults] = useState(result);

  const randInt = (limit: number) => {
    return Math.floor(Math.random() * limit);
  };

  const addProblem = () => {
    let easy = true;

    if (count >= difficulty.level.easy) {
      easy = false;
    }

    return setData(() => ({
      ...data,
      // set numbers
      number1: String(randInt(gameDifficulty.maxNumber) + 1),
      number2: String(randInt(gameDifficulty.maxNumber) + 1),
      number3: !easy ? String(randInt(gameDifficulty.maxNumber) + 1) : "",
      // set symbols
      symbol1: symbols[randInt(!easy ? 4 : 2)],
      symbol2: !easy ? symbols[randInt(4)] : "",
    }));
  };

  const restartGame = () => {
    setData(emptyGameData);
    setDifficulty(gameDifficulty);
  };

  const symbolConverter = (symbol: string) => {
    if (symbol === "*") {
      return "×";
    }
    if (symbol === "/") {
      return "÷";
    }
    return symbol;
  };

  const calculation = () => {
    setData((dt) => ({
      ...dt,
      // eslint-disable-next-line no-eval
      answer: eval(
        `${dt.number1}${dt.symbol1}${dt.number2}${dt.symbol2}${dt.number3}`,
      ),
    }));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  };

  const checkIfGameOver = () => {
    if (Number(userGuess) !== data.answer) {
      setResults(() => ({
        ...results,
        gameOver: true,
      }));
    } else {
      setCount(count + 1);
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = () => {
    checkIfGameOver();
    setUserGuess("");

    // change difficulty of the game
    if (count <= difficulty.level.easy / 2) {
      return setDifficulty(() => ({
        ...difficulty,
        maxNumber: 64,
      }));
    }
    if (count <= difficulty.level.medium) {
      return setDifficulty(() => ({
        ...difficulty,
        maxNumber: 256,
      }));
    }
    if (count <= difficulty.level.hard) {
      return setDifficulty(() => ({
        ...difficulty,
        maxNumber: 1024,
      }));
    }
  };

  useEffect(() => {
    addProblem();
    calculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <MathGameContainer>
      {!results.gameOver ? (
        <>
          <ProblemContainer>
            <NumContainer>{data.number1}</NumContainer>
            <SymbolContainer>{symbolConverter(data.symbol1)}</SymbolContainer>
            <NumContainer>{data.number2}</NumContainer>
            {count >= difficulty.level.easy && (
              <>
                <SymbolContainer>
                  {symbolConverter(data.symbol2)}
                </SymbolContainer>
                <NumContainer>{data.number3}</NumContainer>
              </>
            )}
          </ProblemContainer>

          <>
            <Input
              value={userGuess}
              type="text"
              placeholder="..."
              onChange={(event) => handleInput(event)}
            />

            <button type="submit" onClick={handleClick}>
              check
            </button>
          </>
        </>
      ) : (
        <GameOver restartGame={() => restartGame()} />
      )}
    </MathGameContainer>
  );
}

export default MathGame;
