/**
 * Envelope.jsx
 * ------------------------------------------------------------
 * Sayfa açıldığında görünen ilk sahne: kapalı bir zarf.
 * Kullanıcı scroll ettikçe:
 *  1) Mum mührü kırılır
 *  2) Zarfın kapağı arkaya doğru döner VE aynı anda solar
 *  3) Kapak tamamen kaybolduktan SONRA içindeki davetiye kartı
 *     yukarı kayarak büyür
 *  4) Zarf kaybolur, davetiye tüm ekranı kaplar
 *
 * TAMAMEN RESPONSIVE: tüm boyutlar clamp() / aspect-ratio ile
 * viewport genişliğine göre otomatik ölçekleniyor.
 * ------------------------------------------------------------
 */

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Playfair_Display, Great_Vibes } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

// Çiçek component'leri - Envelope dışında tanımla
const FlowerCorner = ({ position, size = 30 }) => {
  const styleMap = {
    'top-left': { top: -5, left: -5 },
    'top-right': { top: -5, right: -5 },
    'bottom-left': { bottom: -5, left: -5 },
    'bottom-right': { bottom: -5, right: -5 },
  };

  const pos = styleMap[position] || styleMap['top-left'];

  return (
    <div
      className="absolute"
      style={{
        ...pos,
        width: size,
        height: size,
        zIndex: 5,
        opacity: 0.8,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Yapraklar */}
        <ellipse cx="50" cy="20" rx="15" ry="20" fill="#ffb7c5" opacity="0.8" />
        <ellipse cx="30" cy="35" rx="15" ry="20" fill="#ff9cb0" opacity="0.7" transform="rotate(-45, 30, 35)" />
        <ellipse cx="70" cy="35" rx="15" ry="20" fill="#ff9cb0" opacity="0.7" transform="rotate(45, 70, 35)" />
        <ellipse cx="25" cy="60" rx="15" ry="20" fill="#ffb7c5" opacity="0.6" transform="rotate(-20, 25, 60)" />
        <ellipse cx="75" cy="60" rx="15" ry="20" fill="#ffb7c5" opacity="0.6" transform="rotate(20, 75, 60)" />
        
        {/* Çiçek merkezi */}
        <circle cx="50" cy="50" r="12" fill="#ffd1dc" opacity="0.9" />
        <circle cx="50" cy="50" r="6" fill="#ff6b8a" opacity="0.6" />
        
        {/* Küçük detaylar */}
        <circle cx="45" cy="45" r="2" fill="#ff4d6d" opacity="0.4" />
        <circle cx="55" cy="45" r="2" fill="#ff4d6d" opacity="0.4" />
        <circle cx="50" cy="52" r="2" fill="#ff4d6d" opacity="0.4" />
      </svg>
    </div>
  );
};

const SmallFlower = ({ x, y, size = 15 }) => (
  <div
    className="absolute"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      zIndex: 4,
      opacity: 0.5,
      transform: 'translate(-50%, -50%)',
    }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="30" r="15" fill="#ffb7c5" opacity="0.6" />
      <circle cx="30" cy="50" r="15" fill="#ff9cb0" opacity="0.5" />
      <circle cx="70" cy="50" r="15" fill="#ff9cb0" opacity="0.5" />
      <circle cx="40" cy="70" r="15" fill="#ffb7c5" opacity="0.4" />
      <circle cx="60" cy="70" r="15" fill="#ffb7c5" opacity="0.4" />
      <circle cx="50" cy="50" r="10" fill="#ffd1dc" opacity="0.7" />
      <circle cx="50" cy="50" r="5" fill="#ff6b8a" opacity="0.5" />
    </svg>
  </div>
);

export default function Envelope() {
  const sectionRef = useRef(null);
  const envelopeWrapRef = useRef(null);
  const flapRef = useRef(null);
  const sealRef = useRef(null);
  const letterRef = useRef(null);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(letterRef.current, { y: "6%", opacity: 0, scale: 0.88 });
      gsap.set(hintRef.current, { opacity: 1, y: 0 });
      gsap.set(flapRef.current, { opacity: 1, rotateX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(hintRef.current, { opacity: 0, y: -12, duration: 0.15 }, 0)
        .to(
          sealRef.current,
          { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(2)" },
          0.1
        )
        .to(
          flapRef.current,
          { rotateX: -175, duration: 1, ease: "power2.inOut" },
          0.25
        )
        .to(
          flapRef.current,
          { opacity: 0, duration: 0.45, ease: "power1.in" },
          0.65
        )
        .to(
          letterRef.current,
          { y: "-32%", opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0.85
        )
        .to(
          envelopeWrapRef.current,
          { opacity: 0, duration: 0.5, ease: "power1.in" },
          1.55
        )
        .to(
          letterRef.current,
          { scale: 1.2, y: "-55%", duration: 0.6, ease: "power1.inOut" },
          1.55
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #faf4ea 0%, #f2e6d2 55%, #e9d6b6 100%)",
        padding: "clamp(8px, 2vw, 20px)",
      }}
    >
      <div
        style={{
          perspective: "1600px",
          width: "min(100%, 660px)",
          height: "min(100vh, 700px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Zarf ana çerçevesi */}
        <div
          ref={envelopeWrapRef}
          className="relative w-full"
          style={{
            aspectRatio: "10 / 7",
            maxHeight: "min(80vh, 600px)",
            width: "100%",
          }}
        >
          {/* Zarf gövdesi */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(160deg,#fffdf8,#f2e4c9)",
              boxShadow: "0 20px 45px -12px rgba(90,65,20,0.35)",
            }}
          />

          {/* Davetiye kartı - ÇİÇEKLİ KÖŞELER */}
          <div
            ref={letterRef}
            className="absolute left-1/2 flex flex-col items-center justify-center text-center rounded-sm px-5 sm:px-7"
            style={{
              top: "4%",
              width: "80%",
              aspectRatio: "3 / 4",
              transform: "translateX(-50%)",
              background: "#fffdf7",
              border: "1px solid #d8c090",
              boxShadow: "0 10px 30px -8px rgba(90,65,20,0.3)",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Köşe çiçekleri */}
            <FlowerCorner position="top-left" size={30} />
            <FlowerCorner position="top-right" size={30} />
            <FlowerCorner position="bottom-left" size={30} />
            <FlowerCorner position="bottom-right" size={30} />
            
            {/* Kenar çiçek detayları */}
            <SmallFlower x="15%" y="15%" size={12} />
            <SmallFlower x="85%" y="15%" size={12} />
            <SmallFlower x="15%" y="85%" size={12} />
            <SmallFlower x="85%" y="85%" size={12} />
            
            <SmallFlower x="50%" y="8%" size={10} />
            <SmallFlower x="50%" y="92%" size={10} />
            <SmallFlower x="8%" y="50%" size={10} />
            <SmallFlower x="92%" y="50%" size={10} />

            <p
              className={greatVibes.className}
              style={{
                fontSize: "clamp(24px, 6vw, 42px)",
                color: "#9c7a3c",
                lineHeight: 1.15,
                position: "relative",
                zIndex: 6,
              }}
            >
              Şeyda &amp; Ahmet
            </p>
            <div
              style={{
                width: 42,
                height: 1,
                background: "#c9a45c",
                margin: "clamp(10px, 2vw, 18px) 0",
                position: "relative",
                zIndex: 6,
              }}
            />
            <p
              className={playfair.className}
              style={{
                fontSize: "clamp(9px, 2vw, 13px)",
                letterSpacing: 3,
                color: "#7a6440",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 6,
              }}
            >
              Sizi düğünümüze davet ediyoruz
            </p>
          </div>

          {/* Zarfın açılan kapağı */}
          <div
            ref={flapRef}
            className="absolute left-0 top-0 w-full"
            style={{
              height: "50%",
              background: "linear-gradient(160deg,#f8ecd6,#e7d1a5)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              zIndex: 10,
            }}
          >
            {/* Mum mührü - tam ortada */}
            <div
              ref={sealRef}
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: "clamp(60px, 12vw, 80px)",
                height: "clamp(60px, 12vw, 80px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle at 35% 30%, #c14b41, #7c211c)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4), inset 0 -2px 6px rgba(0,0,0,0.2)",
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(10px, 2.5vw, 14px)",
                color: "#f6e6c8",
                letterSpacing: 1,
                fontWeight: 600,
                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                zIndex: 20,
              }}
            >
              Ş &amp; A
            </div>
          </div>

          {/* Kaydırma ipucu */}
          <div
            ref={hintRef}
            className="absolute left-0 right-0 flex justify-center items-center"
            style={{
              bottom: "5%",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            <p
              className={`${playfair.className} text-center`}
              style={{
                fontSize: "clamp(12px, 2.5vw, 18px)",
                letterSpacing: 4,
                color: "#8a7248",
                textTransform: "uppercase",
                width: "100%",
                opacity: 0.9,
                textShadow: "0 2px 8px rgba(255,255,255,0.8), 0 1px 4px rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(2px)",
                padding: "8px 16px",
                borderRadius: "20px",
                display: "inline-block",
                width: "auto",
                margin: "0 auto",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              ⬇ Zarfı açmak için kaydırın ⬇
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}