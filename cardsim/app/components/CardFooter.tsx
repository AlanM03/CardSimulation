import CardButtons from "./CardButtons";

type FooterProps = {
    deckID: string | null
}

export default function CardFooter({deckID}: FooterProps) {

    const buttonAction = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json()
    .then(data => {
    console.log(data);
    })); 
}

    return (
        <div className="fixed bottom-0 w-full h-80">
            <div className="grid grid-cols-[25%_50%_25%] gap-2 justify-items-center h-full">
                <div className="flex flex-col justify-center">
                    <button onClick={buttonAction} className="w-20 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <h1>Hit</h1>
                    </button>
                </div>
                <div className="flex w-full justify-center bg-amber-300">
                    <h1 className="text-red-600 ">DECK OF CARDS</h1>
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