interface QuizShellProps {
  children: React.ReactNode
  progress: number
  stepLabel?: string
  showBack?: boolean
  onBack?: () => void
}

export function QuizShell({ children, progress, stepLabel, showBack, onBack }: QuizShellProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100">
        <div
          className="h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      {(stepLabel || showBack) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          {showBack ? (
            <button
              onClick={onBack}
              className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          {stepLabel && (
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {stepLabel}
            </span>
          )}
          {!showBack && <span />}
        </div>
      )}

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {children}
      </div>
    </div>
  )
}
