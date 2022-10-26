import cover from "assets/cover.png";
import { Card } from "./MemoryGame.styled";

interface CardProps {
  src: string;
  matched: boolean;
}

interface PropTypes {
  card: CardProps;
  handleChoice: Function;
  flipped: Boolean;
  disabled: Boolean;
}

function SingleCard({ card, handleChoice, flipped, disabled }: PropTypes) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <Card>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <button type="submit" onClick={handleClick}>
          <img className="back" src={cover} alt="cover" />
        </button>
      </div>
    </Card>
  );
}

export default SingleCard;
