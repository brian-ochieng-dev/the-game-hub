import { Button, Title, Points } from "./QuizGame.styled";

interface Provider {
  pts: number;
}

function GameOver({ pts }: Provider) {
  const refreshPage = () => window.location.reload();

  return (
    <>
      <Title>Game Over</Title>
      <Points>You did {pts} out of 5!</Points>
      <Button onClick={refreshPage}>Retry</Button>
    </>
  );
}

export default GameOver;
