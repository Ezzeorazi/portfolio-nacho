'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { track } from '@/lib/analytics'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '',
    city: '', date: '', format: '', message: '',
    _honey: '',
  })

  const update = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formData._honey) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        track('generate_lead', {
          location: 'contact_form',
          event_type: formData.eventType,
          city: formData.city,
          format: formData.format,
        })
      }
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div data-loc="form_success" className="text-center py-16">
        <div className="w-16 h-16 rounded-full border-2 border-oro flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-oro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display text-2xl text-oro mb-6">{t('formSuccess')}</p>

        {/* La espera de la respuesta es el mejor momento para ganar un seguidor */}
        <div className="border-t border-oro/15 pt-6 mt-6 max-w-sm mx-auto">
          <p className="font-sans text-sm text-arena/70 leading-relaxed mb-5">
            {t('formSuccessInstagram')}
          </p>
          <a
            href="https://www.instagram.com/nachorodriguezlive"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            {t('formSuccessInstagramCta')}
          </a>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full bg-hueso/5 border border-arena/20 text-hueso font-sans text-sm p-3 focus:border-oro outline-none transition-colors placeholder:text-arena/30'
  const labelClass = 'block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="_honey"
        value={formData._honey}
        onChange={(e) => update('_honey', e.target.value)}
        className="hidden"
        tabIndex={-1}
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('formName')} *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label className={labelClass}>{t('formEmail')} *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
            placeholder="email@ejemplo.com"
          />
        </div>
        <div>
          <label className={labelClass}>{t('formPhone')}</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
            placeholder="+52 55 1234 5678"
          />
        </div>
        <div>
          <label className={labelClass}>{t('formEventType')} *</label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => update('eventType', e.target.value)}
            className={inputClass}
          >
            <option value="" disabled className="bg-negro">— Seleccionar —</option>
            {(t.raw('formEventTypes') as string[]).map((opt) => (
              <option key={opt} value={opt} className="bg-negro">{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('formDate')}</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => update('date', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Ciudad, formato y mensaje quedan plegados: son datos que se pueden
          repreguntar por WhatsApp y su ausencia no frena el primer contacto. */}
      <details className="group border-t border-arena/15 pt-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-sans text-xs tracking-widest uppercase text-oro">
          <span className="transition-transform group-open:rotate-45">+</span>
          {t('formDetailsToggle')}
        </summary>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5">
          <div>
            <label className={labelClass}>{t('formCity')}</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => update('city', e.target.value)}
              className={inputClass}
              placeholder="Tulum, Playa del Carmen..."
            />
          </div>
          <div>
            <label className={labelClass}>{t('formFormat')}</label>
            <select
              value={formData.format}
              onChange={(e) => update('format', e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-negro">— {t('formFormat')} —</option>
              {(t.raw('formFormats') as string[]).map((opt) => (
                <option key={opt} value={opt} className="bg-negro">{opt}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{t('formMessage')}</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => update('message', e.target.value)}
              className={inputClass}
              placeholder="Contame sobre tu evento..."
            />
          </div>
        </div>
      </details>

      {status === 'error' && (
        <p className="font-sans text-sm text-terracota">{t('formError')}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t('formSending') : t('formSubmit')}
        </button>
        <a
          href={`https://wa.me/525534010899?text=${encodeURIComponent(t('whatsappText'))}`}
          target="_blank"
          rel="noopener noreferrer"
          data-loc="contact_form"
          className="btn-outline"
        >
          {t('whatsappButton')}
        </a>
      </div>
    </form>
  )
}
