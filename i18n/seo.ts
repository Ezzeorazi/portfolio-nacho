import type { Metadata } from 'next'

const BASE = process.env.SITE_URL || 'https://nachorodriguezmusic.com'

/**
 * Construye canonical + hreflang (es / en / x-default) para una página,
 * a partir de su ruta localizada en cada idioma (sin prefijo de locale).
 *
 * Ej: altsFor('es', '/bodas', '/weddings')
 */
export function altsFor(
  locale: string,
  esPath: string,
  enPath: string
): Metadata['alternates'] {
  const esUrl = `${BASE}/es${esPath}`
  const enUrl = `${BASE}/en${enPath}`
  return {
    canonical: locale === 'en' ? enUrl : esUrl,
    languages: {
      es: esUrl,
      en: enUrl,
      'x-default': esUrl,
    },
  }
}
