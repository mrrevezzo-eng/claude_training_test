import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GHL_WEBHOOK_URL = Deno.env.get('GHL_WEBHOOK_URL')

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  if (!GHL_WEBHOOK_URL) {
    console.warn('GHL_WEBHOOK_URL not set — skipping webhook')
    return new Response(JSON.stringify({ skipped: true }), { status: 200 })
  }

  const { firstName, email, sendVolume, healthScore, tierLabel } = await req.json()

  const res = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: firstName,
      email,
      send_volume: sendVolume ?? '',
      health_score: healthScore,
      tier_label: tierLabel,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    return new Response(JSON.stringify({ error: body }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
})
