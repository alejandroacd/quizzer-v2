import { Option, Question } from "@/types"
interface QuestionOptionsProps {
    currentQuestion: Question
    questionRevealed: boolean
    selectedOption: string | null
    handleOptionSelect: (optionId: string) => void
    getOptionStyle: (option: Option) => string
}
export const QuestionOptions = ({
    currentQuestion,
    questionRevealed,
    selectedOption,
    handleOptionSelect,
    getOptionStyle,
}: QuestionOptionsProps) => {
    return <div className="space-y-4 mb-8">
    {currentQuestion.options.map((option: Option, index: number) => (
        <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={!!selectedOption}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ease-out ${getOptionStyle(option)} ${questionRevealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            style={{
                transitionDelay: questionRevealed ? `${index * 80}ms` : "0ms",
            }}
        >
            <span className="font-medium scroll-m-20 text-xl font-semibold tracking-tight">{option.text}</span>
        </button>
    ))}
</div>
}