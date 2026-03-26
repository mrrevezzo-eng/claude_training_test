export interface Answer {
  label: string
  points: number
}

export interface QuizQuestion {
  id: number
  category: string
  text: string
  answers: Answer[]
}

export type ScoreTier = 'inbox-ready' | 'at-risk' | 'crisis' | 'critical'

export interface ScoreResult {
  rawPoints: number
  healthScore: number
  tier: ScoreTier
  tierLabel: string
  tierEmoji: string
  copy: string
  ctaText: string
}

export interface LeadData {
  firstName: string
  email: string
  sendVolume?: string
}

export interface QuizSubmission {
  lead: LeadData
  result: ScoreResult
  answers: number[]
}
