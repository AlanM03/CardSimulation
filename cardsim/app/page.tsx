"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import CardFooter from "./components/CardFooter"
import DealerView from "./components/DealerView";
import GameOverScreen from "./components/GameOverScreen";

export default function Home() {

  const [deckID, setDeckID] = useState<string | null>(null);
  const [userCards, setUserCards] = useState<[string, string][]>([]);
  const [dealerCards, setDealerCards] = useState<[string, string][]>([]);
  const [userTotalValue, setUserTotalValue] = useState<number>(0);
  const [dealerTotalValue, setDealerTotalValue] = useState<number>(0);
  const [isStanding, setIsStanding] = useState<boolean>(false);
  const [userBust, setUserBust] = useState<boolean>(false);
  const [dealerBust, setDealerBust] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<boolean>(false);
  const [tie, setTie] = useState<boolean>(false);

  //sets the decks for blackjack
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
    .then((response) => response.json()
    .then(data => {setDeckID(data.deck_id);
    })); 
    }, []);

  return (
    <div className="tableBG h-screen">
      <DealerView isStanding={isStanding} dealerCards={dealerCards} setDealerCards={setDealerCards} deckID={deckID} setDealerHandValue={setDealerTotalValue}></DealerView>
      <CardFooter isStanding={isStanding} setIsStanding={setIsStanding} userCards={userCards} setUserCards={setUserCards} deckID={deckID} dealerCards={dealerCards} setDealerCards={setDealerCards} userHandValue={userTotalValue} dealerHandValue={dealerTotalValue} setUserHandValue={setUserTotalValue} setDealerHandValue={setDealerTotalValue} userBust={userBust} setUserBust={setUserBust} dealerBust={dealerBust} setDealerBust={setDealerBust} setGameOver={setGameOver}
  setPlayerWon={setPlayerWon} setTie={setTie} gameOver={gameOver}></CardFooter>
      {gameOver && ( <GameOverScreen tie={tie} playerWon={playerWon} />)}
    </div>
  );
}
