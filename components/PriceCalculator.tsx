'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type City = 'playaDelCarmen' | 'tulum' | 'cancun' | 'puertoMorelos'
type Format = 'solo' | 'duo'
type Duration = '45' | '90'

const PRICES: Record<City, Record<Format, Record<Duration, number>>> = {
  playaDelCarmen: { solo: { '45': 8500, '90': 14000 }, duo: { '45': 13000, '90': 20000 } },
  tulum:          { solo: { '45': 9500, '90': 16000 }, duo: { '45': 14500, '90': 22000 } },
  cancun:         { solo: { '45': 9000, '90': 15000 }, duo: { '45': 14000, '90': 21000 } },
  puertoMorelos:  { solo: { '45': 8000, '90': 13500 }, duo: { '45': 12500, '90': 19500 } },
}

const MXN_TO_USD = 17.5

export default function PriceCalculator() {
  const t = useTranslations('contact')
  const [city, setCity] = useState<City>('playaDelCarmen')
  const [format, setFormat] = useState<Format>('solo')
  const [duration, setDuration] = useState<Duration>('45')

  const mxn = PRICES[city][format][duration]
  const usd = Math.round(mxn / MXN_TO_USD)

  return (
    <div className="bg-negro border border-oro/20 p-6 md:p-8">
      <p className="font-display text-2xl text-oro mb-1">{t('calculatorTitle')}</p>
      <p className="font-sans text-sm text-arena/70 mb-6">{t('calculatorSubtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* City */}
        <div>
          <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-2">
            {t('calcCity')}
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as City)}
            className="w-full bg-hueso/5 border border-arena/20 text-hueso font-sans text-sm p-2.5 focus:border-oro outline-none transition-colors"
          >
            {(Object.keys(PRICES) as City[]).map((c) => (
              <option key={c} value={c} className="bg-negro">
                {t(`calcCities.${c}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-2">
            {t('calcFormat')}
          </label>
          <div className="flex border border-arena/20">
            {(['solo', 'duo'] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`flex-1 py-2.5 font-sans text-sm tracking-wider uppercase transition-colors ${
                  format === f
                    ? 'bg-oro text-negro'
                    : 'text-arena/70 hover:text-oro'
                }`}
              >
                {t(`calcFormats.${f}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-2">
            {t('calcDuration')}
          </label>
          <div className="flex border border-arena/20">
            {(['45', '90'] as Duration[]).map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2.5 font-sans text-sm tracking-wider uppercase transition-colors ${
                  duration === d
                    ? 'bg-oro text-negro'
                    : 'text-arena/70 hover:text-oro'
                }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="border-t border-oro/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-oro mb-1">
            {t('calcResult')}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl text-hueso">
              ${mxn.toLocaleString('es-MX')}
              <span className="font-sans text-sm text-arena/60 ml-1">MXN</span>
            </span>
            <span className="font-sans text-xl text-arena/60">
              ≈ ${usd.toLocaleString('en-US')} USD
            </span>
          </div>
        </div>
        <a
          href={`https://wa.me/525534010899?text=${encodeURIComponent(
            `Hola Nacho! Me interesa cotizar: ${city}, ${format}, ${duration} min`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold whitespace-nowrap"
        >
          Confirmar precio
        </a>
      </div>
      <p className="font-sans text-[11px] text-arena/40 mt-3">{t('calcNote')}</p>
    </div>
  )
}
