import Image from "next/image";

type DealerCardProps = {
    image: string;
}

export default function Card({image}:DealerCardProps){
    return(
        <div className="relative h-40 w-30 border-2 border-black rounded-md">
            <Image 
                src={image} 
                alt="the dealers cards"
                fill
                sizes="120px"
                loading="eager"
                className="object-cover"
            />
        </div>
    )
}