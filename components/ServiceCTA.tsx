import { Link } from '@/i18n/navigation'
import RevealOnScroll from '@/components/RevealOnScroll'

/**
 * Cierre de las páginas de servicio (bodas, eventos privados, venues). Hasta
 * ahora estas páginas terminaban sin ningún CTA propio: el único camino a
 * contacto era el banner del footer.
 */
export default function ServiceCTA({
  title,
  text,
  button,
  whatsappLabel,
  whatsappText,
  location,
}: {
  title: string
  text?: string
  button: string
  whatsappLabel: string
  whatsappText: string
  location: string
}) {
  return (
    <section data-loc={location} className="bg-negro py-20 px-4 border-t border-oro/10">
      <RevealOnScroll className="max-w-3xl mx-auto text-center">
        <div className="w-12 h-px bg-oro mx-auto mb-6" />
        <h2 className="font-display text-3xl sm:text-4xl text-hueso mb-4">{title}</h2>
        {text && (
          <p className="font-sans text-arena/70 leading-relaxed mb-8 max-w-xl mx-auto">{text}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/contact" data-cta="quote" className="btn-gold">
            {button}
          </Link>
          <a
            href={`https://wa.me/525534010899?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            {whatsappLabel}
          </a>
        </div>
      </RevealOnScroll>
    </section>
  )
}
