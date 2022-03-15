import React, { useEffect } from 'react';
import './App.css';
import Card from './cards/Card.js';
import { cardData } from '../cardData';

export default function App() {
  const [cards, setCards] = React.useState([])
  const [openedCards, setOpenedCards] = React.useState([]);

  const handleClick = (item) => {
   setOpenedCards((prev) => {
     return prev.concat(item)
   })
  }

  const unfoldCards = (func) => {
    setCards (
      cardData.map(card => {
        return <Card key = {card.id}  item = {card} func = {func} openedCards = {openedCards} />
      })
    )
  }

  useEffect(() => {
    if(openedCards.length == 2) {
      unfoldCards(null)
      setTimeout((func) => {
        setOpenedCards([])
        unfoldCards(func)
      }, 1000, handleClick)
    }
  }, [openedCards])

  useEffect(() => {
    cardData.sort(() => Math.random() - 0.5);
    unfoldCards(handleClick)
  }, []);


  return (
    <div className="app">
      <h1>React MemoryHeroes</h1>
      <div className="app-container container">{cards}</div>
    </div>
  );
}
