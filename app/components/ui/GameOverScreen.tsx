type GameOverProps = {
    playerWon: boolean;
    tie: boolean;
}

export default function GameOverScreen({playerWon, tie}: GameOverProps){
    const handleRetry = () => {
        window.location.reload();
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative bg-white rounded-xl shadow-2xl border-4 border-gray-800 dark:bg-gray-700 dark:border-gray-600">
                <div className="p-8 sm:p-10 text-center min-w-[280px] sm:min-w-[350px]">
                    {tie ? (
                        <h3 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">It&apos;s a Tie!</h3>
                    ) : playerWon ? (
                        <h3 className="mb-6 text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">You Won!</h3>
                    ) : (
                        <h3 className="mb-6 text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">You Lost!</h3>
                    )}
                    <button
                        onClick={handleRetry}
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 font-bold rounded-lg text-base sm:text-lg px-8 py-3.5 w-full"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    )
}