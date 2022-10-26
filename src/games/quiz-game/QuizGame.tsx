import { useState, useEffect } from "react";
import axios from "axios";
import { v1 } from "uuid";
import GameOver from "./GameOver";
import {
  QuizGameContainer,
  Question,
  Option,
  Options,
} from "./QuizGame.styled";

function QuizGame() {
  const [quiz, setQuiz] = useState<Array<any>>([]);
  const [number, setNumber] = useState(0);
  const [pts, setPts] = useState(0);

  const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

  const pickAnswer = (e: any) => {
    const userAnswer = e.target.outerText;

    if (quiz[number].answer === userAnswer) setPts(pts + 1);
    setNumber(number + 1);
  };

  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple",
      )
      .then((res) => {
        setQuiz(
          res.data.results.map((item: any) => ({
            question: item.question,
            options: shuffle([...item.incorrect_answers, item.correct_answer]),
            answer: item.correct_answer,
          })),
        );
      })
      // eslint-disable-next-line no-alert
      .catch((err) => alert(err));
  }, []);

  return (
    <QuizGameContainer>
      {quiz[number] && (
        <>
          <Question
            dangerouslySetInnerHTML={{ __html: quiz[number].question }}
          />

          <Options>
            {quiz[number].options.map((item: any) => (
              <Option
                key={v1()}
                dangerouslySetInnerHTML={{ __html: item }}
                onClick={pickAnswer}
              />
            ))}
          </Options>
        </>
      )}
      {number === 5 && <GameOver pts={pts} />}
    </QuizGameContainer>
  );
}

export default QuizGame;
