import { useState } from 'react'
import { questions } from './questions'
import { calculateScore } from './scoring'
import type { ScoreResult, LeadData } from '@/types/quiz'

export type QuizStep = 'intro' | 'question' | 'lead-capture' | 'results'

interface QuizState {
  step: QuizStep
  currentQuestionIndex: number
  selectedAnswers: number[]
  result: ScoreResult | null
  lead: LeadData | null
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    step: 'intro',
    currentQuestionIndex: 0,
    selectedAnswers: [],
    result: null,
    lead: null,
  })

  const totalQuestions = questions.length
  const currentQuestion = questions[state.currentQuestionIndex]
  const progress = state.step === 'intro'
    ? 0
    : state.step === 'lead-capture' || state.step === 'results'
    ? 100
    : Math.round((state.currentQuestionIndex / totalQuestions) * 100)

  function startQuiz() {
    setState(s => ({ ...s, step: 'question', currentQuestionIndex: 0 }))
  }

  function selectAnswer(points: number) {
    const newAnswers = [...state.selectedAnswers, points]

    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState(s => ({
        ...s,
        selectedAnswers: newAnswers,
        currentQuestionIndex: s.currentQuestionIndex + 1,
      }))
    } else {
      // Last question — move to lead capture
      const rawPoints = newAnswers.reduce((sum, p) => sum + p, 0)
      const result = calculateScore(rawPoints)
      setState(s => ({
        ...s,
        selectedAnswers: newAnswers,
        result,
        step: 'lead-capture',
      }))
    }
  }

  function goBack() {
    if (state.step === 'lead-capture') {
      setState(s => ({ ...s, step: 'question', currentQuestionIndex: totalQuestions - 1 }))
      return
    }
    if (state.currentQuestionIndex > 0) {
      setState(s => ({
        ...s,
        currentQuestionIndex: s.currentQuestionIndex - 1,
        selectedAnswers: s.selectedAnswers.slice(0, -1),
      }))
    } else {
      setState(s => ({ ...s, step: 'intro' }))
    }
  }

  function submitLead(lead: LeadData) {
    setState(s => ({ ...s, lead, step: 'results' }))
  }

  function restart() {
    setState({
      step: 'intro',
      currentQuestionIndex: 0,
      selectedAnswers: [],
      result: null,
      lead: null,
    })
  }

  return {
    step: state.step,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions,
    progress,
    result: state.result,
    lead: state.lead,
    selectedAnswers: state.selectedAnswers,
    startQuiz,
    selectAnswer,
    goBack,
    submitLead,
    restart,
  }
}
