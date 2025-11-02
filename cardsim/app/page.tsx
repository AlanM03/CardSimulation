"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import CardFooter from "./components/CardFooter"
import DealerView from "./components/DealerView";

export default function Home() {

  const [deckID, setDeckID] = useState<string | null>(null);
  const [dealerCards, setDealerCards] = useState(null);

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
    .then((response) => response.json()
    .then(data => {setDeckID(data.deck_id);
    console.log(data);
    })); 
    }, []);

  return (
    <div className="tableBG h-screen">
      <DealerView deckID={deckID}></DealerView>
      <CardFooter deckID={deckID}></CardFooter>
    </div>
  );
}
