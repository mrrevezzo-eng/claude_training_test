import type { QuizQuestion } from '@/types/quiz'

interface QuestionCardProps {
  question: QuizQuestion
  onSelect: (points: number) => void
}

const optionLetters = ['A', 'B', 'C', 'D']

export function QuestionCard({ question, onSelect }: QuestionCardProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-3">
        {question.category}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug mb-8">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onSelect(answer.points)}
            className="group flex items-start gap-4 text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-150 cursor-pointer"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-indigo-500 group-hover:bg-indigo-500 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-white transition-all">
              {optionLetters[i]}
            </span>
            <span className="text-slate-700 group-hover:text-slate-900 text-sm sm:text-base leading-snug pt-0.5 transition-colors">
              {answer.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
