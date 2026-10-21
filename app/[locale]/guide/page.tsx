import type { Metadata } from 'next'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import PageHero from '@/components/PageHero'
import RevealOnScroll from '@/components/RevealOnScroll'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import { altsFor } from '@/i18n/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guide' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: altsFor(locale, '/guia-musica-boda', '/wedding-music-guide'),
  }
}

// El contenido vive acá (no en messages/) siguiendo el mismo criterio que los
// posts del blog: es texto largo y editorial, no strings de interfaz.
type Section = { title: string; body: string[]; list?: string[] }

const GUIDE: Record<string, { sections: Section[]; faqs: Array<{ q: string; a: string }> }> = {
  es: {
    sections: [
      {
        title: 'Cuándo empezar a buscar',
        body: [
          'Los músicos que trabajan bien tienen agenda con mucha anticipación, sobre todo en temporada alta de la Riviera Maya (noviembre a abril) y en fines de semana largos. Si tu boda es en esa ventana, buscá con ocho a doce meses de anticipación.',
          'Fuera de temporada, con cuatro a seis meses suele alcanzar. Lo que casi nunca funciona es dejarlo para el último mes: no porque no consigas a nadie, sino porque vas a elegir entre lo que quedó libre en vez de entre lo que te gusta.',
        ],
      },
      {
        title: 'Los cuatro momentos musicales de una boda',
        body: [
          'Pensar la música como un solo bloque es el error más común. Una boda tiene cuatro momentos con necesidades distintas, y no todos requieren el mismo formato ni la misma cantidad de músicos.',
        ],
        list: [
          'Ceremonia: es el momento más emotivo y el que menos volumen necesita. Guitarra y voz, o dúo con violín o cajón, alcanza y sobra. Acá importa la letra y que se escuche cada palabra.',
          'Cóctel: la música acompaña, no protagoniza. La gente se saluda, toma algo y recorre el lugar. Repertorio suave: baladas, clásicos latinos y versiones acústicas.',
          'Cena: parecido al cóctel pero un poco más presente. Es buen momento para las canciones que significan algo para ustedes.',
          'Fiesta: acá cambia todo. Se necesita energía, volumen y, casi siempre, la combinación de banda o dúo con DJ para que la música no pare nunca.',
        ],
      },
      {
        title: 'Solista, dúo o banda: cómo decidir',
        body: [
          'La decisión depende menos del presupuesto de lo que la gente cree, y más de la cantidad de invitados y del tipo de fiesta que querés.',
          'Un solista funciona perfecto para ceremonia y cóctel hasta unos cien invitados, y da una intimidad que una banda no puede dar. Un dúo agrega cuerpo sin perder esa cercanía, y es el formato que mejor rinde si vas a cubrir varios momentos. Una banda tiene sentido cuando la fiesta es el centro de la boda y hay más de ciento cincuenta personas.',
          'Una opción que muchos no consideran: contratar formatos distintos para momentos distintos. Solista en la ceremonia, dúo en el cóctel, banda o dúo con DJ en la fiesta. Suele salir más barato que una banda todo el día y suena mejor en cada momento.',
        ],
      },
      {
        title: 'Música en vivo y DJ no compiten',
        body: [
          'El falso dilema clásico. La música en vivo da el momento irrepetible y la conexión; el DJ da continuidad, volumen parejo y los hits que todo el mundo espera bailar a las tres de la mañana.',
          'La combinación que mejor funciona: vivo en ceremonia, cóctel y el arranque de la fiesta, y DJ de ahí en adelante, con el músico sumándose en algunos temas. Nadie se queda esperando entre set y set y la fiesta no se cae nunca.',
        ],
      },
      {
        title: 'Qué debería incluir el presupuesto',
        body: [
          'Un presupuesto serio aclara todo esto sin que tengas que preguntarlo. Si no lo aclara, preguntalo antes de señar.',
        ],
        list: [
          'Cuántas horas de música e incluye cuántos sets, con los cortes especificados.',
          'Si el sonido está incluido y para cuántos invitados está dimensionado.',
          'Cuánto sale la hora extra, decidida la misma noche.',
          'Qué pasa con la música entre set y set.',
          'Cuántas canciones fuera del repertorio se pueden pedir.',
          'Viáticos y traslado si la boda es fuera de su ciudad base.',
          'Seña, saldo, y qué pasa si se cancela o se cambia la fecha.',
        ],
      },
      {
        title: 'Los errores que más veo',
        body: [],
        list: [
          'Elegir solo por precio sin escuchar material en vivo. Un video de estudio no dice nada sobre cómo suena alguien en una boda con viento y ruido de fondo.',
          'No preguntar por el plan B de lluvia. En la costa esto pasa, y hay que saber de antemano quién mueve el equipo y quién lo cubre.',
          'Armar una lista de cincuenta canciones obligatorias. Quita el criterio del músico para leer a la gente, que es justamente lo que estás pagando.',
          'Olvidarse de la comida del equipo y de un lugar con sombra para armar. Parece menor, pero un músico que tocó cuatro horas sin comer se nota.',
          'No definir quién da la señal de arranque de cada momento. Suele ser el wedding planner; si no hay, definilo con alguien de confianza.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuánto se suele destinar a la música en el presupuesto total?',
        a: 'Como referencia, entre el ocho y el doce por ciento del presupuesto total de la boda. Por debajo de eso normalmente se resigna sonido propio o cantidad de horas.',
      },
      {
        q: '¿Puedo pedir una canción que el músico no toca?',
        a: 'Casi siempre sí, con tiempo. Lo razonable es entre tres y cinco canciones nuevas aprendidas para la fecha. Más que eso deja de ser un pedido y pasa a ser un ensayo de repertorio nuevo completo.',
      },
      {
        q: '¿El músico trae su propio sonido?',
        a: 'Depende del formato y del lugar. Un solista o dúo suele traer un equipo suficiente para ceremonia y cóctel. Para una fiesta de más de cien personas conviene confirmar si el equipo alcanza o si hay que contratar sonido aparte.',
      },
      {
        q: '¿Qué pasa si llueve?',
        a: 'Tiene que estar hablado antes. Lo habitual es que el venue tenga un plan B techado y que el traslado del equipo esté contemplado. Lo que nunca conviene es resolverlo el mismo día.',
      },
    ],
  },
  en: {
    sections: [
      {
        title: 'When to start looking',
        body: [
          'Musicians who work well book far in advance, especially during the Riviera Maya high season (November through April) and on long weekends. If your wedding falls in that window, start looking eight to twelve months ahead.',
          'Off season, four to six months is usually enough. What rarely works is leaving it to the last month — not because you won’t find anyone, but because you’ll be choosing from whoever is left instead of from who you actually like.',
        ],
      },
      {
        title: 'The four musical moments of a wedding',
        body: [
          'Thinking of the music as a single block is the most common mistake. A wedding has four moments with different needs, and they don’t all call for the same format or the same number of musicians.',
        ],
        list: [
          'Ceremony: the most emotional moment and the one that needs the least volume. Guitar and voice, or a duo with violin or cajón, is more than enough. What matters here is the lyrics and that every word is heard.',
          'Cocktail hour: the music accompanies, it doesn’t lead. People are greeting each other, having a drink, exploring the venue. Soft repertoire: ballads, Latin classics and acoustic versions.',
          'Dinner: similar to the cocktail hour but slightly more present. A good moment for the songs that mean something to you both.',
          'Party: everything changes here. You need energy, volume and, almost always, a band or duo combined with a DJ so the music never stops.',
        ],
      },
      {
        title: 'Solo, duo or band: how to decide',
        body: [
          'The decision depends less on budget than people think, and more on guest count and the kind of party you want.',
          'A solo act works perfectly for ceremony and cocktail hour up to around a hundred guests, and brings an intimacy a band simply can’t. A duo adds body without losing that closeness, and it’s the format that delivers best if you’re covering several moments. A band makes sense when the party is the center of the wedding and there are more than a hundred and fifty people.',
          'One option many people don’t consider: hiring different formats for different moments. Solo for the ceremony, duo for the cocktail hour, band or duo with DJ for the party. It usually costs less than a band all day and sounds better at every stage.',
        ],
      },
      {
        title: 'Live music and DJ are not competitors',
        body: [
          'The classic false dilemma. Live music gives you the unrepeatable moment and the connection; the DJ gives continuity, even volume and the hits everyone expects to dance to at three in the morning.',
          'The combination that works best: live for the ceremony, cocktail hour and the start of the party, then DJ from there on, with the musician joining in on a few songs. Nobody waits around between sets and the party never dips.',
        ],
      },
      {
        title: 'What the quote should include',
        body: [
          'A serious quote spells all of this out without you having to ask. If it doesn’t, ask before putting down a deposit.',
        ],
        list: [
          'How many hours of music and how many sets, with the breaks specified.',
          'Whether sound is included and what guest count it’s sized for.',
          'What an extra hour costs, decided the same night.',
          'What happens with music between sets.',
          'How many songs outside the repertoire can be requested.',
          'Travel and per diem if the wedding is outside their home city.',
          'Deposit, balance, and what happens if the date is cancelled or moved.',
        ],
      },
      {
        title: 'The mistakes I see most',
        body: [],
        list: [
          'Choosing on price alone without hearing live material. A studio video says nothing about how someone sounds at a wedding with wind and background noise.',
          'Not asking about the rain plan. On the coast this happens, and you need to know in advance who moves the gear and who covers it.',
          'Building a list of fifty mandatory songs. It removes the musician’s ability to read the room, which is exactly what you’re paying for.',
          'Forgetting about crew meals and a shaded spot to set up. It sounds minor, but a musician who played four hours without eating shows.',
          'Not defining who gives the cue to start each moment. Usually it’s the wedding planner; if there isn’t one, assign someone you trust.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much of the total budget usually goes to music?',
        a: 'As a reference, between eight and twelve percent of the total wedding budget. Below that you usually give up either your own sound system or hours of music.',
      },
      {
        q: 'Can I request a song the musician doesn’t play?',
        a: 'Almost always yes, with enough notice. Three to five new songs learned for the date is reasonable. Beyond that it stops being a request and becomes rehearsing an entirely new repertoire.',
      },
      {
        q: 'Does the musician bring their own sound system?',
        a: 'It depends on the format and the venue. A solo act or duo usually brings enough gear for ceremony and cocktail hour. For a party of more than a hundred people, confirm whether the system is enough or whether separate sound needs to be hired.',
      },
      {
        q: 'What happens if it rains?',
        a: 'It has to be discussed beforehand. Typically the venue has a covered plan B and moving the gear is accounted for. What never works is solving it on the day.',
      },
    ],
  },
}

export default function GuidePage() {
  const t = useTranslations('guide')
  const locale = useLocale()
  const content = GUIDE[locale] ?? GUIDE.es

  return (
    <>
      <PageHero title={t('heroTitle')} subtitle={t('heroSubtitle')} />

      <section className="bg-hueso py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-14">
          {content.sections.map((section, i) => (
            <RevealOnScroll key={i}>
              <div className="w-10 h-px bg-oro mb-5" />
              <h2 className="font-display text-2xl sm:text-3xl text-negro mb-5">{section.title}</h2>
              {section.body.map((p, j) => (
                <p key={j} className="font-sans text-negro/80 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-3 mt-5">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-4 bg-white/60 border-l-2 border-oro p-5">
                      <span className="font-display text-oro text-lg leading-none">
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-sm text-negro/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Lead magnet */}
      <section data-loc="guide" className="bg-negro py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <LeadMagnetForm location="guide" />
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-hueso py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="w-12 h-px bg-oro mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-negro mb-10">
              {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
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

      <section data-loc="guide_cta" className="bg-negro py-20 px-4 border-t border-oro/10">
        <RevealOnScroll className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-oro mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl text-hueso mb-4">{t('ctaTitle')}</h2>
          <p className="font-sans text-arena/70 leading-relaxed mb-8">{t('ctaText')}</p>
          <Link href="/contact" data-cta="quote" className="btn-gold">
            {locale === 'es' ? 'Consultar disponibilidad' : 'Check availability'}
          </Link>
        </RevealOnScroll>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: t('heroTitle'),
                description: t('metaDesc'),
                author: { '@type': 'Person', name: 'Nacho Rodriguez' },
                inLanguage: locale,
              },
              {
                '@type': 'FAQPage',
                mainEntity: content.faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  )
}
