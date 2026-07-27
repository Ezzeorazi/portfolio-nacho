import { NextRequest, NextResponse } from 'next/server'

// Captura de email a cambio de la checklist de la guía de bodas.
// Suma el contacto a la audiencia de Resend (si RESEND_AUDIENCE_ID está
// configurada) y le manda la checklist por mail. Sin RESEND_API_KEY solo
// loguea, igual que /api/contact, para no romper el desarrollo local.

const RATE_LIMIT_MAP = new Map<string, { count: number; ts: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = RATE_LIMIT_MAP.get(ip)
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW) {
    RATE_LIMIT_MAP.set(ip, { count: 1, ts: now })
    return false
  }
  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count++
  return false
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CHECKLIST = {
  es: [
    '¿Tenés fecha disponible y cuánto tiempo la podés reservar sin seña?',
    '¿Qué momentos de la boda cubrís: ceremonia, cóctel, cena, fiesta?',
    '¿Cuántas horas de música incluye el presupuesto y cuánto sale la hora extra?',
    '¿Traés tu propio sonido? ¿Alcanza para la cantidad de invitados?',
    '¿Quién se encarga de la música entre set y set?',
    '¿Puedo elegir las canciones de los momentos clave?',
    '¿Cuántas canciones fuera de tu repertorio podés aprender?',
    '¿Qué pasa si llueve o hay que mover la ceremonia?',
    '¿Cuánto tiempo antes llegás a armar y probar sonido?',
    '¿Necesitás toma de corriente, techo, o algo del venue?',
    '¿Qué incluye el viaje si la boda es fuera de tu ciudad?',
    '¿Cómo es la seña, el saldo y la política de cancelación?',
  ],
  en: [
    'Is my date available, and how long can you hold it without a deposit?',
    'Which parts of the wedding do you cover: ceremony, cocktail, dinner, party?',
    'How many hours of music does the quote include, and what does an extra hour cost?',
    'Do you bring your own sound system? Is it enough for my guest count?',
    'Who handles the music between sets?',
    'Can I choose the songs for the key moments?',
    'How many songs outside your repertoire can you learn?',
    'What happens if it rains or the ceremony has to move?',
    'How early do you arrive to set up and sound check?',
    'Do you need power, cover, or anything from the venue?',
    'What does travel include if the wedding is outside your city?',
    'How do the deposit, balance and cancellation policy work?',
  ],
}

const COPY = {
  es: {
    subject: 'Tu checklist: 12 preguntas para tu músico de bodas',
    greeting: (name: string) => (name ? `Hola ${name},` : 'Hola,'),
    intro:
      'Acá va la checklist que te prometí. Son las 12 preguntas que conviene hacerle a cualquier músico antes de reservar una fecha — no solo a mí.',
    outro:
      'Si querés que hablemos de la música de tu boda, respondé este mail o escribime por WhatsApp: https://wa.me/525534010899',
    signature: 'Nacho Rodriguez — Música en vivo\nnachorodriguezmusic.com',
  },
  en: {
    subject: 'Your checklist: 12 questions for your wedding musician',
    greeting: (name: string) => (name ? `Hi ${name},` : 'Hi,'),
    intro:
      "Here's the checklist I promised. These are the 12 questions worth asking any musician before booking a date — not just me.",
    outro:
      'If you want to talk about the music for your wedding, just reply to this email or message me on WhatsApp: https://wa.me/525534010899',
    signature: 'Nacho Rodriguez — Live Music\nnachorodriguezmusic.com',
  },
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (body._honey) return NextResponse.json({ ok: true }) // bots

  const email = (body.email ?? '').trim()
  const name = (body.name ?? '').trim()
  const locale = body.locale === 'en' ? 'en' : 'es'

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const copy = COPY[locale]
  const text = [
    copy.greeting(name),
    '',
    copy.intro,
    '',
    ...CHECKLIST[locale].map((q, i) => `${i + 1}. ${q}`),
    '',
    copy.outro,
    '',
    copy.signature,
  ].join('\n')

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log('📥 Nueva suscripción (dev):', { email, name, locale })
    return NextResponse.json({ ok: true })
  }

  // La suscripción a la audiencia es best-effort: si falla, igual mandamos la
  // checklist para no dejar al usuario sin lo que pidió.
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name: name, unsubscribed: false }),
      })
      if (!res.ok) console.error('Resend audience error:', await res.text())
    } catch (err) {
      console.error('Resend audience error:', err)
    }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nacho Rodriguez <web@nachorodriguezmusic.com>',
        to: email,
        reply_to: 'nachorodriguez.fora@gmail.com',
        subject: copy.subject,
        text,
      }),
    })
    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
    }
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
