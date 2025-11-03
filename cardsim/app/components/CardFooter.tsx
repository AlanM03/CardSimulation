import CardButtons from "./CardButtons";
import Card from "./Card"
import { useState } from "react" 

type FooterProps = {
    deckID: string | null
    userCards: [string, string][];
    setUserCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
    isStanding: boolean;
    setIsStanding: React.Dispatch<React.SetStateAction<boolean>>;
    dealerCards: [string, string][];
    setDealerCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
}

export default function CardFooter({deckID, userCards, setUserCards, isStanding, setIsStanding, dealerCards, setDealerCards}: FooterProps) {

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

    const hitDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then((response) => response.json()
        .then(data => {
            setUserCards([...userCards, [data.cards[0].value, data.cards[0].image]])
            
    })); 
    }

    const hitDealer = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
        setDealerCards([...dealerCards, [data.cards[0].value, data.cards[0].image]])
        
    })); 
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const setStanding = async () => {
            setIsStanding(!isStanding);
            await sleep(1000);
            hitDealer();
            
    }

    return (
        <div className="w-full h-[40%]">
            <div className="grid grid-cols-[25%_50%_25%] gap-2 justify-items-center h-full">
                <div className="flex flex-col justify-center">
                    <CardButtons text={"Hit"} isDisabled={isStanding} buttonFunction={hitDeck} className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"></CardButtons>
                </div>
                <div className="flex justify-center items-center flex-1 w-full bg-amber-400">
                    <div className="relative" style={{ width: `${userCards.length * 40 + 80}px`, height: '160px' }}>
                        {userCards.map((card, index) => (
                            <Card image={card[1]} index={index} key={index}></Card>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <CardButtons text={"Stay"} isDisabled={isStanding} buttonFunction={setStanding} className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"></CardButtons>
                </div>
            </div>
        </div>
    );
}