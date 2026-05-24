import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { RotateCcw, Trophy, Star, Award, Target, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Confetti from "react-confetti"

interface CardCompletedQuizProps {
    resetQuiz: () => void
    score: number
    questionLength: number
}

export const CardCompletedQuiz = ({
    resetQuiz,
    score,
    questionLength
}: CardCompletedQuizProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const percentage = (score / questionLength) * 100
    const pathname = usePathname()

    useEffect(() => {
        setIsVisible(true)
        // Set screen size for confett
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        // Trigger confetti when perfect score
        if (percentage === 100) {
            setShowConfetti(true)
            // Stop confetti after 5 seconds
            setTimeout(() => setShowConfetti(false), 5000)
        }
    }, [percentage])

    const getScoreMessage = () => {
        if (percentage === 100) {
            return "Perfect score! You're a true sports expert! 🏆"
        } else if (percentage >= 90) {
            return "Outstanding! Your sports knowledge is impressive! ⚡"
        } else if (percentage >= 70) {
            return "Great job! You know your sports well! 👍"
        } else if (percentage >= 50) {
            return "Good effort! With a little more practice, you'll master it! 💪"
        } else {
            return "Keep learning! Every expert was once a beginner. 📚"
        }
    }

    const getScoreIcon = () => {
        if (percentage === 100) {
            return <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
        } else if (percentage >= 80) {
            return <Award className="h-16 w-16 text-purple-500 mb-4" />
        } else if (percentage >= 60) {
            return <Star className="h-16 w-16 text-blue-500 mb-4" />
        } else {
            return <Target className="h-16 w-16  mx-auto text-red-500 mb-4" />
        }
    }

    const handleChallengeClick = () => {
        const currentUrl = window.location.origin + pathname
        const category = pathname.split('/').pop() || 'quiz'
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
        const message = `🎯 Quiz Challenge! 🎯\n\nI just scored ${score}/${questionLength} (${percentage.toFixed(0)}%) on the ${categoryName} Quiz!\n\nThink you can beat my score? 🏆\n\nTake the challenge here: ${currentUrl}\n\nGood luck! 💪`
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="flex items-center justify-center p-4 relative overflow-hidden">
                    {/* 🎉 Confetti appears only for perfect score */}
                    {showConfetti && (
                        <Confetti
                            width={windowSize.width}
                            height={windowSize.height}
                            numberOfPieces={300}
                            recycle={false}
                            gravity={0.25}
                        />
                    )}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-2xl"
                    >
                        <Card className="shadow-xl border-0 overflow-hidden backdrop-blur-sm">
                            <CardContent className="p-8 md:p-12 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="mb-8 mx-auto flex flex-col items-center"
                                >
                                    {getScoreIcon()}
                                    <h1 className="text-2xl font-extrabold tracking-tight text-balance">
                                        Quiz Completed!
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                                        You've finished the quiz
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="mb-10"
                                >
                                    <div className="relative inline-block">
                                        <div className="text-6xl font-bold text-primary mb-2">
                                            {score}/{questionLength}
                                        </div>
                                        <div className="text-sm font-medium text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                            {percentage.toFixed(0)}%
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-6 mx-auto max-w-xs">
                                        <motion.div
                                            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>

                                    <motion.p
                                        className="text-lg text-gray-700 dark:text-gray-300 mt-6 max-w-md mx-auto leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        {getScoreMessage()}
                                    </motion.p>
                                </motion.div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={resetQuiz}
                                        className="flex items-center gap-2 mx-auto px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                                        size="lg"
                                    >
                                        <RotateCcw className="h-5 w-5" />
                                        Try Again
                                    </Button>
                                    <Button
                                        onClick={handleChallengeClick}
                                        variant="ghost"
                                        className="flex items-center gap-2 mx-auto px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                                        size="lg"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        Challenge a friend
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
