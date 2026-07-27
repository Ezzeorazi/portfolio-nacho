'use client'

import { useEffect } from 'react'
import { track, type AnalyticsEvent, type EventParams } from '@/lib/analytics'

/**
 * Escucha los clicks de toda la página desde un único listener y los manda a
 * GA4. Así los Server Components no necesitan volverse client components:
 * alcanza con marcar el link con atributos data-*.
 *
 *   data-loc="hero"     dónde está el link (se usa como parámetro `location`)
 *   data-cta="quote"    marca un CTA interno; dispara cta_click con ese label
 *
 * WhatsApp, Instagram y mailto se detectan solos por el href — solo necesitan
 * data-loc para saber desde dónde se hizo click.
 */
export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const anchor = target?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      const location =
        anchor.closest('[data-loc]')?.getAttribute('data-loc') ?? window.location.pathname

      let event: AnalyticsEvent | null = null
      const params: EventParams = { location }

      if (/wa\.me|api\.whatsapp\.com/.test(href)) {
        event = 'whatsapp_click'
      } else if (href.includes('instagram.com')) {
        event = 'instagram_click'
      } else if (href.startsWith('mailto:')) {
        event = 'email_click'
      } else if (anchor.hasAttribute('data-cta')) {
        event = 'cta_click'
        params.label = anchor.getAttribute('data-cta') ?? undefined
      }

      if (event) track(event, params)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
