import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import ServiceCTA from '@/components/ServiceCTA'
import { altsFor } from '@/i18n/seo'

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
    alternates: altsFor(locale, '/bodas', '/weddings'),
  }
}

export default function WeddingsPage() {
  const t = useTranslations('weddings')
  const tc = useTranslations('contact')
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

      {/* Guía — captura a quien todavía está averiguando, no contratando */}
      <section data-loc="weddings_guide" className="bg-negro py-16 px-4 border-t border-oro/10">
        <RevealOnScroll className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px bg-oro mx-auto mb-5" />
          <h2 className="font-display text-2xl sm:text-3xl text-hueso mb-4">
            {locale === 'es'
              ? '¿Todavía estás averiguando?'
              : 'Still figuring things out?'}
          </h2>
          <p className="font-sans text-sm text-arena/70 leading-relaxed mb-7">
            {locale === 'es'
              ? 'Escribí una guía con todo lo que conviene saber antes de contratar música para una boda: cuándo buscar, qué formato va en cada momento y qué debería incluir el presupuesto.'
              : 'I wrote a guide with everything worth knowing before booking wedding music: when to look, which format fits each moment, and what the quote should include.'}
          </p>
          <Link href="/guide" data-cta="guide" className="btn-outline">
            {locale === 'es' ? 'Leer la guía' : 'Read the guide'}
          </Link>
        </RevealOnScroll>
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

      <ServiceCTA
        title={t('ctaTitle')}
        text={t('ctaText')}
        button={t('ctaButton')}
        whatsappLabel={tc('whatsappButton')}
        whatsappText={tc('whatsappText')}
        location="weddings_cta"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: locale === 'es' ? 'Música en Vivo para Bodas' : 'Live Music for Weddings',
            provider: { '@type': 'Person', name: 'Nacho Rodriguez' },
            areaServed: ['Mexico', 'United States'],
            description: t('metaDesc'),
            '@id': `https://nachorodriguezmusic.com/${locale}/weddings`,
          }),
        }}
      />
    </>
  )
}
