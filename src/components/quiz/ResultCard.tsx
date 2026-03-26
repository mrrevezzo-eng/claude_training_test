import type { ScoreResult, LeadData } from '@/types/quiz'

interface ResultCardProps {
  result: ScoreResult
  lead: LeadData
  onRestart: () => void
  calUrl: string
}

const tierStyles: Record<string, { bar: string; badge: string; scoreText: string }> = {
  'inbox-ready': {
    bar: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    scoreText: 'text-green-600',
  },
  'at-risk': {
    bar: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-800',
    scoreText: 'text-amber-600',
  },
  crisis: {
    bar: 'bg-red-500',
    badge: 'bg-red-100 text-red-700',
    scoreText: 'text-red-600',
  },
  critical: {
    bar: 'bg-red-700',
    badge: 'bg-red-200 text-red-900',
    scoreText: 'text-red-700',
  },
}

export function ResultCard({ result, lead, onRestart, calUrl }: ResultCardProps) {
  const styles = tierStyles[result.tier]

  return (
    <div>
      <p className="text-sm text-slate-500 mb-1">Hi {lead.firstName}, here are your results:</p>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Email Deliverability Diagnosis</h2>

      {/* Score display */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-0.5">Deliverability Health Score</p>
            <p className={`text-5xl font-extrabold ${styles.scoreText}`}>
              {result.healthScore}
              <span className="text-2xl font-semibold text-slate-400">/100</span>
            </p>
          </div>
          <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${styles.badge}`}>
            {result.tierEmoji} {result.tierLabel}
          </span>
        </div>

        {/* Score bar */}
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${styles.bar}`}
            style={{ width: `${result.healthScore}%` }}
          />
        </div>
      </div>

      {/* Diagnosis copy */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-slate-800 mb-2">What this means</h3>
        <p className="text-slate-600 leading-relaxed">{result.copy}</p>
      </div>

      {/* CTA */}
      <a
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-base mb-4"
      >
        {result.ctaText}
      </a>

      <button
        onClick={onRestart}
        className="block w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors py-2"
      >
        Retake the quiz
      </button>
    </div>
  )
}
