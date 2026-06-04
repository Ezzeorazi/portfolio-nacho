import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'

const VALID_CITIES = ['playa-del-carmen', 'tulum', 'cancun', 'puerto-morelos']

export async function generateStaticParams() {
  return VALID_CITIES.flatMap((city) =>
    ['es', 'en'].map((locale) => ({ locale, city }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}): Promise<Metadata> {
  const { locale, city } = await params
  if (!VALID_CITIES.includes(city)) return {}
  const t = await getTranslations({ locale, namespace: 'liveMusic' })
  const cityData = t.raw(`cities.${city}`) as { metaTitle: string; metaDesc: string }
  return {
    title: cityData.metaTitle,
    description: cityData.metaDesc,
  }
}

export default function CityPage({
  params,
}: {
  params: { locale: string; city: string }
}) {
  const { city } = params
  if (!VALID_CITIES.includes(city)) notFound()

  const t = useTranslations('liveMusic')
  const locale = useLocale()
  const cityData = t.raw(`cities.${city}`) as {
    name: string
    heroTitle: string
    desc: string
    venues: string[]
  }

  return (
    <>
      <PageHero title={cityData.heroTitle} />

      <section className="bg-negro py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <p className="font-sans text-lg text-arena/80 leading-relaxed mb-12">{cityData.desc}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h2 className="font-display text-2xl text-hueso mb-6">
              {locale === 'es' ? 'Venues donde he tocado' : 'Venues where I have performed'}
            </h2>
            <ul className="space-y-3">
              {cityData.venues.map((venue, i) => (
                <li key={i} className="flex items-center gap-4 font-sans text-arena/70 text-sm">
                  <span className="w-px h-5 bg-oro flex-shrink-0" />
                  {venue}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* Other cities */}
      <section className="bg-hueso py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro mb-6">
              {locale === 'es' ? 'También toco en' : 'I also play in'}
            </p>
            <div className="flex flex-wrap gap-3">
              {VALID_CITIES.filter((c) => c !== city).map((c) => {
                const other = t.raw(`cities.${c}`) as { name: string }
                return (
                  <Link
                    key={c}
                    href={`/${locale}/live-music/${c}`}
                    className="font-sans text-xs tracking-widest uppercase border border-negro/20 text-negro px-4 py-2 hover:border-oro hover:text-oro transition-colors"
                  >
                    {other.name}
                  </Link>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-negro py-20 px-4 text-center">
        <RevealOnScroll>
          <div className="w-12 h-px bg-oro mx-auto mb-6" />
          <h2 className="font-display text-3xl text-hueso mb-4">
            {locale === 'es'
              ? `¿Tenés un evento en ${cityData.name}?`
              : `Have an event in ${cityData.name}?`}
          </h2>
          <p className="font-sans text-arena/70 mb-8">
            {locale === 'es'
              ? 'Cotizá sin compromiso.'
              : 'Get a no-obligation quote.'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {locale === 'es' ? 'Obtener cotización' : 'Get a quote'}
          </Link>
        </RevealOnScroll>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: cityData.heroTitle,
            provider: { '@type': 'Person', name: 'Nacho Rodríguez' },
            areaServed: cityData.name,
            description: cityData.desc,
          }),
        }}
      />
    </>
  )
}
