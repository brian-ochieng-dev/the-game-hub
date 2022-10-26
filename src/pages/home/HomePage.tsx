import { useState } from "react";
import gamesInfo from "data/GameInfo.json";
import {
  StyledHome,
  GameContainer,
  ButtonContainer,
  Title,
  PlayLink,
  PlayButton,
  InfoButton,
} from "./HomePage.styled";

function HomePage() {
  const [infoClicked, setInfoClicked] = useState(false);

  const handleClick = () => {
    setInfoClicked(!infoClicked);
  };

  return (
    <StyledHome>
      {gamesInfo.map((game) => (
        <GameContainer key={game.id}>
          <Title>{game.name}</Title>

          <ButtonContainer>
            <PlayLink to={game.linkTo}>
              <PlayButton />
            </PlayLink>

            <InfoButton onClick={handleClick} />
          </ButtonContainer>
        </GameContainer>
      ))}
    </StyledHome>
  );
}

export default HomePage;
