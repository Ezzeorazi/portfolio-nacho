import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/app/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://nachorodriguezmusic.com'),
  title: {
    default: 'Nacho Rodriguez | Música en Vivo para Bodas y Eventos',
    template: '%s | Nacho Rodriguez Músico',
  },
  description:
    'Música en vivo profesional para bodas y eventos privados en México y Estados Unidos. +10 años de experiencia, repertorio versátil, formato solista o dúo. Disponible para viajar.',
  keywords: [
    'música en vivo para bodas',
    'músico para eventos',
    'live wedding music Mexico',
    'destination wedding musician',
    'música en vivo eventos privados',
    'músico profesional bodas',
    'bilingual wedding singer',
  ],
  authors: [{ name: 'Nacho Rodriguez' }],
  openGraph: {
    siteName: 'Nacho Rodriguez Músico',
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'es' | 'en')) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-negro text-hueso font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-50BJRHQ23R" />
    </html>
  )
}
