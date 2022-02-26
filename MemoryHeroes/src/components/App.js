import React, { useEffect } from 'react';
import './App.css';
import Card from './cards/Card.js';
import { cardData } from '../cardData';

export default function App() {
  const [cards, setCards] = React.useState([]);
  const openedCardsRef = React.useRef([]);

  const unfoldCards = (func) => {
    setCards(
      cardData.map((item) => {
        return <Card key={item.id} item={item} onClick={func} />;
      }),
    );
  };

  const cardsRefTransform = () => {
    let compareCardsRef = openedCardsRef.current.reduce((prevCard, card) => {
      return prevCard.detach === card.detach;
    });

    let changeCardValue = (num, value) => {
      cardData.forEach((elem) => {
        if (value) {
          if (elem.id === openedCardsRef.current[num].id) 
            elem.guessed = true;
        } else {
          if (elem.id === openedCardsRef.current[num].id) 
            elem.active = false;
        }
      })
    }

    if (compareCardsRef) {
      changeCardValue(0, true)
      changeCardValue(1, true)
    } else {
      changeCardValue(0, false)
      changeCardValue(1, false) 
    }
  };

  const addCardToCardsRef = (item) => {
    if(!item.active && !item.guessed) {
    openedCardsRef.current.push(item)
     item.active = !item.active
    }
  }

  const handleClick = (item) => {
    if (openedCardsRef.current.length < 1) {
      addCardToCardsRef(item)
      unfoldCards(handleClick)
    } else {
      addCardToCardsRef(item)
      unfoldCards(null);
      setTimeout(
        (func) => {
          cardsRefTransform();
          unfoldCards(func);
          openedCardsRef.current = [];
        },
        1000,
        handleClick,
      );
    }
  };

  const mixCards = () => {
    cardData.sort(() => Math.random() - 0.5);
    unfoldCards(handleClick);
  };

  useEffect(() => {
    mixCards();
  }, []);

  return (
    <div className="app">
      <h1>React MemoryHeroes</h1>
      <div className="app-container container">{cards}</div>
    </div>
  );
}
