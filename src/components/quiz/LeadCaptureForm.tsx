import { useState } from 'react'
import type { LeadData } from '@/types/quiz'

interface LeadCaptureFormProps {
  onSubmit: (lead: LeadData) => void
  isSubmitting?: boolean
}

const volumeOptions = ['<10k', '10k–100k', '100k–500k', '500k+']

export function LeadCaptureForm({ onSubmit, isSubmitting }: LeadCaptureFormProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [sendVolume, setSendVolume] = useState('')
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!firstName.trim()) e.firstName = 'First name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    return e
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    onSubmit({ firstName: firstName.trim(), email: email.trim(), sendVolume: sendVolume || undefined })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        Where should we send your Deliverability Report?
      </h2>
      <p className="text-slate-500 text-sm mb-8">
        Your results + a personalized breakdown are on the next page.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={e => { setFirstName(e.target.value); setErrors(v => ({ ...v, firstName: undefined })) }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Jane"
          />
          {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
            Business Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: undefined })) }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="jane@company.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Send Volume (optional) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="sendVolume">
            Monthly email send volume <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            id="sendVolume"
            value={sendVolume}
            onChange={e => setSendVolume(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
          >
            <option value="">Select range...</option>
            {volumeOptions.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-base"
        >
          {isSubmitting ? 'Loading...' : 'See My Results →'}
        </button>

        <p className="text-center text-xs text-slate-400">
          No spam. Your info is used only to send your report.
        </p>
      </form>
    </div>
  )
}
