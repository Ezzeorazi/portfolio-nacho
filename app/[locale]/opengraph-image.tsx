import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nacho Rodriguez — Músico en Vivo · Riviera Maya'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(181,154,93,0.15), transparent 60%)',
          }}
        />
        {/* Top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#B59A5D',
          }}
        />
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <p style={{ color: '#B59A5D', fontSize: '14px', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'serif', margin: 0 }}>
            RIVIERA MAYA · MÉXICO
          </p>
          <div style={{ width: '60px', height: '1px', background: '#B59A5D' }} />
          <h1 style={{ color: '#F4F1EA', fontSize: '72px', fontFamily: 'serif', margin: 0, textAlign: 'center', lineHeight: 1 }}>
            Nacho Rodriguez
          </h1>
          <p style={{ color: '#DFD6BC', fontSize: '16px', letterSpacing: '0.5em', textTransform: 'uppercase', fontFamily: 'sans-serif', margin: 0 }}>
            MÚSICO · MUSICIAN
          </p>
          <div style={{ width: '60px', height: '1px', background: '#B59A5D' }} />
          <p style={{ color: '#DFD6BC', fontSize: '20px', fontFamily: 'serif', fontStyle: 'italic', margin: 0, textAlign: 'center' }}>
            &quot;Música en vivo que cuenta historias&quot;
          </p>
        </div>
        {/* Bottom */}
        <p style={{ position: 'absolute', bottom: '30px', color: '#B59A5D', fontSize: '13px', letterSpacing: '0.2em', fontFamily: 'sans-serif' }}>
          nachorodriguezmusic.com
        </p>
      </div>
    ),
    size
  )
}
