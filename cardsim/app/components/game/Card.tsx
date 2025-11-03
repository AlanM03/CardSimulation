import Image from "next/image";

type CardProps = {
    image: string;
    index: number;
}

export default function Card({image, index}:CardProps){
    return(
        <div
            className="absolute h-[140px] w-[98px] border-2 border-black rounded-md"
            style={{ left: `${index * 35}px`, zIndex: index }}
        >
            <Image
                src={image}
                alt="the players cards"
                fill
                sizes="98px"
                loading="eager"
                className="object-cover rounded-md"
            />
        </div>
    )
}