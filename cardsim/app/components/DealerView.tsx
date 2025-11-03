"use client"

import { useState, useEffect } from "react"
import DealerCard from "./DealerCard"

type DealerProps = {
    deckID: string | null
    dealerCards: [string, string][];
    setDealerCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
    isStanding: boolean;
    setDealerValue: React.Dispatch<React.SetStateAction<number>>
}

type CardData = {
    value: string;
    image: string;
}

export default function DealerView({deckID, dealerCards, setDealerCards, isStanding, setDealerValue}: DealerProps){

    const cardValues: { [key: string]: number } = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "JACK": 10,
        "QUEEN": 10,
        "KING": 10,
        "ACE": 1
    };

    useEffect(() => {
    if (!deckID) return;
    
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
        .then((response) => response.json())
        .then(data => {
            const newCards = data.cards.map((card:CardData) => [card.value, card.image]);
            const totalValue = newCards.reduce((sum: number, card: [string, string]) => sum + cardValues[card[0]], 0);
            setDealerCards(prevCards => [...prevCards, ...newCards]);
            setDealerValue(totalValue);
            console.log(totalValue);
        }); 
    }, [deckID]);

    const hitDealer = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
        setDealerCards([...dealerCards, [data.cards[0].value, data.cards[0].image]])
        setDealerValue(cardValues[data.cards[0].value]);
        console.log([data.cards[0].value, data.cards[0].image]);
        console.log(dealerCards)
    })); 
    }


    return (
    <div className="flex flex-col bg-amber-950 w-[80%] h-[60%] m-auto">
        <div className="flex justify-center items-center flex-1 w-full bg-amber-400 gap-4">
            {dealerCards.map((card, index) => (
                <DealerCard 
                    image={index === 1 && !isStanding ? 'https://deckofcardsapi.com/static/img/back.png' : card[1]} 
                    key={index}
                />
            ))}
        </div>

        <button onClick={hitDealer} className="hover:text-amber-500">Hello</button>
    </div>
)
}
