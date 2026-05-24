import { useEffect, useCallback } from "react"
import { useState } from "react"
import { Question, Option } from "@/types"
import { shuffleArray } from "@/utils"

export type AnswerState = "idle" | "correct" | "wrong"

export const useQuiz = ({ questions }: { questions: Question[] }) => {
    const [quizLength, setQuizLength] = useState<number>(questions.length > 50 ? 50 : questions.length)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [score, setScore] = useState(0)
    const [questionRevealed, setQuestionRevealed] = useState(false)
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions)
    const [answerState, setAnswerState] = useState<AnswerState>("idle")

    const activeQuestions = shuffledQuestions.length > 0
        ? shuffledQuestions
        : questions.slice(0, quizLength)
    const currentQuestion = activeQuestions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / quizLength) * 100

    const correctOptionId = currentQuestion?.options.find((opt) => opt.correct)?.id ?? null

    useEffect(() => {
        setQuestionRevealed(false)
        const timer = setTimeout(() => {
            setQuestionRevealed(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [currentQuestionIndex])

    const handleOptionSelect = useCallback((optionId: string) => {
        if (selectedOption) return

        setSelectedOption(optionId)

        const selectedOptionData = currentQuestion.options.find((opt) => opt.id === optionId)
        const isCorrect = selectedOptionData?.correct || false

        if (isCorrect) {
            setScore((s) => s + 1)
            setAnswerState("correct")
        } else {
            setAnswerState("wrong")
        }

        // Auto advance to next question after animations settle
        setTimeout(() => {
            setAnswerState("idle")
            if (currentQuestionIndex < activeQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedOption(null)
            } else {
                setQuizCompleted(true)
            }
        }, 1200)
    }, [selectedOption, currentQuestion, currentQuestionIndex, activeQuestions.length])

    // Keyboard shortcut: 1-4 keys map to option indices
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const idx = parseInt(e.key, 10) - 1
            if (idx >= 0 && idx < currentQuestion?.options.length) {
                handleOptionSelect(currentQuestion.options[idx].id)
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [currentQuestion, handleOptionSelect])

    const getOptionStyle = (option: Option) => {
        if (!selectedOption) return ""

        if (option.id === selectedOption) {
            return option.correct ? "correct-selected" : "wrong-selected"
        }
        if (option.correct && selectedOption) {
            return "correct-reveal"
        }
        return "dimmed"
    }

    const resetQuiz = () => {
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setQuizCompleted(false)
        setScore(0)
        setAnswerState("idle")
    }

    const setNumberOfQuestions = (num: number) => {
        const length = Math.min(num, 50, questions.length)
        const randomized = shuffleArray(questions).slice(0, length)
        setShuffledQuestions(randomized)
        setQuizLength(length)
        resetQuiz()
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
        answerState,
        correctOptionId,
        getOptionStyle,
        resetQuiz,
        progress,
        currentQuestion,
        handleOptionSelect,
        quizLength,
        setNumberOfQuestions
    }
}