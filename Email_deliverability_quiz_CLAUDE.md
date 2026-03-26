# CLAUDE.md — Application Project Configuration

---

## Project: The Email Deliverability Diagnosis Quiz
An interactive lead magnet quiz that helps email marketers identify why their emails are landing in spam — and routes qualified leads to book a deliverability strategy call with Jesus.

---

## Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Edge Functions for lead capture + email trigger)
- **Database**: Supabase Postgres (stores quiz results + lead data)
- **Auth**: None required (public-facing quiz, no login)
- **Deployment**: Vercel
- **AI**: None (static scoring logic — no AI API needed for MVP)
- **Email**: Resend (transactional — sends result report to lead after quiz)

---

## Key Commands
```bash
npm run dev       # Dev server (port 5173)
npm run build     # Production build
npm run test      # Run tests
npm run lint      # Lint check
npx supabase gen types typescript --local > src/types/database.ts  # Regen DB types
```

---

## File Structure
```
src/
├── components/
│   ├── quiz/
│   │   ├── QuizShell.tsx         — Outer wrapper, progress bar, step counter
│   │   ├── QuestionCard.tsx      — Single question + answer options
│   │   ├── ResultCard.tsx        — Score display + diagnosis label
│   │   └── LeadCaptureForm.tsx   — Name / email gate before results
│   ├── ui/                       — shadcn/ui primitives (Button, Card, etc.)
│   └── layout/
│       └── PageWrapper.tsx       — Full-page centering + background
├── features/
│   └── quiz/
│       ├── questions.ts          — All question data + answer weights
│       ├── scoring.ts            — Score calculator + tier mapper
│       └── useQuizState.ts       — Custom hook managing quiz flow state
├── lib/
│   ├── supabase.ts               — Supabase client init
│   └── submitLead.ts             — Sends lead + score to Supabase + Resend
├── pages/
│   ├── index.tsx                 — Landing/intro screen
│   ├── quiz.tsx                  — Quiz flow route
│   └── results.tsx               — Results page (gated by lead capture)
├── types/
│   └── quiz.ts                   — QuizQuestion, Answer, ScoreResult types
└── styles/
    └── globals.css               — Tailwind base + custom CSS vars
supabase/
├── migrations/
│   └── 001_create_leads_table.sql
└── functions/
    └── send-result-email/        — Edge function: triggers Resend email on submit
```

---

## Architecture Notes
- **Quiz flow**: Intro → 12 Questions (one per screen) → Lead Capture Gate → Results Page
- **Scoring**: Each answer carries a point value (0–3). Points roll up into a 0–100 deliverability health score. Score maps to one of four result tiers (see below).
- **Lead gate**: Lead capture form (first name + email) appears AFTER the last question but BEFORE results are shown. This maximizes completion rate.
- **Data flow**: On form submit → write lead + raw score + tier to Supabase → trigger Resend edge function → redirect to `/results` with score in URL param or React state
- **No auth required**: Quiz is fully public. Supabase RLS on `leads` table allows insert-only from anon key, no reads.
- **Resend email**: Sends a branded PDF-style HTML email with their score, tier label, top 3 risk findings, and a CTA button to book a call.

---

## Quiz Content

### Title
**"The Email Deliverability Diagnosis"**
*Find out why your emails are going to spam — and what to do about it.*

### Intro Copy (Landing Screen)
> Most businesses losing 30–60% of their email revenue don't have a content problem.
> They have a deliverability problem. This 3-minute quiz will tell you exactly where yours stands.

CTA Button: **"Diagnose My Deliverability →"**

---

### Question Bank (12 Questions)

Questions are grouped into 5 risk categories. Each answer is weighted 0–3 (0 = healthy, 3 = high risk).

---

#### CATEGORY 1: Domain & DNS Setup (Technical Foundation)

**Q1. Have you authenticated your sending domain with SPF, DKIM, and DMARC?**
- A) Yes — all three are set up and verified (0)
- B) I think so, but I've never actually checked (2)
- C) I only have one or two of them set up (2)
- D) I have no idea what those are (3)

**Q2. How long has your sending domain been active?**
- A) More than 2 years (0)
- B) 6 months to 2 years (1)
- C) Less than 6 months (2)
- D) It's brand new — less than 30 days (3)

**Q3. Do you use a separate subdomain for marketing emails (e.g., mail.yourdomain.com)?**
- A) Yes — marketing and transactional emails are on separate domains/subdomains (0)
- B) No — everything goes from the same root domain (2)
- C) I don't send transactional emails, so it doesn't apply (1)
- D) I don't know what this means (2)

---

#### CATEGORY 2: List Health & Hygiene

**Q4. How often do you clean your email list (remove invalid or unengaged contacts)?**
- A) Every 30–60 days (0)
- B) Every 3–6 months (1)
- C) Once a year or less (2)
- D) Never — I keep everyone on the list (3)

**Q5. What is your average bounce rate per campaign?**
- A) Under 0.5% (0)
- B) 0.5% – 1% (1)
- C) 1% – 3% (2)
- D) Over 3% — or I don't track it (3)

**Q6. How do new subscribers join your list?**
- A) Double opt-in only (0)
- B) Single opt-in with a clear, explicit consent checkbox (1)
- C) Single opt-in — they just enter their email (2)
- D) Purchased list, scraped list, or imported without consent (3)

---

#### CATEGORY 3: Sending Behavior & Volume

**Q7. How consistent is your email sending frequency?**
- A) I send on a consistent schedule every week (0)
- B) I send regularly but the volume fluctuates a lot (1)
- C) I send in big bursts — heavy one week, nothing the next (2)
- D) I only send when I have something to sell (3)

**Q8. Have you ever dramatically increased your send volume in a short period?**
- A) No — my volume grows gradually (0)
- B) Yes, once — and I warmed up the volume intentionally (1)
- C) Yes — I've blasted large volumes without warming up (3)
- D) I'm not sure what "warming up" means in this context (2)

---

#### CATEGORY 4: Engagement & Reputation Signals

**Q9. What is your average open rate across your last 10 campaigns?**
- A) Over 30% (0)
- B) 15% – 30% (1)
- C) 5% – 15% (2)
- D) Under 5% — or I don't track open rates (3)

**Q10. Have you ever been flagged for spam complaints, or received a warning from your ESP?**
- A) No, never (0)
- B) Yes, once — and I addressed it (1)
- C) Yes, and I'm not sure I fully resolved it (2)
- D) Yes, multiple times — or I'm currently dealing with one (3)

---

#### CATEGORY 5: Infrastructure & Sending Environment

**Q11. What email service provider (ESP) do you currently use?**
- A) A dedicated platform built for deliverability (e.g., ActiveCampaign, Klaviyo, Postmark) (0)
- B) A general-purpose platform (e.g., Mailchimp, ConvertKit, AWeber) (1)
- C) I use my CRM's built-in email tool (e.g., HubSpot, GoHighLevel) (2)
- D) I'm not sure — or I've switched ESPs multiple times this year (3)

**Q12. Have you audited your email infrastructure in the last 6 months?**
- A) Yes — I regularly review DNS records, blacklists, and sender reputation (0)
- B) I've done it once, but not recently (1)
- C) I've never audited it (3)
- D) I don't know what an email infrastructure audit involves (3)

---

### Scoring Logic

```
Total possible points: 36 (12 questions × max 3 pts each)
Health Score = ((36 - raw_points) / 36) × 100
```

| Health Score | Tier Label | Meaning |
|---|---|---|
| 80–100 | ✅ Inbox Ready | Solid foundation — minor optimizations available |
| 55–79 | ⚠️ At Risk | Real vulnerabilities present — revenue is leaking |
| 30–54 | 🔴 Deliverability Crisis | Significant issues across multiple categories |
| 0–29 | 🚨 Critical Failure | High probability of blacklisting or ESP suspension |

---

### Result Page Copy (Per Tier)

**Tier: Inbox Ready (80–100)**
> Your setup is stronger than most — but "not broken" isn't the same as "optimized." Even at this level, we typically find 10–20% more inbox placement on the table. If you're sending serious volume, that gap compounds fast.
> [Book a Free Deliverability Review →]

**Tier: At Risk (55–79)**
> You have real vulnerabilities in your setup. Based on your answers, your emails are likely being filtered or throttled — even if your ESP dashboard isn't showing it clearly. This is the stage where most senders lose 20–40% of their revenue silently.
> [Book Your Deliverability Strategy Call →]

**Tier: Deliverability Crisis (30–54)**
> Your infrastructure has significant issues across multiple categories. Without intervention, this typically worsens over time — not better. The good news: these problems are fixable, usually within 6–8 weeks with the right technical approach.
> [Book Your Emergency Deliverability Call →]

**Tier: Critical Failure (0–29)**
> You're either already on a blacklist, at high risk of getting there, or your emails are being silently rejected at the server level. This needs immediate attention. We've resolved situations like this before — but the window to act is short.
> [Book an Urgent Deliverability Audit →]

---

### Lead Capture Form (Appears Before Results)
Fields:
- First Name
- Business Email
- *(Optional: Monthly email send volume — dropdown: <10k / 10k–100k / 100k–500k / 500k+)*

Headline: **"Where should we send your Deliverability Report?"**
Subtext: *Your results + a personalized breakdown are on the next page.*

---

## Environment Variables
- All vars live in `.env` (never committed — listed in `.gitignore`)
- See `.env.example` for required variable names

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CAL_BOOKING_URL=
```

---

## Project Security
- **NEVER** hardcode Supabase URLs, anon keys, or Resend API keys in source code
- All credentials via `import.meta.env` (Vite frontend) or environment secrets (Supabase Edge Functions)
- Supabase RLS: `leads` table is insert-only from anon key — no public reads
- No sensitive user data beyond name + email is stored

---

## Brand / Design Rules
- **Primary color**: #0F172A (near-black — authority, technical trust)
- **Accent**: #6366F1 (indigo — modern, professional)
- **Success**: #22C55E (green — for healthy score results)
- **Warning**: #F59E0B (amber — for at-risk results)
- **Danger**: #EF4444 (red — for crisis/critical results)
- **Font**: Inter (clean, readable, professional)
- **Design system**: shadcn/ui — never raw HTML inputs or buttons
- **Cards**: White background, medium border-radius (rounded-2xl), soft shadow (shadow-md), no harsh borders
- **Progress bar**: Indigo accent, smooth animated fill as user advances through questions
- **Mobile-first**: Quiz must be fully usable on mobile — single question per screen, large tap targets

---

## Current Status
- **Built**: Nothing yet — starting from scratch
- **In Progress**: This CLAUDE.md is the spec — ready to scaffold
- **Known Bugs**: N/A
- **Next Up**:
  1. Scaffold Vite + React + Tailwind + shadcn/ui
  2. Build `questions.ts` and `scoring.ts`
  3. Build `useQuizState.ts` hook
  4. Build QuizShell → QuestionCard → LeadCaptureForm → ResultCard flow
  5. Wire Supabase lead insert
  6. Wire Resend email trigger
  7. Deploy to Vercel

---

## Error Handling Protocol
If something fails in this project:
1. Read the full error — don't skip the stack trace
2. Check if the issue is in the frontend, Supabase, or Resend
3. If it involves a paid API call (Resend, etc.), **ask before retrying**
4. Fix, verify, then document any quirks discovered
5. Run lint + typecheck after every fix before marking done
