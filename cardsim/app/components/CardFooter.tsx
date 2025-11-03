import CardButtons from "./CardButtons";
import Card from "./Card"
import { useState, useEffect } from "react" 

type FooterProps = {
    deckID: string | null
    userCards: [string, string][];
    setUserCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
    isStanding: boolean;
    setIsStanding: React.Dispatch<React.SetStateAction<boolean>>;
    dealerCards: [string, string][];
    setDealerCards: React.Dispatch<React.SetStateAction<[string, string][]>>;
    setUserHandValue: React.Dispatch<React.SetStateAction<number>>;
    setDealerHandValue: React.Dispatch<React.SetStateAction<number>>;
    userHandValue: number;
    dealerHandValue: number;
    userBust: boolean;
    setUserBust: React.Dispatch<React.SetStateAction<boolean>>;
    dealerBust: boolean;
    setDealerBust: React.Dispatch<React.SetStateAction<boolean>>;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayerWon: React.Dispatch<React.SetStateAction<boolean>>;
    setTie: React.Dispatch<React.SetStateAction<boolean>>;
    gameOver: boolean;
}

type CardData = {
    value: string;
    image: string;
}

export default function CardFooter({deckID, userCards, setUserCards, isStanding, setIsStanding, dealerCards, setDealerCards, setUserHandValue, setDealerHandValue, userHandValue, dealerHandValue, userBust, setUserBust, dealerBust, setDealerBust, setGameOver, setPlayerWon, setTie, gameOver}: FooterProps) {

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
        if (userHandValue > 21 && !gameOver) {
            setUserBust(true);
            setGameOver(true);
            setPlayerWon(false);
            setTie(false);
        }
    }, [userHandValue, gameOver]);

    //after user stands the dealer plays
    useEffect(() => {
        // Don't process if game is already over
        if (gameOver) return;
        
        // Dealer keeps hitting until 17 or busts
        if (isStanding && dealerHandValue < 17 && !dealerBust && !userBust) {
            setTimeout(() => {
                hitDealer();
            }, 1000);
            return; 
        }
        
        // Check if dealer busts
        if (dealerHandValue > 21 && isStanding) {
            setDealerBust(true);
            setGameOver(true);
            setPlayerWon(true);
            setTie(false);
            return;
        }
        
        // Dealer has 17+ and hasn't busted
        if (isStanding && dealerHandValue >= 17 && dealerHandValue <= 21 && !userBust) {
            setGameOver(true);
            console.log("Final comparison - User:", userHandValue, "Dealer:", dealerHandValue);
            if (userHandValue > dealerHandValue) {
                setPlayerWon(true);
                setTie(false);
            } else if (userHandValue === dealerHandValue) {
                setTie(true);
                setPlayerWon(false);
            } else {
                setPlayerWon(false);
                setTie(false);
            }
        }

    }, [dealerHandValue, isStanding, dealerBust, userBust, gameOver, userHandValue]);

    //to load users first two cards
    useEffect(() => {
        if (!deckID) return;
        
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
            .then((response) => response.json())
            .then(data => {
                const newCards = data.cards.map((card:CardData) => [card.value, card.image]);
                const totalValue = newCards.reduce((sum: number, card: [string, string]) => sum + cardValues[card[0]], 0);
                setUserCards(prevCards => [...prevCards, ...newCards]);
                setUserHandValue(totalValue);
            }); 
        }, [deckID]);

    const hitDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then((response) => response.json())
        .then(data => {
            setUserCards(prevCards => [...prevCards, [data.cards[0].value, data.cards[0].image]]);
            setUserHandValue(prevVal => prevVal + cardValues[data.cards[0].value]);
        }); 
    }

    const hitDealer = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then((response) => response.json())
        .then(data => {
            setDealerCards(prevCards => [...prevCards, [data.cards[0].value, data.cards[0].image]]);
            setDealerHandValue(prevVal => prevVal + cardValues[data.cards[0].value]);
        }); 
    }

    const setStanding = async () => {
        setIsStanding(!isStanding);
    }

    return (
        <div className="w-full h-[40%]">
            <div className="grid grid-cols-[25%_50%_25%] gap-2 justify-items-center h-full">
                <div className="flex flex-col justify-center">
                    <CardButtons text={"Hit"} isDisabled={isStanding} buttonFunction={hitDeck} className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"></CardButtons>
                </div>
                <div className="flex justify-center items-center flex-1 w-full">
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