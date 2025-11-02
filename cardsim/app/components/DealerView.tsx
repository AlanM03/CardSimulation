"use client"

import { useState, useEffect } from "react"
import DealerCard from "./DealerCard"

type DealerProps = {
    deckID: string | null
}

export default function DealerView({deckID}: DealerProps){

    const [dealerCards, setDealerCards] = useState<[number, string][]>([]);

    useEffect(() => {
    if (!deckID) return;
    
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json())
    .then(data => {
        setDealerCards([...dealerCards, [data.cards[0].value, data.cards[0].image]]);
        console.log([data.cards[0].value, data.cards[0].image]);
        console.log(dealerCards);
        }); 
    }, [deckID]);


    return (
    <div className="flex flex-col bg-amber-950 w-[80%] h-[60%] m-auto">
        <div className="flex justify-center items-center flex-1 w-full bg-amber-400 gap-4">
            {dealerCards.map((card, index) => (
                <DealerCard image={card[1]} key={index}></DealerCard>
            ))}
        </div>
    </div>
)
}
