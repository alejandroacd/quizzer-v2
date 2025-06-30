"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Question } from "@/types"
import { useQuiz } from "@/hooks/useQuiz"
import { CardCompletedQuiz } from "../completed-quiz"
import { QuestionText } from "./components/question"
import { QuestionOptions } from "./components/options"
import { QuizProgress } from "./components/progress"
interface QuizProps {
    questions: Question[]
}

export default function Quiz({ questions }: QuizProps) {
    const {
        currentQuestionIndex,
        selectedOption,
        quizCompleted,
        score,
        progress,
        questionRevealed,
        resetQuiz,
        currentQuestion,
        getOptionStyle,
        handleOptionSelect,
    } = useQuiz({ questions })

    if (quizCompleted) return <CardCompletedQuiz resetQuiz={resetQuiz} score={score} questionLenght={questions.length} />
    return (
        <Card className="w-full max-w-2xl transition-all duration-300">
            <CardContent className="p-8">
                {/* Progress Bar */}
                <QuizProgress
                    currentQuestionIndex={currentQuestionIndex}
                    questionLength={questions.length}
                    score={score}
                    progress={progress}
                />
                {/* Question */}
                <QuestionText currentQuestion={currentQuestion} questionRevealed={questionRevealed} />

                {/* Options */}
                <QuestionOptions
                    currentQuestion={currentQuestion}
                    questionRevealed={questionRevealed}
                    selectedOption={selectedOption}
                    handleOptionSelect={handleOptionSelect}
                    getOptionStyle={getOptionStyle}
                />
            </CardContent>
        </Card>
    )
}
