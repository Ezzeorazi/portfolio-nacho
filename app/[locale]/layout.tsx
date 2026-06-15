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
    default: 'Nacho Rodriguez | Músico en Vivo — Riviera Maya',
    template: '%s | Nacho Rodriguez Músico',
  },
  description:
    'Músico en vivo para bodas y eventos en la Riviera Maya. Cantautor bilingüe ES/EN — Playa del Carmen, Tulum, Cancún. Solista o dúo.',
  keywords: [
    'wedding musician Riviera Maya',
    'live music wedding Tulum',
    'acoustic guitarist wedding Riviera Maya',
    'músico para bodas Playa del Carmen',
    'música en vivo Tulum',
    'cantante para bodas Riviera Maya',
    'bilingual wedding singer Mexico',
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
