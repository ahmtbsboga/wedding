'use client'
import React from 'react'
// import GiftTracker from './GiftTracker'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Countdown from './Countdown'
import PhotoUploadCard from './PhotoUploadCard'


const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

// Kose susu: daha belirgin, dallı ve cicekli SVG
const FloralCorner = ({ className }) => (
  <svg
    viewBox="0 0 140 140"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ana dal */}
    <path
      d="M8 8 C 30 8, 25 40, 50 42 C 75 44, 70 12, 95 18"
      stroke="rgba(253, 230, 138, 0.65)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Ikinci alt dal */}
    <path
      d="M8 8 C 8 35, 40 28, 42 55 C 44 75, 20 70, 22 95"
      stroke="rgba(253, 230, 138, 0.45)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Uc dal */}
    <path
      d="M50 42 C 60 50, 55 65, 68 68"
      stroke="rgba(253, 230, 138, 0.4)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Yapraklar */}
    <ellipse cx="35" cy="20" rx="7" ry="3.5" fill="rgba(180, 210, 160, 0.5)" transform="rotate(-30 35 20)" />
    <ellipse cx="60" cy="30" rx="6" ry="3" fill="rgba(180, 210, 160, 0.45)" transform="rotate(20 60 30)" />
    <ellipse cx="18" cy="55" rx="6" ry="3" fill="rgba(180, 210, 160, 0.4)" transform="rotate(70 18 55)" />
    <ellipse cx="35" cy="70" rx="5.5" ry="2.8" fill="rgba(180, 210, 160, 0.4)" transform="rotate(100 35 70)" />

    {/* Buyuk cicek (ana) */}
    <g transform="translate(50 42)">
      <circle cx="0" cy="-8" r="5" fill="rgba(253, 230, 138, 0.55)" />
      <circle cx="7" cy="-3" r="5" fill="rgba(253, 230, 138, 0.55)" />
      <circle cx="4" cy="6" r="5" fill="rgba(253, 230, 138, 0.55)" />
      <circle cx="-4" cy="6" r="5" fill="rgba(253, 230, 138, 0.55)" />
      <circle cx="-7" cy="-3" r="5" fill="rgba(253, 230, 138, 0.55)" />
      <circle cx="0" cy="0" r="4" fill="rgba(253, 245, 200, 0.8)" />
    </g>

    {/* Kucuk cicek 1 */}
    <g transform="translate(95 18)">
      <circle cx="0" cy="-4" r="3" fill="rgba(253, 230, 138, 0.5)" />
      <circle cx="3.5" cy="-1" r="3" fill="rgba(253, 230, 138, 0.5)" />
      <circle cx="2" cy="3.5" r="3" fill="rgba(253, 230, 138, 0.5)" />
      <circle cx="-2" cy="3.5" r="3" fill="rgba(253, 230, 138, 0.5)" />
      <circle cx="-3.5" cy="-1" r="3" fill="rgba(253, 230, 138, 0.5)" />
      <circle cx="0" cy="0" r="2.2" fill="rgba(253, 245, 200, 0.75)" />
    </g>

    {/* Kucuk cicek 2 */}
    <g transform="translate(22 95)">
      <circle cx="0" cy="-3.5" r="2.5" fill="rgba(253, 230, 138, 0.45)" />
      <circle cx="3" cy="-1" r="2.5" fill="rgba(253, 230, 138, 0.45)" />
      <circle cx="1.8" cy="3" r="2.5" fill="rgba(253, 230, 138, 0.45)" />
      <circle cx="-1.8" cy="3" r="2.5" fill="rgba(253, 230, 138, 0.45)" />
      <circle cx="-3" cy="-1" r="2.5" fill="rgba(253, 230, 138, 0.45)" />
      <circle cx="0" cy="0" r="1.8" fill="rgba(253, 245, 200, 0.7)" />
    </g>

    {/* Uc noktasindaki minik tomurcuk */}
    <circle cx="68" cy="68" r="3" fill="rgba(253, 230, 138, 0.4)" />

    {/* Kose baslangicindaki minik noktalar */}
    <circle cx="8" cy="8" r="2.5" fill="rgba(253, 230, 138, 0.5)" />
  </svg>
)

const CardFlorals = () => (
  <>
    <FloralCorner className="absolute top-0 left-0 w-24 h-24 md:w-28 md:h-28 pointer-events-none opacity-90" />
    <FloralCorner className="absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 pointer-events-none opacity-90 rotate-90" />
    <FloralCorner className="absolute bottom-0 right-0 w-24 h-24 md:w-28 md:h-28 pointer-events-none opacity-90 rotate-180" />
    <FloralCorner className="absolute bottom-0 left-0 w-24 h-24 md:w-28 md:h-28 pointer-events-none opacity-90 -rotate-90" />
  </>
)


const Card = () => {
  return (
    <div className=' px-4 py-16 gap-8 flex flex-col items-center justify-center min-h-screen'>
        {/* Icerik */}
      

        {/* Kart 1: Baslik */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden w-full max-w-md rounded-4xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-12 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
        >
          <CardFlorals />

          <p className="relative uppercase tracking-[0.3em] text-sm text-yellow-100/80 mb-4">
            Düğünümüze Davetlisiniz
          </p>

          <h1 className="relative font-serif text-4xl md:text-5xl mb-2 drop-shadow-md text-yellow-50">
            Şeyda & Ahmet
          </h1>

          <div className="relative w-full h-px bg-yellow-100/40 mx-auto my-6" />

          <p className="relative text-lg mb-1">23 Ağustos 2026</p>
          <p className="relative text-yellow-100/70 mb-8">Pazar, saat 19:00</p>

          <div className="relative space-y-1 mb-10 text-sm text-yellow-50/90">
            <p className="font-medium text-base">Star Düğün Salonu</p>
            <p>Sorgun, Yozgat</p>
          </div>

          <Link
  href="https://www.google.com/maps/place/STAR+K%C3%9CLT%C3%9CR+MERKEZ%C4%B0+%26+D%C3%9C%C4%9E%C3%9CN+SALONU+%7C+Memnuniyet+%C3%96d%C3%BCll%C3%BC+D%C3%BC%C4%9F%C3%BCn+Salonu+%F0%9F%8E%96%EF%B8%8F/@39.8044962,35.2117133,351m/data=!3m1!1e3!4m6!3m5!1s0x407fd316c4ebfce3:0xddcd9c60a2491523!8m2!3d39.8042874!4d35.2117736!16s%2Fg%2F11gv0cq4js"
  target="_blank"
  rel="noopener noreferrer"
  className="relative inline-block rounded-full border border-yellow-100/40 px-6 py-2 text-sm hover:bg-yellow-600 transition"
>
  Konumu Görüntüle
</Link>
        </motion.div>

        {/* Kart: Kına Gecesi */}
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
>
  <CardFlorals />

  <p className="relative uppercase tracking-[0.3em] text-xs text-yellow-100/80 mb-2">
    Kına Gecesi
  </p>

  <h2 className="relative font-serif text-2xl mb-4 text-yellow-50">
    Kınaya Bekliyoruz
  </h2>

  <div className="relative w-16 h-px bg-yellow-100/40 mx-auto my-4" />

  <p className="relative text-lg mb-1">22 Ağustos 2026</p>
  <p className="relative text-yellow-100/70 mb-6">Cumartesi, 13:00 - 16:00</p>

  <div className="relative space-y-1 mb-4 text-sm text-yellow-50/90">
    <p className="font-medium text-base">Şahane Düğün Salonu</p>
  </div>

  <p className="relative inline-block rounded-full border border-yellow-100/40 px-4 py-1.5 text-xs text-yellow-100/90">
    Sadece Hanımlara Özeldir
  </p>
</motion.div>

        {/* Kart 2: Geri Sayim */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-w-md"
        >
          <Countdown />
        </motion.div>

        {/* Kart 3: Program Akisi */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
        >
          <CardFlorals />

          <h2 className="relative font-serif text-2xl mb-6 text-yellow-50">Günün Programı</h2>
          <div className="relative space-y-4 text-left text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-yellow-100/70">18:00</span>
              <span>Düğün Konvoyu</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-yellow-100/70">19:00</span>
              <span>Düğün Başlangıcı</span>
            </div>
          </div>
        </motion.div>


{/* Kart 4: Fotograf Galerisi */}
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
>
  <CardFlorals />

  <h2 className="relative font-serif text-2xl mb-6 text-yellow-50">Anılarımızdan</h2>
  <div className="relative grid grid-cols-2 gap-3">
    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
      <Image
        src="/foto1.jpeg"
        alt="Anilarimizdan 1"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
      />
    </div>
    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
      <Image
        src="/foto3.jpeg"
        alt="Anilarimizdan 2"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
      />
    </div>
    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
      <Image
        src="/foto4.jpeg"
        alt="Anilarimizdan 3"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
      />
    </div>
    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
      <Image
        src="/foto7.jpeg"
        alt="Anilarimizdan 4"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
      />
    </div>
  </div>
</motion.div>

      {/* Kart 5: Hediye Takibi */}
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="w-full max-w-md"
>
  {/* <GiftTracker /> */}
</motion.div>

        {/* Kart 6: Katilim Bildirimi */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
        >
          <CardFlorals />
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="w-full max-w-md"
>
  <PhotoUploadCard />
</motion.div>
        </motion.div>

      </div>
   
  )
}

export default Card
