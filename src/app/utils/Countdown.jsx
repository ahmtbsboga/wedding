'use client'
import React, { useState, useEffect } from 'react'

const Countdown = () => {
  // Yil, Ay (0=Ocak, 7=Agustos), Gun, Saat, Dakika, Saniye
  const targetDate = new Date(2026, 7, 23, 0, 0, 0)

  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-4 sm:px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none">
      <h2 className="relative font-serif text-2xl mb-6 text-yellow-50">Düğünümüze Kalan Süre</h2>
      <div className="relative flex justify-center gap-2 sm:gap-4 text-yellow-50">
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{timeLeft ? timeLeft.days : '--'}</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow-100/60">Gün</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{timeLeft ? timeLeft.hours : '--'}</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow-100/60">Saat</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{timeLeft ? timeLeft.minutes : '--'}</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow-100/60">Dakika</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold">{timeLeft ? timeLeft.seconds : '--'}</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow-100/60">Saniye</p>
        </div>
      </div>
    </div>
  )
}

export default Countdown