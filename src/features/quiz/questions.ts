import type { QuizQuestion } from '@/types/quiz'

export const questions: QuizQuestion[] = [
  // CATEGORY 1: Domain & DNS Setup
  {
    id: 1,
    category: 'Domain & DNS Setup',
    text: 'Have you authenticated your sending domain with SPF, DKIM, and DMARC?',
    answers: [
      { label: 'Yes — all three are set up and verified', points: 0 },
      { label: "I think so, but I've never actually checked", points: 2 },
      { label: 'I only have one or two of them set up', points: 2 },
      { label: 'I have no idea what those are', points: 3 },
    ],
  },
  {
    id: 2,
    category: 'Domain & DNS Setup',
    text: 'How long has your sending domain been active?',
    answers: [
      { label: 'More than 2 years', points: 0 },
      { label: '6 months to 2 years', points: 1 },
      { label: 'Less than 6 months', points: 2 },
      { label: "It's brand new — less than 30 days", points: 3 },
    ],
  },
  {
    id: 3,
    category: 'Domain & DNS Setup',
    text: 'Do you use a separate subdomain for marketing emails (e.g., mail.yourdomain.com)?',
    answers: [
      { label: 'Yes — marketing and transactional emails are on separate domains/subdomains', points: 0 },
      { label: 'No — everything goes from the same root domain', points: 2 },
      { label: "I don't send transactional emails, so it doesn't apply", points: 1 },
      { label: "I don't know what this means", points: 2 },
    ],
  },

  // CATEGORY 2: List Health & Hygiene
  {
    id: 4,
    category: 'List Health & Hygiene',
    text: 'How often do you clean your email list (remove invalid or unengaged contacts)?',
    answers: [
      { label: 'Every 30–60 days', points: 0 },
      { label: 'Every 3–6 months', points: 1 },
      { label: 'Once a year or less', points: 2 },
      { label: 'Never — I keep everyone on the list', points: 3 },
    ],
  },
  {
    id: 5,
    category: 'List Health & Hygiene',
    text: 'What is your average bounce rate per campaign?',
    answers: [
      { label: 'Under 0.5%', points: 0 },
      { label: '0.5% – 1%', points: 1 },
      { label: '1% – 3%', points: 2 },
      { label: "Over 3% — or I don't track it", points: 3 },
    ],
  },
  {
    id: 6,
    category: 'List Health & Hygiene',
    text: 'How do new subscribers join your list?',
    answers: [
      { label: 'Double opt-in only', points: 0 },
      { label: 'Single opt-in with a clear, explicit consent checkbox', points: 1 },
      { label: 'Single opt-in — they just enter their email', points: 2 },
      { label: 'Purchased list, scraped list, or imported without consent', points: 3 },
    ],
  },

  // CATEGORY 3: Sending Behavior & Volume
  {
    id: 7,
    category: 'Sending Behavior & Volume',
    text: 'How consistent is your email sending frequency?',
    answers: [
      { label: 'I send on a consistent schedule every week', points: 0 },
      { label: 'I send regularly but the volume fluctuates a lot', points: 1 },
      { label: 'I send in big bursts — heavy one week, nothing the next', points: 2 },
      { label: 'I only send when I have something to sell', points: 3 },
    ],
  },
  {
    id: 8,
    category: 'Sending Behavior & Volume',
    text: 'Have you ever dramatically increased your send volume in a short period?',
    answers: [
      { label: 'No — my volume grows gradually', points: 0 },
      { label: 'Yes, once — and I warmed up the volume intentionally', points: 1 },
      { label: "Yes — I've blasted large volumes without warming up", points: 3 },
      { label: 'I\'m not sure what "warming up" means in this context', points: 2 },
    ],
  },

  // CATEGORY 4: Engagement & Reputation Signals
  {
    id: 9,
    category: 'Engagement & Reputation Signals',
    text: 'What is your average open rate across your last 10 campaigns?',
    answers: [
      { label: 'Over 30%', points: 0 },
      { label: '15% – 30%', points: 1 },
      { label: '5% – 15%', points: 2 },
      { label: "Under 5% — or I don't track open rates", points: 3 },
    ],
  },
  {
    id: 10,
    category: 'Engagement & Reputation Signals',
    text: 'Have you ever been flagged for spam complaints, or received a warning from your ESP?',
    answers: [
      { label: 'No, never', points: 0 },
      { label: 'Yes, once — and I addressed it', points: 1 },
      { label: "Yes, and I'm not sure I fully resolved it", points: 2 },
      { label: "Yes, multiple times — or I'm currently dealing with one", points: 3 },
    ],
  },

  // CATEGORY 5: Infrastructure & Sending Environment
  {
    id: 11,
    category: 'Infrastructure & Sending Environment',
    text: 'What email service provider (ESP) do you currently use?',
    answers: [
      { label: 'A dedicated platform built for deliverability (e.g., ActiveCampaign, Klaviyo, Postmark)', points: 0 },
      { label: 'A general-purpose platform (e.g., Mailchimp, ConvertKit, AWeber)', points: 1 },
      { label: "I use my CRM's built-in email tool (e.g., HubSpot, GoHighLevel)", points: 2 },
      { label: "I'm not sure — or I've switched ESPs multiple times this year", points: 3 },
    ],
  },
  {
    id: 12,
    category: 'Infrastructure & Sending Environment',
    text: 'Have you audited your email infrastructure in the last 6 months?',
    answers: [
      { label: 'Yes — I regularly review DNS records, blacklists, and sender reputation', points: 0 },
      { label: "I've done it once, but not recently", points: 1 },
      { label: "I've never audited it", points: 3 },
      { label: "I don't know what an email infrastructure audit involves", points: 3 },
    ],
  },
]
