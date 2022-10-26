import styled from "styled-components";
import { Container } from "globalStyles";

export const QuizGameContainer = styled(Container)`
  display: Flex;
  flex-direction: column;
`;

export const QuizWindow = styled.div`
  text-align: center;
  font-size: clamp(20px, 2.5vw, 24px);
  margin-top: 10vh;
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 2rem;
  width: 100%;

  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`;

export const Option = styled.button`
  display: block;
  border: 1px solid #616a94;
  border-radius: 15px;
  padding: 15px 30px;
  text-decoration: none;
  color: #616a94;
  background-color: #161a31;
  transition: 0.3s;
  font-size: 1em;
  outline: none;
  user-select: none;
  margin-top: 1em;
  cursor: pointer;

  @media screen and (min-width: 1180px) {
    &:hover {
      color: white;
      background-color: #616a94;
    }
  }
`;

export const Question = styled.div`
  width: 70%;
  margin: 0 auto;
  display: block;
  border: 1px solid #616a94;
  border-radius: 15px;
  padding: 15px 30px;
  text-decoration: none;
  color: #616a94;
  transition: 0.3s;
  font-size: 1em;
`;

export const Button = styled.button`
  border: 1px solid #616a94;
  border-radius: 50px;
  padding: 15px 30px;
  text-decoration: none;
  color: #616a94;
  background-color: #161a31;
  transition: 0.3s;
  font-size: 1em;
  cursor: pointer;
  outline: none;

  &:hover {
    color: white;
    background-color: #616a94;
  }
`;

export const Title = styled.h1`
  margin-top: 4em;
  font-size: 48px;
`;

export const Points = styled.p`
  font-size: 24px;
  margin-bottom: 3em;
`;
