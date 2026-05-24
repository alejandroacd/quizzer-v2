import { PlayIcon } from "lucide-react"
import { CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
export const Footer = ({categoryId}: {categoryId: string}) => {
    const router = useRouter()
    return <CardFooter className=" p-0 flex justify-end z-10">
        <div className="p-2 border border-secondary/80 rounded-full cursor-pointer hover:bg-secondary/20">
            <PlayIcon className="w-4 h-4" />
        </div>
    </CardFooter>
}

