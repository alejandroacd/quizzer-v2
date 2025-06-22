import { Content } from "./components/content"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PlayIcon } from "lucide-react"
import { HoverBorderGradient } from "../hover-border-effect"
import { getLayoutClasses, getIconAnimation, renderSpecialEffect } from "../bento-grid/utils"
import { Header } from "./components/header"
import { RenderSpecialEffect } from "./components/special-hover-effect"
import { Footer } from "./components/footer"
export const BentoCard = ({ category, themeColors }: any) => {
    return <Card key={category.id} className={`group p-0 perspective-1000 ${getLayoutClasses(category.layout)}`}>
        <HoverBorderGradient
            containerClassName="rounded-xl w-full h-full"
            className="bg-card text-foreground w-full h-full"
            duration={1}
        >
            <Card className={`relative px-3  overflow-hidden  transition-all duration-700 ease-out group-hover:shadow-2xl ${themeColors.shadow}  transform-gpu h-full`}>
                <Header
                    image={category.image}
                    border={themeColors.border}
                    title={category.title}
                    layout={category.layout}
                />
              
                <RenderSpecialEffect specialEffect={category.specialEffect} />
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/30 to-accent/0 opacity-20 group-hover:opacity-10 transition-opacity duration-500 blur-sm`}>
                </div>
                <Content description={category.description} />
                <Footer />
            </Card>
        </HoverBorderGradient>
    </Card>
}