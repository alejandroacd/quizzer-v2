import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { RotateCcw } from "lucide-react"
interface CardCompletedQuizProps {
    resetQuiz: () => void
    score: number
    questionLenght: number

}
export const CardCompletedQuiz = ({
    resetQuiz,
    score,
    questionLenght
}: CardCompletedQuizProps) => {
    return  <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-2xl">
        <CardContent className="p-8 text-center">
            <div className="mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-2">¡Quiz Completado!</h2>
                <p className="text-gray-600 dark:text-gray-400">Has terminado el quiz de deportes</p>
            </div>

            <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {score}/{questionLenght}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    {score === questionLenght
                        ? "¡Perfecto! Eres un experto en deportes"
                        : score >= questionLenght * 0.7
                            ? "¡Muy bien! Tienes buenos conocimientos"
                            : score >= questionLenght * 0.5
                                ? "No está mal, pero puedes mejorar"
                                : "Necesitas estudiar más sobre deportes"}
                </p>
            </div>

            <Button onClick={resetQuiz} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Intentar de nuevo
            </Button>
        </CardContent>
    </Card>
</div>

}