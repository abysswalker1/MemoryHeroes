import React, { useEffect } from 'react';
import './Card.css';

export default function Card(props) {
  const [active, setActive] = React.useState(props.item.guessed);

  const handleClick = () => {
    if (!active && props.func) {
      setActive(true);
      props.func(props.item);
    }
  };

  const checkDetach = () => {
    if (props.item.id === props.openedCards[0].id || props.item.id === props.openedCards[1].id) {
      props.item.guessed = true;
    }
  };

  useEffect(() => {
    if (props.openedCards.length == 2 && !props.item.guessed) {
      const compareTwoCards = props.openedCards.reduce((first, second) => {
        return first.detach === second.detach;
      });

      setTimeout(() => {
        if (compareTwoCards) {
          checkDetach();
        } else setActive(false);
      }, 1000);
    }
  }, [props.openedCards]);

  return (
    <div className="card" onClick={() => handleClick()}>
      <div className="card-front" style={active ? { transform: 'rotateY(180deg)' } : null}></div>
      <div className="card-back" style={active ? { transform: 'rotateY(360deg)' } : null}>
        <img className="card-back-image" src={`${props.item.image}`} />
      </div>
    </div>
  );
}
