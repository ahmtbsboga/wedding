/**
 * Countdown.jsx
 * ------------------------------------------------------------
 * Düğüne (23 Ağustos 2026 Pazar, 19:00) kalan süreyi gün / saat /
 * dakika / saniye olarak gösterir. Zarif, sade tasarım, mevcut
 * ivory/altın temayla uyumlu.
 *
 * KULLANIM:
 *   import Countdown from "./components/Countdown";
 *   <Countdown />
 * ------------------------------------------------------------
 */

"use client";

import React, { useEffect, useState } from "react";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

// Düğün tarihi: 23 Ağustos 2026 Pazar, 19:00
const WEDDING_DATE = new Date("2026-08-23T19:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: false };
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px]">
      <span
        className={`${playfair.className} text-3xl sm:text-5xl text-[#d3984b] tabular-nums`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className={`${playfair.className} mt-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d3984b]`}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // İlk render'da (server) timeLeft null olur, hydration mismatch'i önlemek için
  if (!timeLeft) {
    return (
      <section className="w-full py-20 flex items-center justify-center bg-[#0b0a0d]">
        <div className="h-24" />
      </section>
    );
  }

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center px-6">
      <p
        className={`${greatVibes.className} text-4xl sm:text-5xl text-[#9c7a3c] mb-2`}
      >
        Düğünümüze
      </p>
      <p
        className={`${playfair.className} text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#8a7248] mb-12`}
      >
        Kalan Süre
      </p>

      {timeLeft.done ? (
        <p
          className={`${greatVibes.className} text-3xl text-[#f1dcc0] text-center`}
        >
          Düğün başladı 🌹
        </p>
      ) : (
        <div className="flex items-start gap-3 sm:gap-6">
          <TimeBlock value={timeLeft.days} label="Gün" />
          <span className="text-2xl sm:text-4xl text-[#c9a45c]/50 pt-1 sm:pt-2">
            :
          </span>
          <TimeBlock value={timeLeft.hours} label="Saat" />
          <span className="text-2xl sm:text-4xl text-[#c9a45c]/50 pt-1 sm:pt-2">
            :
          </span>
          <TimeBlock value={timeLeft.minutes} label="Dakika" />
          <span className="text-2xl sm:text-4xl text-[#c9a45c]/50 pt-1 sm:pt-2">
            :
          </span>
          <TimeBlock value={timeLeft.seconds} label="Saniye" />
        </div>
      )}

      <div className="w-16 h-px bg-[#c9a45c]/50 mt-14" />
      <p
        className={`${playfair.className} mt-6 text-xs sm:text-sm tracking-[0.2em] uppercase text-[#8a7248] text-center`}
      >
        23 Ağustos 2026 &middot; Pazar &middot; 19:00
      </p>
    </section>
  );
}
