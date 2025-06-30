import  Quiz  from "@/components/quiz/index"
import { sports } from "@/configs/questions/sports"
export default async function  QuizPage({params}: {params: {category: string}}) {
    return <Quiz  questions={sports}/>
}