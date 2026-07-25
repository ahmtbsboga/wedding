"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import WeddingGlow from "./components/WeddingGlow";
import Countdown from "./components/Countdown";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// ---------------------------------------------------------------
// Küçük yardımcı: fade-up ile beliren bölüm sarmalayıcı
// ---------------------------------------------------------------
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------
// Tarih kartı (Kına / Düğün)
// ---------------------------------------------------------------
function DateCard({ label, day, date, time }) {
  return (
    <div className="flex flex-col items-center px-8 py-10 border border-[#c9a45c]/40 rounded-sm bg-[#fffdf7]/60 backdrop-blur-sm min-w-[220px]">
      <span
        className={`${playfair.className} text-xs tracking-[0.35em] text-[#a3813f] uppercase mb-3`}
      >
        {label}
      </span>
      <span
        className={`${greatVibes.className} text-4xl text-[#7a5a2a] mb-2`}
      >
        {day}
      </span>
      <span
        className={`${playfair.className} text-sm text-[#5c4a2c] tracking-wide`}
      >
        {date}
      </span>
      {time && (
        <span
          className={`${playfair.className} text-xs text-[#8a7248] tracking-[0.2em] uppercase mt-2`}
        >
          {time}
        </span>
      )}
    </div>
  );
}

const Header = () => {
  const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(true);

useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  audio.volume = 0.35;

  const playMusic = async () => {
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      // Tarayıcı otomatik oynatmayı engellerse kullanıcı butona basınca başlar.
      setIsPlaying(false);
    }
  };

  playMusic();
}, []);

const toggleMusic = async () => {
  const audio = audioRef.current;

  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.log(err);
    }
  }
};
  return (
    <>
    <audio
  ref={audioRef}
  src="/weddingmusic.mp3"
  loop
  preload="auto"
/>

<button
  onClick={toggleMusic}
  className="fixed top-5 right-5 z-[9999]
             w-14 h-14
             rounded-full
             bg-[#c9a45c]/90
             border border-[#f6e6b8]
             shadow-2xl
             backdrop-blur-md
             flex items-center justify-center
             transition-all duration-300
             hover:scale-110"
>
  <Music2
    size={28}
    className={`text-white transition-all duration-300 ${
      isPlaying ? "animate-spin" : ""
    }`}
    style={{
      animationDuration: "4s",
      textDecoration: !isPlaying ? "line-through" : "none",
    }}
  />
</button>
     <div
      className="w-full"
      style={{
        background: "#faf4ea",
      }}
    >
      {/* ---------------------------------------------------- */}
      {/* KARŞILAMA */}
      {/* ---------------------------------------------------- */}
      <header className="w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 bg-[#faf4ea]">
        <Reveal className="flex flex-col items-center">
          <Image
            src="/foto3.jpeg"
            alt="Foto3 "
            width={480}
            height={320}
            className="w-full max-w-md h-auto object-contain drop-shadow-xl"
            priority
          />

          <motion.p
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`${greatVibes.className} mt-10 text-6xl md:text-8xl text-[#9c7a3c] drop-shadow-sm`}
          >
            Şeyda &amp; Ahmet
          </motion.p>

          <p
            className={`${playfair.className} mt-6 max-w-xl text-center text-[#5c4a2c] text-base md:text-lg leading-relaxed`}
          >
            İki gönül, tek bir yürek olmaya karar verdi. Sevgimizin en anlamlı
            gününde yanımızda olmanızı; mutluluğumuza ortak olmanızı dileriz.
          </p>
        </Reveal>

        <div className="w-24 h-px bg-[#c9a45c] my-12" />

        {/* ---------------------------------------------------- */}
        {/* TARİHLER */}
        {/* ---------------------------------------------------- */}
        <Reveal delay={0.1} className="w-full flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <DateCard
              label="Kına Gecesi"
              day="22 Ağustos"
              date="Cumartesi, 2026"
            />
            <span
              className={`${greatVibes.className} text-3xl text-[#c9a45c] hidden sm:block`}
            >
              &amp;
            </span>
            <DateCard
              label="Düğün"
              day="23 Ağustos"
              date="Pazar, 2026"
            />
          </div>
        </Reveal>

        <Countdown/>

        <Reveal delay={0.2} className="mt-14 max-w-xl text-center">
          <p
            className={`${playfair.className} text-[#7a6440] text-sm md:text-base leading-relaxed italic`}
          >
            &ldquo;Sevgi, iki kişinin birbirine bakması değil, birlikte aynı
            yöne bakmasıdır.&rdquo;
          </p>
        </Reveal>
      </header>

      {/* ---------------------------------------------------- */}
      {/* AYIRICI */}
      {/* ---------------------------------------------------- */}
      <div className="w-full flex items-center justify-center py-10 bg-[#faf4ea]">
        <div className="w-16 h-px bg-[#c9a45c]/60" />
        <span className={`${greatVibes.className} mx-4 text-2xl text-[#c9a45c]`}>
          ✦
        </span>
        <div className="w-16 h-px bg-[#c9a45c]/60" />
      </div>

      {/* ---------------------------------------------------- */}
      {/* FOTOĞRAF GALERİSİ */}
      {/* ---------------------------------------------------- */}
      <section className="w-full px-6 md:px-16 py-4 pb-20 bg-[#faf4ea]">
        <Reveal className="text-center mb-10">
          <p
            className={`${greatVibes.className} text-4xl text-[#9c7a3c]`}
          >
            Anılarımız
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md">
              <Image
                src="/foto1.jpeg"
                alt="Şeyda ve Ahmet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md md:mt-8">
              <Image
                src="/foto5.jpeg"
                alt="Şeyda ve Ahmet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md">
              <Image
                src="/foto7.jpeg"
                alt="Şeyda ve Ahmet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md md:mt-8">
              <Image
                src="/foto4.jpeg"
                alt="Şeyda ve Ahmet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3D KART CAROUSEL (mevcut bileşen) */}
      {/* ---------------------------------------------------- */}
      {/* <section className="w-full bg-[#faf4ea] pb-10">
        <ImageCarousel />
      </section> */}

      {/* ---------------------------------------------------- */}
      {/* YILDIZLI GECE BÖLÜMÜ + KAPANIŞ SÖZÜ */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0b0a0d]">
        <div className="absolute inset-0">
          <WeddingGlow />
        </div>

        <Reveal className="relative z-10 max-w-lg text-center px-6">
          <p className={`${greatVibes.className} text-5xl text-[#f1dcc0] mb-6`}>
            Sizi Bekliyoruz
          </p>
          <p
            className={`${playfair.className} text-[#c9b48c] text-sm md:text-base leading-relaxed tracking-wide`}
          >
            Hayatımızın en özel gününde, sevdiklerimizle birlikte olmak
            bizim için paha biçilmez bir mutluluk olacak. Nikah şahidimiz,
            duamız ve sevincimiz olmanızı içtenlikle rica ederiz.
          </p>

          <div className="w-16 h-px bg-[#c9a45c]/60 mx-auto my-8" />

          <p
            className={`${greatVibes.className} text-2xl text-[#c9a45c]`}
          >
            Şeyda &amp; Ahmet
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="w-full py-8 text-center bg-[#0b0a0d]">
        <p
          className={`${playfair.className} text-[11px] tracking-[0.3em] uppercase text-[#8a7248]`}
        >
          22 – 23 Ağustos 2026
        </p>
      </footer>
    </div></>
   
  );
};

export default Header;