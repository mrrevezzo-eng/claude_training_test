import type { ScoreResult, ScoreTier } from '@/types/quiz'

const MAX_POINTS = 36

export function calculateScore(rawPoints: number): ScoreResult {
  const healthScore = Math.round(((MAX_POINTS - rawPoints) / MAX_POINTS) * 100)

  let tier: ScoreTier
  let tierLabel: string
  let tierEmoji: string
  let copy: string
  let ctaText: string

  if (healthScore >= 80) {
    tier = 'inbox-ready'
    tierLabel = 'Inbox Ready'
    tierEmoji = '✅'
    copy =
      'Your setup is stronger than most — but "not broken" isn\'t the same as "optimized." Even at this level, we typically find 10–20% more inbox placement on the table. If you\'re sending serious volume, that gap compounds fast.'
    ctaText = 'Book a Free Deliverability Review →'
  } else if (healthScore >= 55) {
    tier = 'at-risk'
    tierLabel = 'At Risk'
    tierEmoji = '⚠️'
    copy =
      'You have real vulnerabilities in your setup. Based on your answers, your emails are likely being filtered or throttled — even if your ESP dashboard isn\'t showing it clearly. This is the stage where most senders lose 20–40% of their revenue silently.'
    ctaText = 'Book Your Deliverability Strategy Call →'
  } else if (healthScore >= 30) {
    tier = 'crisis'
    tierLabel = 'Deliverability Crisis'
    tierEmoji = '🔴'
    copy =
      'Your infrastructure has significant issues across multiple categories. Without intervention, this typically worsens over time — not better. The good news: these problems are fixable, usually within 6–8 weeks with the right technical approach.'
    ctaText = 'Book Your Emergency Deliverability Call →'
  } else {
    tier = 'critical'
    tierLabel = 'Critical Failure'
    tierEmoji = '🚨'
    copy =
      "You're either already on a blacklist, at high risk of getting there, or your emails are being silently rejected at the server level. This needs immediate attention. We've resolved situations like this before — but the window to act is short."
    ctaText = 'Book an Urgent Deliverability Audit →'
  }

  return { rawPoints, healthScore, tier, tierLabel, tierEmoji, copy, ctaText }
}
