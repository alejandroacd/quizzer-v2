import { Question } from "@/types"
import { motion } from "framer-motion"

interface QuestionTextProps {
    currentQuestion: Question
    questionRevealed: boolean
    currentQuestionIndex: number
    questionLength: number
}

const LABELS = ["A", "B", "C", "D"]

export const QuestionText = ({
    currentQuestion,
    currentQuestionIndex,
    questionLength,
}: QuestionTextProps) => {
    return (
        <div className="mb-8 text-center">
            {/* Question number badge */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="inline-flex items-center gap-2 mb-5"
            >
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/70 px-3 py-1 rounded-full border border-border/50 bg-muted/30 backdrop-blur-sm">
                    Question {currentQuestionIndex + 1} <span className="opacity-50">/ {questionLength}</span>
                </span>
            </motion.div>

            {/* Question text */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 28 }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance leading-tight"
            >
                {currentQuestion.question}
            </motion.h2>

            {/* Keyboard hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-3 flex items-center justify-center gap-2"
            >
                {LABELS.map((label) => (
                    <span
                        key={label}
                        className="text-[10px] font-mono font-bold text-muted-foreground/40 border border-border/30 rounded px-1.5 py-0.5 leading-none"
                    >
                        {label}
                    </span>
                ))}
                <span className="text-[10px] text-muted-foreground/40 ml-1">or press 1–4</span>
            </motion.div>
        </div>
    )
}
