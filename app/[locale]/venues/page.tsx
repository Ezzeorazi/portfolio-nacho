import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'venues' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/hoteles-restaurantes', '/venues') }
}

export default function VenuesPage() {
  const t = useTranslations('venues')
  const locale = useLocale()
  const forItems = t.raw('for') as Array<{ title: string; desc: string }>
  const why = t.raw('why') as string[]

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      {/* For whom */}
      <section className="bg-negro py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-hueso mb-12">{t('forTitle')}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forItems.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="flex gap-6 border border-oro/15 p-8 hover:border-oro/30 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 border border-oro flex items-center justify-center">
                    <span className="font-display text-oro text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-hueso mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-arena/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-negro mb-10">{t('whyTitle')}</h2>
          </RevealOnScroll>
          <ul className="space-y-4">
            {why.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 60}>
                <li className="flex items-center gap-4 font-sans text-negro/80">
                  <span className="w-5 h-5 flex-shrink-0 border border-oro flex items-center justify-center">
                    <span className="text-oro text-xs">✓</span>
                  </span>
                  {item}
                </li>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-negro py-20 px-4 text-center">
        <RevealOnScroll>
          <div className="w-12 h-px bg-oro mx-auto mb-6" />
          <h2 className="font-display text-3xl text-hueso mb-8">{t('ctaTitle')}</h2>
          <Link href={`/${locale}/contact`} className="btn-gold">{t('ctaButton')}</Link>
        </RevealOnScroll>
      </section>
    </>
  )
}
