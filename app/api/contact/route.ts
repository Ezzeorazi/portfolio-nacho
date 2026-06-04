import { NextRequest, NextResponse } from 'next/server'

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

  // Honeypot check
  if (body._honey) {
    return NextResponse.json({ ok: true }) // Silently ignore bots
  }

  const { name, email, phone, eventType, city, date, format, message } = body
  if (!name || !email || !eventType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Build email text
  const text = `
Nueva consulta desde nachorodriguezmusic.com

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || '—'}
Tipo de evento: ${eventType}
Ciudad/Venue: ${city || '—'}
Fecha: ${date || '—'}
Formato: ${format || '—'}

Mensaje:
${message || '—'}
  `.trim()

  // If Resend is configured, send the email
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'web@nachorodriguezmusic.com',
          to: 'nachorodriguez.fora@gmail.com',
          reply_to: email,
          subject: `Nueva consulta de ${name} — ${eventType}`,
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
  } else {
    // Development: log to console
    console.log('📧 Contact form submission:\n', text)
  }

  return NextResponse.json({ ok: true })
}
