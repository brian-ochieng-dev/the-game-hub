import { useEffect, useState } from "react";
import GameOver from "components/game-over/GameOver";
import { v1 as key } from "uuid";
import { Container } from "globalStyles";
import { Cell, Heading, Table } from "./TicTacToe.styled";
import { Pattern, result } from "./constants";

function TicTacToe() {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(""));
  const [player, setPlayer] = useState<string>("O");
  const [results, setResults] = useState(result);

  const handleClick = (index: number) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === index && val === "") {
          return player;
        }
        return val;
      }),
    );
  };

  const checkWin = () => {
    Pattern.forEach((currentPattern: number[]) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;

      let foundWinningPattern = true;
      currentPattern.forEach((idx: number) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResults({ winner: player, state: "won" });
      }
    });
  };

  const checkMoves = () => {
    let filled = true;
    board.forEach((cell) => {
      if (cell === "") {
        filled = false;
      }
    });
    if (filled) {
      setResults({ winner: "No one", state: "tie" });
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setPlayer(player === "X" ? "O" : "X");
    setResults({ winner: "none", state: "none" });
  };

  useEffect(() => {
    checkWin();
    checkMoves();
    setPlayer(player === "X" ? "O" : "X");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <Container>
      <Table>
        {results.state === "none" &&
          board.map((value, index) => {
            return (
              <Cell key={key()} onClick={() => handleClick(index)}>
                {value}
              </Cell>
            );
          })}

        {results.state === "won" && (
          <Heading>Player {result.winner} Won!</Heading>
        )}

        {results.state !== "none" && <GameOver restartGame={restartGame} />}
      </Table>
    </Container>
  );
}

export default TicTacToe;
