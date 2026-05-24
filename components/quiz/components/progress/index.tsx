import { AnswerState } from "@/hooks/useQuiz"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface QuizProgressProps {
    currentQuestionIndex: number
    questionLength: number
    score: number
    progress: number
    answerState: AnswerState
}

const DOT_THRESHOLD = 15

export const QuizProgress = ({
    currentQuestionIndex,
    questionLength,
    score,
    answerState,
}: QuizProgressProps) => {
    const [displayScore, setDisplayScore] = useState(score)
    const [scoreDelta, setScoreDelta] = useState<number | null>(null)

    useEffect(() => {
        if (score !== displayScore) {
            setScoreDelta(score - displayScore)
            setDisplayScore(score)
            const t = setTimeout(() => setScoreDelta(null), 900)
            return () => clearTimeout(t)
        }
    }, [score, displayScore])

    const useDots = questionLength <= DOT_THRESHOLD

    return (
        <div className="flex items-center justify-between gap-4">
            {/* Progress indicator */}
            {useDots ? (
                <div className="flex items-center gap-1.5 flex-1 flex-wrap">
                    {Array.from({ length: questionLength }).map((_, i) => {
                        const isCompleted = i < currentQuestionIndex
                        const isCurrent = i === currentQuestionIndex
                        return (
                            <motion.span
                                key={i}
                                animate={
                                    isCurrent
                                        ? { scale: [1, 1.35, 1], opacity: 1 }
                                        : isCompleted
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 1, opacity: 0.3 }
                                }
                                transition={isCurrent ? { duration: 1.1, repeat: Infinity, repeatType: "loop" } : { duration: 0.25 }}
                                className={`block rounded-full transition-colors duration-300 ${
                                    isCompleted
                                        ? "w-2.5 h-2.5 bg-primary"
                                        : isCurrent
                                            ? "w-3 h-3 bg-primary ring-2 ring-primary/30"
                                            : "w-2 h-2 bg-muted-foreground/30"
                                }`}
                            />
                        )
                    })}
                </div>
            ) : (
                <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex) / questionLength) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground shrink-0 tabular-nums">
                        {currentQuestionIndex + 1}/{questionLength}
                    </span>
                </div>
            )}

            {/* Score badge */}
            <div className="relative shrink-0">
                <motion.div
                    animate={answerState === "correct" ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.35 }}
                    className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold
                        border transition-colors duration-300
                        ${answerState === "correct"
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                            : answerState === "wrong"
                                ? "bg-red-500/10 border-red-500/30 text-red-500 dark:text-red-400"
                                : "bg-muted/50 border-border/40 text-foreground"
                        }
                    `}
                >
                    <span className="text-xs opacity-60">Score</span>
                    <span className="tabular-nums">{displayScore}</span>
                </motion.div>

                {/* Animated delta */}
                <AnimatePresence>
                    {scoreDelta !== null && scoreDelta > 0 && (
                        <motion.span
                            key="delta"
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 0, y: -28 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.85, ease: "easeOut" }}
                            className="pointer-events-none absolute -top-1 -right-1 text-emerald-500 font-extrabold text-xs select-none"
                        >
                            +{scoreDelta}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
