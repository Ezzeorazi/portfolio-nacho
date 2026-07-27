// Eventos de conversión que se envían a GA4 (G-50BJRHQ23R).
//
// generate_lead y whatsapp_click son las dos conversiones que definen la meta
// de "contactos reales". Hay que marcarlas como conversión (key event) a mano
// en GA4 → Administrar → Eventos, si no quedan como eventos comunes.

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

export type AnalyticsEvent =
  | 'generate_lead' // formulario de contacto enviado con éxito
  | 'whatsapp_click' // click en cualquier link de wa.me
  | 'instagram_click' // click hacia el perfil de Instagram
  | 'email_click' // click en un mailto
  | 'cta_click' // CTA interno (cotizar, ver repertorio, etc.)
  | 'sign_up' // email dejado a cambio de la guía de bodas


/** Dónde estaba el usuario cuando hizo click. Se lee del atributo data-loc. */
export type EventParams = {
  location?: string
  label?: string
  [key: string]: unknown
}

export function track(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === 'undefined') return

  // Descarta claves vacías para no ensuciar los reportes de GA4.
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  )

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, clean)
    return
  }

  // El script de GA se carga con afterInteractive: si alguien clickea antes de
  // que termine de cargar, encolamos en dataLayer y gtag lo procesa al iniciar.
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', event, clean])
}
