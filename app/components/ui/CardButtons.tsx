type ButtonProps = {
    buttonFunction?: () => void;
    text: string;
    isDisabled: boolean
}

export default function CardButtons({buttonFunction, text, isDisabled}: ButtonProps) {
    return (
        <button
            disabled={isDisabled}
            onClick={buttonFunction}
            className="w-24 sm:w-28 text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-semibold rounded-lg text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
            {text}
        </button>
    )
}