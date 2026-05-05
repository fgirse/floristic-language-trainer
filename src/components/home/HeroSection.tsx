'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false)

  return (
    <section className="relative w-full overflow-hidden rounded-xl h-48 sm:h-64 md:h-80 lg:h-96">
      {!videoEnded && (
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          onEnded={() => setVideoEnded(true)}
        >
          <source src="/blumen_wachsen_weltkugel.mp4" type="video/mp4" />
        </video>
      )}

      {videoEnded && (
        <Image
          src="/HeroTitle.png"
          alt="Floristik Sprach Trainer"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
        />
      )}

      {/* overlay for legibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-white font-bold drop-shadow-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          Floristik Sprach Trainer
        </h1>
        <p className="mt-2 text-white/80 drop-shadow text-sm sm:text-base md:text-lg max-w-xl">
          Lerne Deutsch für deinen Job als Floristin — Vokabeln, Redewendungen und echte
          Kundengespräche, auf Schweizer&nbsp;🇨🇭 Niveau.
        </p>
      </div>
    </section>
  )
}
