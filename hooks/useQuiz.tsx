import { useEffect } from "react"
import { useState } from "react"
import { Question, Option } from "@/types"
export const useQuiz = ({ questions }: { questions: Question[] }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [score, setScore] = useState(0)
    const [questionRevealed, setQuestionRevealed] = useState(false)
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    useEffect(() => {
        setQuestionRevealed(false)
        const timer = setTimeout(() => {
            setQuestionRevealed(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [currentQuestionIndex])

    const handleOptionSelect = (optionId: string) => {
        if (selectedOption) return

        setSelectedOption(optionId)

        const selectedOptionData = currentQuestion.options.find((opt) => opt.id === optionId)
        const isCorrect = selectedOptionData?.correct || false

        if (isCorrect) {
            setScore(score + 1)
        }

        // Auto advance to next question after animation
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedOption(null)
            } else {
                setQuizCompleted(true)
            }
        }, 300)
    }

    const getOptionStyle = (option: Option) => {
        if (selectedOption === option.id) {
            const selectedOptionData = currentQuestion.options.find((opt) => opt.id === selectedOption)
            const isCorrect = selectedOptionData?.correct || false

            return isCorrect
                ? "border-green-500 bg-gradient-to-r from-green-400 to-green-500 text-white transform scale-[0.98] shadow-lg animate-pulse"
                : "border-red-500 bg-gradient-to-r from-red-400 to-red-500 text-white transform scale-[0.98] shadow-lg animate-pulse"
        }

        return "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800 hover:scale-[1.01] hover:shadow-md"
    }

    const resetQuiz = () => {
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setQuizCompleted(false)
        setScore(0)
    }


    return {
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedOption,
        setSelectedOption,
        quizCompleted,
        setQuizCompleted,
        score,
        setScore,
        questionRevealed,
        setQuestionRevealed,
        getOptionStyle,
        resetQuiz,
        progress,
        currentQuestion,
        handleOptionSelect
    }
}