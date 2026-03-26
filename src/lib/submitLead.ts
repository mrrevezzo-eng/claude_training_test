import { supabase } from './supabase'
import type { QuizSubmission } from '@/types/quiz'

export async function submitLeadToSupabase(submission: QuizSubmission): Promise<void> {
  if (!supabase) return // env vars not configured — silently skip

  const { lead, result, answers } = submission

  const { error } = await supabase.from('leads').insert({
    first_name: lead.firstName,
    email: lead.email,
    send_volume: lead.sendVolume ?? null,
    raw_points: result.rawPoints,
    health_score: result.healthScore,
    tier: result.tier,
    tier_label: result.tierLabel,
    answers: answers,
  })

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`)
  }

  // Fire GHL webhook via Supabase Edge Function
  const { error: fnError } = await supabase.functions.invoke('ghl-webhook', {
    body: {
      firstName: lead.firstName,
      email: lead.email,
      sendVolume: lead.sendVolume ?? null,
      healthScore: result.healthScore,
      tierLabel: result.tierLabel,
    },
  })

  if (fnError) {
    // Log but don't throw — lead is already saved in Supabase
    console.error('GHL webhook error:', fnError.message)
  }
}
