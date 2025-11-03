type GameOverProps = {
    playerWon: boolean;
    tie: boolean;
}

export default function GameOverScreen({playerWon, tie}: GameOverProps){
    
    const handleRetry = () => {
        window.location.reload();
    }
    
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        {tie ? (
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">It's a Tie!</h3>
                        ) : playerWon ? (
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Congratulations! You Won!</h3>
                        ) : (
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You lost!</h3>
                        )}
                        <button 
                            onClick={handleRetry}
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}