"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { Music2, MapPin, Calendar, Clock } from "lucide-react";
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
function DateCard({ label, day, date, timeRange }) {
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
      {timeRange && (
        <div className="mt-3 flex items-center gap-2">
          <Clock size={14} className="text-[#c9a45c]" />
          <span
            className={`${playfair.className} text-xs text-[#8a7248] tracking-[0.1em]`}
          >
            {timeRange}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// MEKAN KARTI
// ---------------------------------------------------------------
function VenueCard({ label, venue, venueLink }) {
  return (
    <motion.a
      href={venueLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="block group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 px-5 py-3 border border-[#c9a45c]/30 rounded-lg bg-[#fffdf7]/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#c9a45c]/60">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9a45c]/10 flex items-center justify-center border border-[#c9a45c]/20 group-hover:bg-[#c9a45c]/20 transition-colors">
          <MapPin size={18} className="text-[#c9a45c]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`${playfair.className} text-xs text-[#8a7248] tracking-[0.2em] uppercase`}>
            {label}
          </p>
          <p className={`${playfair.className} text-sm font-medium text-[#7a5a2a] truncate group-hover:text-[#c9a45c] transition-colors`}>
            {venue}
          </p>
        </div>
        
        <div className="flex-shrink-0 text-[#c9a45c]/50 group-hover:text-[#c9a45c] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

// ---------------------------------------------------------------
// MEKAN KARTLARI KONTEYNERİ
// ---------------------------------------------------------------
function VenueSection() {
  return (
    <Reveal delay={0.15} className="w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col gap-3">
        <VenueCard
          label="📍 Kına Gecesi"
          venue="ŞAHANE KINA PARTİ VE DAVET SALONU"
          venueLink="https://www.google.com/maps/place/%C5%9EAHAN-E+S%C3%96Z,+KINA+PART%C4%B0+VE+DAVET+SALONU/@39.7943144,35.1818098,15z/data=!3m1!4b1!4m6!3m5!1s0x407fd3110949c763:0xc991e87623536444!8m2!3d39.7942984!4d35.1920881!16s%2Fg%2F11y7k5j55v?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
        />
        <VenueCard
          label="💍 Düğün Töreni"
          venue="STAR KÜLTÜR MERKEZİ & DÜĞÜN SALONU"
          venueLink="https://www.google.com/maps/place/STAR+K%C3%9CLT%C3%9CR+MERKEZ%C4%B0+%26+D%C3%9C%C4%9E%C3%9CN+SALONU+%7C+Memnuniyet+%C3%96d%C3%BCll%C3%BC+D%C3%BC%C4%9F%C3%BCn+Salonu+%F0%9F%8E%96%EF%B8%8F/@39.8042915,35.2091987,17z/data=!3m1!4b1!4m6!3m5!1s0x407fd316c4ebfce3:0xddcd9c60a2491523!8m2!3d39.8042874!4d35.2117736!16s%2Fg%2F11gv0cq4js?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
        />
      </div>
    </Reveal>
  );
}

const Header = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
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
        suppressHydrationWarning={true}
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

      <div className="w-full" style={{ background: "#faf4ea" }}>
        {/* ---------------------------------------------------- */}
        {/* KARŞILAMA */}
        {/* ---------------------------------------------------- */}
        <header className="w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 bg-[#faf4ea]">
          <Reveal className="flex flex-col items-center">
            <Image
              src="/12345.png"
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

          {/* TARİHLER */}
          <Reveal delay={0.1} className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <DateCard
                label="Kına Gecesi"
                day="22 Ağustos"
                date="Cumartesi, 2026"
                timeRange="13:00 - 16:00"
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
                timeRange="19:00 - 23:00"
              />
            </div>
          </Reveal>

          {/* MEKAN KARTLARI */}
          <VenueSection />

          <Countdown />

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
            <p className={`${greatVibes.className} text-4xl text-[#9c7a3c]`}>
              Anılarımız
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md">
                <Image
                  src="/foto1.jpeg"
                  alt="Şeyda ve Ahmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md">
                <Image
                  src="/foto5.jpeg"
                  alt="Şeyda ve Ahmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c9a45c]/40 shadow-md">
                <Image
                  src="/foto7.jpeg"
                  alt="Şeyda ve Ahmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------- */}
        {/* KAPANIŞ BÖLÜMÜ / FOOTER - Sizi Bekliyoruz */}
        {/* ---------------------------------------------------- */}
        <section className="relative w-full py-20 flex items-center justify-center overflow-hidden bg-[#0b0a0d]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#0b0a0d]">
              <div className="absolute inset-0 opacity-30">
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(201, 164, 92, 0.15), transparent 70%)",
                  }}
                />
              </div>
            </div>
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

         

            <div className="mt-6 border-t border-[#c9a45c]/20 pt-6">
              <p className={`${playfair.className} text-[10px] text-[#8a7248] tracking-[0.15em] uppercase`}>
                📍 Kına: ŞAHANE KINA PARTİ VE DAVET SALONU · 13:00 - 16:00
              </p>
              <p className={`${playfair.className} text-[10px] text-[#8a7248] tracking-[0.15em] uppercase mt-1`}>
                📍 Düğün: STAR KÜLTÜR MERKEZİ & DÜĞÜN SALONU · 19:00 - 23:00
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------- */}
        {/* FOOTER */}
        {/* ---------------------------------------------------- */}
        <footer className="w-full py-6 text-center bg-[#0b0a0d] border-t border-[#c9a45c]/10">
          <p
            className={`${playfair.className} text-[10px] tracking-[0.3em] uppercase text-[#6a5a48]`}
          >
            22 – 23 Ağustos 2026 · Yozgat, Sorgun
          </p>
        </footer>
      </div>
    </>
  );
};

export default Header;