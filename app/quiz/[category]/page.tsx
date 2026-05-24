import  Quiz  from "@/components/quiz/index"
import { Question } from "@/types"
import { sports } from "@/configs/questions/sports"
import { history } from "@/configs/questions/history"
import { geography } from "@/configs/questions/geography"
import { arts } from "@/configs/questions/arts"
export default async function QuizPage({params}: {params: Promise<{category: string}>}) {
    const { category } = await params
    const categories: {[s: string]: Question[]} = {
        "sports": sports,
        "history": history,
        "geography": geography,
        "arts": arts
    }
    return <Quiz questions={categories[category]}/>
}