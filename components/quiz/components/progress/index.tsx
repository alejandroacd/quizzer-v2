import { Progress } from "@/components/ui/progress"
interface QuizProgressProps {
    currentQuestionIndex: number
    questionLength: number
    score: number
    progress: number
}
export const QuizProgress = ({
    currentQuestionIndex,
    questionLength,
    score,
    progress
}: QuizProgressProps) => {
    
    return <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {questionLength}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
    </div>
}