import Image from "next/image";

type DealerCardProps = {
    image: string;
}

export default function DealerCard({image}:DealerCardProps){
    return(
        <div className="relative h-[140px] w-[98px] border-2 border-black rounded-md flex-shrink-0">
            <Image
                src={image}
                alt="the dealers cards"
                fill
                sizes="98px"
                loading="eager"
                className="object-cover rounded-md"
            />
        </div>
    )
}