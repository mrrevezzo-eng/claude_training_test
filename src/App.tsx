import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { QuizShell } from '@/components/quiz/QuizShell'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { LeadCaptureForm } from '@/components/quiz/LeadCaptureForm'
import { ResultCard } from '@/components/quiz/ResultCard'
import { useQuizState } from '@/features/quiz/useQuizState'
import { submitLeadToSupabase } from '@/lib/submitLead'
import type { LeadData } from '@/types/quiz'

const CAL_URL = import.meta.env.VITE_CAL_BOOKING_URL ?? '#'

export default function App() {
  const quiz = useQuizState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLeadSubmit(lead: LeadData) {
    setIsSubmitting(true)
    try {
      if (quiz.result) {
        await submitLeadToSupabase({ lead, result: quiz.result, answers: quiz.selectedAnswers })
      }
    } catch (err) {
      console.error('Lead submission failed:', err)
      // Non-blocking — still show results
    } finally {
      setIsSubmitting(false)
      quiz.submitLead(lead)
    }
  }

  // --- INTRO ---
  if (quiz.step === 'intro') {
    return (
      <PageWrapper>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Free Diagnostic Tool
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            The Email Deliverability<br />Diagnosis
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Find out why your emails are going to spam — and what to do about it.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md px-8 py-10">
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
            Most businesses losing 30–60% of their email revenue don't have a content problem.
            They have a deliverability problem. This 3-minute quiz will tell you exactly where yours stands.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-400 mb-8">
            <span className="flex items-center gap-1.5">
              <span className="text-indigo-500">✓</span> 12 questions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-indigo-500">✓</span> ~3 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-indigo-500">✓</span> Instant score
            </span>
          </div>

          <button
            onClick={quiz.startQuiz}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-base"
          >
            Diagnose My Deliverability →
          </button>
        </div>
      </PageWrapper>
    )
  }

  // --- QUESTION ---
  if (quiz.step === 'question') {
    const stepLabel = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.totalQuestions}`
    return (
      <PageWrapper>
        <QuizShell
          progress={quiz.progress}
          stepLabel={stepLabel}
          showBack
          onBack={quiz.goBack}
        >
          <QuestionCard
            question={quiz.currentQuestion}
            onSelect={quiz.selectAnswer}
          />
        </QuizShell>
      </PageWrapper>
    )
  }

  // --- LEAD CAPTURE ---
  if (quiz.step === 'lead-capture') {
    return (
      <PageWrapper>
        <QuizShell
          progress={quiz.progress}
          showBack
          onBack={quiz.goBack}
        >
          <LeadCaptureForm onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} />
        </QuizShell>
      </PageWrapper>
    )
  }

  // --- RESULTS ---
  if (quiz.step === 'results' && quiz.result && quiz.lead) {
    return (
      <PageWrapper>
        <QuizShell progress={100}>
          <ResultCard
            result={quiz.result}
            lead={quiz.lead}
            onRestart={quiz.restart}
            calUrl={CAL_URL}
          />
        </QuizShell>
      </PageWrapper>
    )
  }

  return null
}
