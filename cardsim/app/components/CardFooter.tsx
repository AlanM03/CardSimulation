import CardButtons from "./CardButtons";
import Card from "./Card"
import { useState } from "react" 

type FooterProps = {
    deckID: string | null
}

export default function CardFooter({deckID}: FooterProps) {

    const [cards, setCards] = useState<[number, string][]>([]);

    const hitDeck = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
        setCards([...cards, [data.cards[0].value, data.cards[0].image]])
        console.log([data.cards[0].value, data.cards[0].image]);
        console.log(cards)
    })); 
}

    return (
        <div className="w-full h-[40%]">
            <div className="grid grid-cols-[25%_50%_25%] gap-2 justify-items-center h-full">
                <div className="flex flex-col justify-center">
                    <button onClick={hitDeck} className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <h1>Hit</h1>
                    </button>
                </div>
                <div className="flex justify-center items-center flex-1 w-full bg-amber-400">
                    <div className="relative" style={{ width: `${cards.length * 40 + 80}px`, height: '160px' }}>
                        {cards.map((card, index) => (
                            <Card image={card[1]} index={index} key={index}></Card>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <button className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <h1>Stay</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}