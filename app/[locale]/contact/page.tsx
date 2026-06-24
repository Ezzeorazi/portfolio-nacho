import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import RevealOnScroll from '@/components/RevealOnScroll'
import ContactForm from '@/components/ContactForm'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('metaTitle'), description: t('metaDesc'), alternates: altsFor(locale, '/contacto', '/contact') }
}

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()

  return (
    <>
      <section className="bg-negro pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="sr-only">{t('heroTitle')}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <RevealOnScroll>
              <div className="w-12 h-px bg-oro mb-6" />
              <h2 className="font-display text-2xl sm:text-3xl text-hueso mb-8">
                {locale === 'es' ? 'Enviame un mensaje' : 'Send me a message'}
              </h2>
              <ContactForm />
            </RevealOnScroll>

            {/* Sidebar */}
            <RevealOnScroll delay={200}>
              <div className="space-y-8">
                {/* WhatsApp */}
                <div className="border border-oro/15 p-6">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-oro mb-4">WhatsApp</p>
                  <p className="font-sans text-sm text-arena/70 mb-4">
                    {locale === 'es'
                      ? 'Preferís escribir por WhatsApp? Estoy disponible todos los días.'
                      : 'Prefer WhatsApp? I am available every day.'}
                  </p>
                  <a
                    href={`https://wa.me/525534010899?text=${encodeURIComponent(t('whatsappText'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full justify-center"
                  >
                    {t('whatsappButton')}
                  </a>
                </div>

                {/* Response time */}
                <div className="border border-oro/10 p-6 bg-hueso/3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-oro animate-pulse" />
                    <p className="font-sans text-xs tracking-wider uppercase text-oro">
                      {locale === 'es' ? 'Tiempo de respuesta' : 'Response time'}
                    </p>
                  </div>
                  <p className="font-display text-2xl text-hueso">
                    {locale === 'es' ? 'Menos de 24 hs' : 'Less than 24h'}
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-3">
                  <a href="mailto:nachorodriguez.fora@gmail.com" className="flex items-center gap-3 font-sans text-sm text-arena/70 hover:text-oro transition-colors">
                    <span className="text-oro">✉</span> nachorodriguez.fora@gmail.com
                  </a>
                  <a href="https://www.instagram.com/nachorodriguez.music" className="flex items-center gap-3 font-sans text-sm text-arena/70 hover:text-oro transition-colors">
                    <span className="text-oro">◈</span> @nachorodriguez.music
                  </a>
                  <p className="flex items-center gap-3 font-sans text-sm text-arena/70">
                    <span className="text-oro">◎</span> México · Estados Unidos
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: locale === 'es' ? 'Contacto — Nacho Rodriguez' : 'Contact — Nacho Rodriguez',
            url: `https://nachorodriguezmusic.com/${locale}/contact`,
            mainEntity: {
              '@type': 'Person',
              name: 'Nacho Rodriguez',
              telephone: '+525534010899',
              email: 'nachorodriguez.fora@gmail.com',
            },
          }),
        }}
      />
    </>
  )
}
