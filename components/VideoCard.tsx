'use client'

import { useRef, useState } from 'react'

interface VideoCardProps {
  src?: string
  poster?: string
  title: string
  subtitle?: string
  className?: string
}

export default function VideoCard({ src, poster, title, subtitle, className = '' }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  const handleClick = () => {
    const v = videoRef.current
    if (!v) return
    if (!playing) {
      v.play()
      setPlaying(true)
      setMuted(false)
    } else {
      setMuted((m) => !m)
    }
  }

  return (
    <div
      className={`relative group overflow-hidden cursor-pointer bg-negro aspect-video ${className}`}
      onClick={handleClick}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        /* Placeholder when no video provided yet */
        <div className="w-full h-full bg-gradient-to-br from-negro via-negro/80 to-oro/10 flex items-center justify-center">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={title} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <svg className="w-16 h-16 text-oro/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1.5 5.25v7.5L16.5 12l-6-3.75z" />
            </svg>
          )}
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-negro/40 group-hover:bg-negro/20 transition-all duration-300" />

      {/* Play / mute icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-oro/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-oro">
          {!playing ? (
            <svg className="w-6 h-6 text-oro translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : muted ? (
            <svg className="w-5 h-5 text-oro" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-oro" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-negro/90 to-transparent">
        <p className="font-display text-hueso text-sm leading-tight">{title}</p>
        {subtitle && (
          <p className="font-sans text-arena/70 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Muted hint */}
      {!playing && (
        <div className="absolute top-3 right-3">
          <span className="font-sans text-[10px] tracking-widest uppercase text-oro bg-negro/60 px-2 py-1">
            {muted ? 'Click to play' : ''}
          </span>
        </div>
      )}
    </div>
  )
}
