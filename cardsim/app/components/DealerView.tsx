"use client"

import { useState, useEffect } from "react"
import DealerCard from "./DealerCard"

type DealerProps = {
    deckID: string | null
}

type CardData = {
    value: string;
    image: string;
}

export default function DealerView({deckID}: DealerProps){

    const [dealerCards, setDealerCards] = useState<[number, string][]>([]);
    const [showDealerCard, setShowDealerCard] = useState(false);

    useEffect(() => {
    if (!deckID) return;
    
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then((response) => response.json())
    .then(data => {
        const newCards = data.cards.map((card:CardData) => [card.value, card.image]);
        setDealerCards(prevCards => [...prevCards, ...newCards]);
        console.log(newCards);
    }); 
}, [deckID]);

    const hitDealer = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
        setDealerCards([...dealerCards, [data.cards[0].value, data.cards[0].image]])
        console.log([data.cards[0].value, data.cards[0].image]);
        console.log(dealerCards)
    })); 
}


    return (
    <div className="flex flex-col bg-amber-950 w-[80%] h-[60%] m-auto">
        <div className="flex justify-center items-center flex-1 w-full bg-amber-400 gap-4">
            {dealerCards.map((card, index) => (
                <DealerCard 
                    image={index === 1 && !showDealerCard ? 'https://deckofcardsapi.com/static/img/back.png' : card[1]} 
                    key={index}
                />
            ))}
        </div>

        <button onClick={hitDealer} className="hover:text-amber-500">Hello</button>
    </div>
)
}
