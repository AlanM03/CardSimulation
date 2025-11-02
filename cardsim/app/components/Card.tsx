import Image from "next/image";

type CardProps = {
    image: string;
    index: number;
}

export default function Card({image, index}:CardProps){
    return(
        <div 
            className="absolute h-40 w-30 border-2 border-black rounded-md hover:!z-[100] hover:-translate-y-4 hover:scale-110 transition-all duration-200"
            style={{ left: `${index * 40}px`, zIndex: index }}
        >
            <Image 
                src={image} 
                alt="description"
                fill
                className="object-cover"
            />
        </div>
    )
}