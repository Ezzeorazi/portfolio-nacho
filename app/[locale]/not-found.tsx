import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-negro flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="font-display text-8xl text-oro/20 mb-4">404</p>
        <div className="w-12 h-px bg-oro mx-auto mb-6" />
        <h1 className="font-display text-3xl text-hueso mb-4">
          Página no encontrada
        </h1>
        <p className="font-sans text-arena/60 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <Link href="/" className="btn-gold">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
