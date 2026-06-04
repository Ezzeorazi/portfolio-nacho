import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'weddings' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      languages: { es: '/es/bodas', en: '/en/weddings' },
    },
  }
}

export default function WeddingsPage() {
  const t = useTranslations('weddings')
  const locale = useLocale()

  const moments = t.raw('moments') as Array<{ title: string; desc: string }>
  const faqs = t.raw('faqs') as Array<{ q: string; a: string }>
  const why = t.raw('why') as string[]

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      {/* Why live music */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-negro mb-10">{t('whyTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {why.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="flex items-start gap-4 p-6 bg-white/50 border-l-2 border-oro">
                  <span className="font-display text-oro text-2xl mt-0.5">✓</span>
                  <p className="font-sans text-negro/80 leading-relaxed">{item}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-14">
            <div className="w-12 h-px bg-oro mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-hueso">{t('momentsTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px border border-oro/10">
            {moments.map((m, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="bg-negro p-8 border border-oro/5 hover:border-oro/20 transition-colors">
                  <p className="font-display text-oro text-3xl mb-4">{['I', 'II', 'III', 'IV'][i]}</p>
                  <div className="w-8 h-px bg-oro mb-4" />
                  <h3 className="font-display text-xl text-hueso mb-3">{m.title}</h3>
                  <p className="font-sans text-sm text-arena/70 leading-relaxed">{m.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-negro mb-10">{t('faqTitle')}</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <details className="group border border-negro/10 bg-white/60">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-sans font-semibold text-negro text-sm list-none">
                    {faq.q}
                    <span className="text-oro ml-4 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="font-sans text-negro/70 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-negro py-20 px-4 text-center">
        <RevealOnScroll>
          <div className="w-12 h-px bg-oro mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl text-hueso mb-4">{t('ctaTitle')}</h2>
          <p className="font-sans text-arena/70 mb-8">{t('ctaText')}</p>
          <Link href={`/${locale}/contact`} className="btn-gold">{t('ctaButton')}</Link>
        </RevealOnScroll>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: locale === 'es' ? 'Música en Vivo para Bodas' : 'Live Music for Weddings',
            provider: { '@type': 'Person', name: 'Nacho Rodríguez' },
            areaServed: 'Riviera Maya, Mexico',
            description: t('metaDesc'),
            '@id': `https://nachorodriguezmusic.com/${locale}/weddings`,
          }),
        }}
      />
    </>
  )
}
