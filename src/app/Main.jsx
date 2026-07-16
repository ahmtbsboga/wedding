'use client'
import React from 'react'
import MusicPlayer from './utils/MusicPlayer'
import Card from './utils/Card'




const Main = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#2b2b2a] via-[#7a5c2e] to-[#c9a84c]">
      <MusicPlayer />
      {/* Arka plan resmi - varsa buraya gelir, golden overlay ile karisir */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/dugun-arka-plan.jpg')",
          filter: "blur(10px) brightness(0.7) sepia(0.4)",
        }}
      />

      {/* Golden overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/30 via-amber-900/20 to-black/50" />

      {/* Icerik */}
      <div>

<Card/>

      </div>
    </div>
  )
}

export default Main