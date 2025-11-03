"use client"

import { useState, useEffect } from "react"
import DealerCard from "./DealerCard"

type DealerProps = {
    deckID: string | null
    dealerCards: [string, string][];
    setDealerCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
    isStanding: boolean;
    setDealerHandValue: React.Dispatch<React.SetStateAction<number>>
}

type CardData = {
    value: string;
    image: string;
}

export default function DealerView({deckID, dealerCards, setDealerCards, isStanding, setDealerHandValue}: DealerProps){

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
            setDealerHandValue(totalValue);
        }); 
    }, [deckID]);

    const hitDealer = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
        setDealerCards([...dealerCards, [data.cards[0].value, data.cards[0].image]])
        setDealerHandValue(prevValue => prevValue + cardValues[data.cards[0].value]);
    })); 
    }


    return (
    <div className="flex flex-col w-[80%] h-[60%] m-auto">
        <div className="flex justify-center items-center flex-1 w-full gap-4">
            {dealerCards.map((card, index) => (
                <DealerCard 
                    image={index === 1 && !isStanding ? 'https://deckofcardsapi.com/static/img/back.png' : card[1]} 
                    key={index}
                />
            ))}
        </div>

    </div>
)
}
