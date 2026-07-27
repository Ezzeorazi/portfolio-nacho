'use client'

import { useState, FormEvent } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { track } from '@/lib/analytics'

/**
 * Captura de email para quien todavía no está listo para contratar: deja el
 * mail a cambio de la checklist y queda en la lista para el seguimiento.
 */
export default function LeadMagnetForm({ location }: { location: string }) {
  const t = useTranslations('guide')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [honey, setHoney] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (honey) return
    setStatus('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, locale, _honey: honey }),
      })
      if (res.ok) {
        track('sign_up', { location })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-oro/30 bg-oro/5 p-8 text-center">
        <p className="font-display text-2xl text-oro mb-2">{t('formSuccess')}</p>
        <p className="font-sans text-sm text-arena/70">{t('formSuccessNote')}</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-hueso/5 border border-arena/20 text-hueso font-sans text-sm p-3 focus:border-oro outline-none transition-colors placeholder:text-arena/30'

  return (
    <form onSubmit={handleSubmit} className="border border-oro/25 p-8">
      <div className="w-10 h-px bg-oro mb-5" />
      <h2 className="font-display text-2xl sm:text-3xl text-hueso mb-3">{t('formTitle')}</h2>
      <p className="font-sans text-sm text-arena/70 leading-relaxed mb-6">{t('formText')}</p>

      <input
        type="text"
        name="_honey"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        tabIndex={-1}
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-1.5">
            {t('formName')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder={t('formNamePlaceholder')}
          />
        </div>
        <div>
          <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-1.5">
            {t('formEmail')} *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="email@ejemplo.com"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="font-sans text-sm text-terracota mb-4">{t('formError')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('formSending') : t('formSubmit')}
      </button>

      <p className="font-sans text-[11px] text-arena/40 mt-4">{t('formPrivacy')}</p>
    </form>
  )
}
