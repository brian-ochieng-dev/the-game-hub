import styled from "styled-components";

export const Canvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 4rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 2rem;
  background: #404346;
  color: #b5d4c5;
  z-index: 1;
  cursor: pointer;
  position: absolute;
  outline: none;

  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    z-index: -1;
    background: #b5d4c5;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #404346;

    &:after {
      top: auto;
      bottom: 0;
      height: 100%;
    }
  }
`;

export const ButtonContainer = styled.div`
  height: fit-content;
`;

export const Points = styled.p`
  position: absolute;
  bottom: 0;
  right: 1rem;
  font-size: 2rem;
`;

export const GameOver = styled.div`
  position: absolute;
  font-size: 5rem;
  margin-bottom: 10rem;
`;

export const FinishedGame = styled.p`
  position: absolute;
  top: 60px;
  font-size: 5rem;
  color: red;
  text-decoration: underline;
`;
