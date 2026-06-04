interface PageHeroProps {
  title: string
  subtitle?: string
  dark?: boolean
  image?: string
}

export default function PageHero({ title, subtitle, dark = true, image }: PageHeroProps) {
  return (
    <section
      className={`relative flex items-end pt-32 pb-16 px-4 min-h-[50vh] ${
        dark ? 'bg-negro' : 'bg-hueso'
      }`}
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {image && <div className="absolute inset-0 bg-negro/70" />}
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="w-14 h-px bg-oro mb-6" />
        <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl mb-4 ${dark || image ? 'text-hueso' : 'text-negro'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`font-sans text-lg max-w-xl leading-relaxed ${dark || image ? 'text-arena/80' : 'text-negro/60'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
