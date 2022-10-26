import styled from "styled-components";
import { Container, Button } from "globalStyles";

export const MemoryGameContainer = styled(Container)`
  // will add theme later
`;

export const Table = styled.div`
  height: 500px;
  width: 500px;
  display: grid;
  margin-top: 3rem;
  grid-template-columns: repeat(4, auto);
  gap: 0.5rem;
`;

export const Card = styled.div`
  position: relative;
  display: flex;

  * {
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    outline: none;
  }

  .front {
    transform: rotateY(90deg);
    transition: all ease-in 0.2s;
    position: absolute;
  }
  .back {
    transition: all ease-in 0.2s;
    transition-delay: 0.2s;
  }

  .flipped {
    .front {
      transform: rotateY(0deg);
      transition-delay: 0.2s;
    }
    .back {
      transform: rotateY(90deg);
      transition-delay: 0s;
    }
  }
`;

export const ResetButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 4rem;
`;

export const TurnCounter = styled.div`
  margin: 3rem;
  position: absolute;
  right: 1em;
  bottom: 0;
`;
