"use client"
import { useState } from "react"
import { Question } from "@/types"
import { useQuiz } from "@/hooks/useQuiz"
import { CardCompletedQuiz } from "../completed-quiz"
import { QuestionText } from "./components/question"
import { QuestionOptions } from "./components/options"
import { QuizProgress } from "./components/progress"
import { QuestionsLengthSelection } from "@/components/questions-length-selection"
import { AnimatePresence, motion } from "framer-motion"

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
    quizLength,
    handleOptionSelect,
    setNumberOfQuestions,
    answerState,
    correctOptionId,
  } = useQuiz({ questions })

  const [selectedLength, setSelectedLength] = useState<number | null>(null)

  const handleLengthSelect = (length: number) => {
    setSelectedLength(length)
    setNumberOfQuestions(length)
  }

  if (!selectedLength) return <QuestionsLengthSelection onLengthSelect={handleLengthSelect} />
  if (quizCompleted) return <CardCompletedQuiz resetQuiz={resetQuiz} score={score} questionLength={quizLength} />

  return (
    <div className="quiz-shell w-full max-w-2xl mx-auto">
      <QuizProgress
        currentQuestionIndex={currentQuestionIndex}
        questionLength={quizLength}
        score={score}
        progress={progress}
        answerState={answerState}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="mt-6"
        >
          <QuestionText
            currentQuestion={currentQuestion}
            questionRevealed={questionRevealed}
            currentQuestionIndex={currentQuestionIndex}
            questionLength={quizLength}
          />

          <QuestionOptions
            currentQuestion={currentQuestion}
            questionRevealed={questionRevealed}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            getOptionStyle={getOptionStyle}
            answerState={answerState}
            correctOptionId={correctOptionId}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

