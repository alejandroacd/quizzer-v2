"use client"
import { Option, Question } from "@/types"
import { AnswerState } from "@/hooks/useQuiz"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { Check, X } from "lucide-react"

interface QuestionOptionsProps {
    currentQuestion: Question
    questionRevealed: boolean
    selectedOption: string | null
    handleOptionSelect: (optionId: string) => void
    getOptionStyle: (option: Option) => string
    answerState: AnswerState
    correctOptionId: string | null
}

const LABELS = ["A", "B", "C", "D"]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
}

function OptionCard({
    option,
    index,
    selectedOption,
    handleOptionSelect,
    styleKey,
    answerState
}: {
    option: Option
    index: number
    selectedOption: string | null
    handleOptionSelect: (id: string) => void
    styleKey: string
    answerState: AnswerState
    correctOptionId: string | null
}) {
    const controls = useAnimation()
    const isSelected = selectedOption === option.id
    const isCorrect = option.correct
    const isWrongSelected = isSelected && !isCorrect
    const isCorrectReveal = styleKey === "correct-reveal"
    const isDimmed = styleKey === "dimmed"
    const isCorrectSelected = isSelected && isCorrect
    const showPlusOne = isCorrectSelected && answerState === "correct"

    // Shake animation for wrong answer
    useEffect(() => {
        if (isWrongSelected) {
            controls.start({
                x: [0, -10, 10, -7, 7, -4, 4, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
            })
        }
    }, [isWrongSelected, controls])

    const borderColor = isCorrectSelected
        ? "border-emerald-500/80 dark:border-emerald-400/80"
        : isWrongSelected
            ? "border-red-500/80 dark:border-red-400/80"
            : isCorrectReveal
                ? "border-emerald-500/60 dark:border-emerald-400/60"
                : "border-white/20 dark:border-white/10 hover:border-primary/40"

    const bgColor = isCorrectSelected
        ? "bg-emerald-500/15 dark:bg-emerald-400/10"
        : isWrongSelected
            ? "bg-red-500/15 dark:bg-red-400/10"
            : isCorrectReveal
                ? "bg-emerald-500/10 dark:bg-emerald-400/8"
                : isDimmed
                    ? "bg-white/20 dark:bg-white/3"
                    : "bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10"

    const glowShadow = isCorrectSelected
        ? "0 0 20px rgba(16,185,129,0.35), 0 2px 8px rgba(0,0,0,0.08)"
        : isWrongSelected
            ? "0 0 20px rgba(239,68,68,0.35), 0 2px 8px rgba(0,0,0,0.08)"
            : isCorrectReveal
                ? "0 0 14px rgba(16,185,129,0.2)"
                : undefined

    const badgeColor = isCorrectSelected
        ? "bg-emerald-500 text-white border-emerald-500"
        : isWrongSelected
            ? "bg-red-500 text-white border-red-500"
            : isCorrectReveal
                ? "bg-emerald-500/80 text-white border-emerald-500/80"
                : "bg-muted/60 text-muted-foreground border-border/50"

    return (
        <motion.div
            variants={itemVariants}
            className="relative"
        >
            <motion.button
                animate={controls}
                whileHover={!selectedOption ? { y: -2, scale: 1.01 } : {}}
                whileTap={!selectedOption ? { scale: 0.98 } : {}}
                onClick={() => handleOptionSelect(option.id)}
                disabled={!!selectedOption}
                style={{ boxShadow: glowShadow }}
                className={`
                    w-full p-4 text-left rounded-2xl border-2 backdrop-blur-sm
                    transition-colors duration-300
                    flex items-center gap-3
                    ${borderColor} ${bgColor}
                    ${isDimmed ? "opacity-40 scale-[0.98]" : "opacity-100"}
                    ${!selectedOption ? "cursor-pointer" : "cursor-default"}
                `}
            >
                {/* Letter badge */}
                <span className={`
                    shrink-0 w-8 h-8 rounded-xl border text-xs font-bold
                    flex items-center justify-center transition-colors duration-300
                    ${badgeColor}
                `}>
                    {isCorrectSelected ? <Check className="w-4 h-4" /> : isWrongSelected ? <X className="w-4 h-4" /> : LABELS[index]}
                </span>

                <span className="font-semibold text-base leading-snug tracking-tight">
                    {option.text}
                </span>

                {/* Correct reveal icon */}
                {isCorrectReveal && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto shrink-0 text-emerald-500"
                    >
                        <Check className="w-5 h-5" />
                    </motion.span>
                )}
            </motion.button>

            {/* Floating +1 badge */}
            <AnimatePresence>
                {showPlusOne && (
                    <motion.span
                        key="plus1"
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -52, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 font-extrabold text-xl select-none z-10"
                    >
                        +1
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export const QuestionOptions = ({
    currentQuestion,
    questionRevealed,
    selectedOption,
    handleOptionSelect,
    getOptionStyle,
    answerState,
    correctOptionId,
}: QuestionOptionsProps) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={questionRevealed ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8"
        >
            {currentQuestion.options.map((option: Option, index: number) => (
                <OptionCard
                    key={option.id}
                    option={option}
                    index={index}
                    selectedOption={selectedOption}
                    handleOptionSelect={handleOptionSelect}
                    styleKey={getOptionStyle(option)}
                    answerState={answerState}
                    correctOptionId={correctOptionId}
                />
            ))}
        </motion.div>
    )
}
