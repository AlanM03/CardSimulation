import CardButtons from "../ui/CardButtons";
import Card from "./Card"
import { useEffect } from "react" 

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

    useEffect(() => {
        if (gameOver) return;

        if (isStanding && dealerHandValue < 17 && !dealerBust && !userBust) {
            setTimeout(() => {
                hitDealer();
            }, 1000);
            return;
        }

        if (dealerHandValue > 21 && isStanding) {
            setDealerBust(true);
            setGameOver(true);
            setPlayerWon(true);
            setTie(false);
            return;
        }

        if (isStanding && dealerHandValue >= 17 && dealerHandValue <= 21 && !userBust) {
            setGameOver(true);
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

    const cardContainerWidth = userCards.length > 0 ? (userCards.length - 1) * 35 + 98 : 98;

    return (
        <div className="w-full flex-1 flex items-center justify-center px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <CardButtons text="Hit" isDisabled={isStanding || userBust} buttonFunction={hitDeck} />
                <div className="flex justify-center items-center overflow-x-auto w-full sm:w-auto">
                    <div className="relative" style={{ width: `${cardContainerWidth}px`, height: '140px' }}>
                        {userCards.map((card, index) => (
                            <Card image={card[1]} index={index} key={index} />
                        ))}
                    </div>
                </div>
                <CardButtons text="Stay" isDisabled={isStanding || userBust} buttonFunction={setStanding} />
            </div>
        </div>
    );
}