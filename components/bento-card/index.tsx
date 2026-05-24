import { Content } from "./components/content"
import { Card } from "@/components/ui/card"
import { HoverBorderGradient } from "../hover-border-effect"
import { getLayoutClasses } from "../bento-grid/utils"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Category, ThemeColor } from "./types"
import { useRouter } from "next/navigation"
interface BentoCardProps {
    category: Category
    themeColors: ThemeColor
}

export const BentoCard = ({ category, themeColors }: BentoCardProps) => {
    const router = useRouter()
    const categoryId = category.id
    
    return <Card
        key={category.id}
        className={`group p-0 perspective-1000  ${getLayoutClasses(category.layout)}`}>

        <HoverBorderGradient
            containerClassName="rounded-xl w-full h-full"
            className="bg-card text-foreground w-full h-full"
            duration={1}
        >
            <Card className={`relative px-3  cursor-pointer overflow-hidden  transition-all duration-700 ease-out group-hover:shadow-2xl ${themeColors.shadow}  transform-gpu h-full`}
             onClick={() => router.push(`/quiz/${categoryId}`)}
            >
                <Header
                    image={category.image}
                    border={themeColors.border}
                    title={category.title}
                    layout={category.layout}
                />

                <div className={`absolute  inset-0 rounded-lg  opacity-20 group-hover:opacity-10 transition-opacity duration-500 blur-sm`}>
                </div>
                <Content description={category.description} />
                <Footer />
            </Card>
        </HoverBorderGradient>
    </Card>
}