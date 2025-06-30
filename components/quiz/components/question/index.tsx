import { Question } from "@/types"
interface QuestionTextProps {
    currentQuestion: Question
    questionRevealed: boolean
}
export const QuestionText = ({ currentQuestion,
    questionRevealed
}: QuestionTextProps) => {

    return <div className="mb-8">
        <h2 className="text-2xl scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance  font-bold mb-6 min-h-[4rem] flex flex-wrap gap-1">
            {currentQuestion.question.split(" ").map((word, index) => (
                <span
                    key={index}
                    className={`transition-all scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance duration-300 ease-out ${questionRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                    style={{
                        transitionDelay: questionRevealed ? `${index * 80}ms` : "0ms",
                    }}
                >
                    {word}
                </span>
            ))}
        </h2>
    </div>
}