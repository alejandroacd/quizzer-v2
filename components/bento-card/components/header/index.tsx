import Image from "next/image"
import { CardHeader } from "@/components/ui/card"

interface HeaderProps {
    image: string
    border: string
    title: string
    layout: string
}
export const Header = ({
    image,
    border,
    title,
    layout }: HeaderProps) => {
    return <CardHeader className="p-0 flex items-center gap-2">
        <div className={`relative p-3 bg-card/80 backdrop-blur-sm rounded-${layout === "large" ? "2xl" : "xl"} border border-primary/20 ${border} transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>

            {image && <Image
                src={image}
                alt={title}
                width={30}
                height={30}
            />}
        </div>
        <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-balance">
            {title}
        </h1>
    </CardHeader>
}