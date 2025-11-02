"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import CardFooter from "./components/CardFooter"

export default function Home() {

  const [dealerCards, setDealerCards] = useState(null);

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
    .then((response) => response.json()
    .then(data => {setDealerCards(data);
    console.log(data);
    })); 
    
    }, []);

    

  return (
    <div className="tableBG h-screen">
      <main>
        
      </main>
      <CardFooter></CardFooter>
    </div>
  );
}
