import { Link } from "react-router-dom";
import { Button } from "globalStyles";
import { GameOverModal, StyledGameOver, Header } from "./GameOver.styled";

interface Proptypes {
  restartGame: Function;
}

function GameOver({ restartGame }: Proptypes) {
  return (
    <GameOverModal>
      <StyledGameOver>
        <Header>Game Over</Header>
        <Button type="submit" onClick={() => restartGame()}>
          Restart
        </Button>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </StyledGameOver>
    </GameOverModal>
  );
}

export default GameOver;
