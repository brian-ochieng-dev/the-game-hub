import { useState, useEffect } from "react";
import { v1 } from "uuid";
import SingleCard from "./Card";
import { cardImg } from "./constants";
import {
  Table,
  TurnCounter,
  MemoryGameContainer,
  ResetButton,
} from "./MemoryGame.styled";

interface CardProps {
  src: string;
  matched: boolean;
  id?: string;
}

function MemoryGame() {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardProps | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardProps | null>(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle
  const shuffleCards = () => {
    const shuffledCards: Array<CardProps> = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: v1() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card: any) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // show cards on game start
  const showCards = () => {
    setCards((showCard) => {
      return showCard.map((card) => {
        return { ...card, matched: true };
      });
    });
    setTimeout(() => {
      setCards((showCard) => {
        return showCard.map((card) => {
          return { ...card, matched: false };
        });
      });
    }, 1500);
  };

  // reset game
  const resetGame = () => {
    shuffleCards();
    showCards();
  };

  // compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // start new game
  useEffect(() => {
    shuffleCards();
    showCards();
  }, []);

  return (
    <MemoryGameContainer>
      <Table>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </Table>

      <ResetButton onClick={resetGame}>Reset</ResetButton>
      <TurnCounter>Turns: {turns}</TurnCounter>
    </MemoryGameContainer>
  );
}

export default MemoryGame;
