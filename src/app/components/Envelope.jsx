/**
 * Envelope.jsx
 * ------------------------------------------------------------
 * Sayfa açıldığında görünen ilk sahne: kapalı bir zarf.
 * Kullanıcı scroll ettikçe:
 *  1) Mum mührü kırılır
 *  2) Zarfın kapağı arkaya doğru döner VE aynı anda solar
 *     (böylece dönerken yazının üstünde çirkin bir şekilde
 *      "asılı kalmıyor" - yumuşakça kayboluyor)
 *  3) Kapak tamamen kaybolduktan SONRA içindeki davetiye kartı
 *     yukarı kayarak büyür
 *  4) Zarf kaybolur, davetiye tüm ekranı kaplar
 *
 * TAMAMEN RESPONSIVE: tüm boyutlar clamp() / aspect-ratio ile
 * viewport genişliğine göre otomatik ölçekleniyor, mobilde de
 * masaüstünde de orantılı görünüyor.
 *
 * KURULUM: npm install gsap
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

      // 1) İpucu yazısı kaybolur
      tl.to(hintRef.current, { opacity: 0, y: -12, duration: 0.15 }, 0)
        // 2) Mühür kırılır
        .to(
          sealRef.current,
          { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(2)" },
          0.1
        )
        // 3) Kapak arkaya doğru döner
        .to(
          flapRef.current,
          { rotateX: -175, duration: 1, ease: "power2.inOut" },
          0.25
        )
        // 4) Kapak dönerken YUMUŞAKÇA solur -> yazının üstünde asılı kalmaz
        .to(
          flapRef.current,
          { opacity: 0, duration: 0.45, ease: "power1.in" },
          0.65
        )
        // 5) Kapak neredeyse kaybolduktan SONRA davetiye kartı belirir
        .to(
          letterRef.current,
          { y: "-32%", opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0.85
        )
        // 6) Zarf tamamen kaybolur, davetiye büyüyerek ekranı kaplar
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(160deg, #faf4ea 0%, #f2e6d2 55%, #e9d6b6 100%)",
      }}
    >
      <div
        style={{
          perspective: "1600px",
          width: "clamp(280px, 82vw, 460px)",
        }}
      >
        {/* Zarf ana çerçevesi: genişlik responsive, yükseklik aspect-ratio ile orantılı */}
        <div
          ref={envelopeWrapRef}
          className="relative w-full"
          style={{ aspectRatio: "10 / 7" }}
        >
          {/* Zarf gövdesi */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(160deg,#fffdf8,#f2e4c9)",
              border: "1px solid #c9a45c",
              boxShadow: "0 20px 45px -12px rgba(90,65,20,0.35)",
            }}
          />

          {/* Davetiye kartı (zarfın içinden çıkacak) */}
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
            }}
          >
            <p
              className={greatVibes.className}
              style={{
                fontSize: "clamp(28px, 8vw, 42px)",
                color: "#9c7a3c",
                lineHeight: 1.15,
              }}
            >
              Şeyda &amp; Ahmet
            </p>
            <div
              style={{
                width: 42,
                height: 1,
                background: "#c9a45c",
                margin: "clamp(12px, 3vw, 18px) 0",
              }}
            />
            <p
              className={playfair.className}
              style={{
                fontSize: "clamp(10px, 2.6vw, 13px)",
                letterSpacing: 3,
                color: "#7a6440",
                textTransform: "uppercase",
              }}
            >
              Sizi düğünümüze davet ediyoruz
            </p>
          </div>

          {/* Zarfın açılan kapağı (her zaman en üstte render edilir, kapalıyken
              davetiyeyi tamamen örter; açılırken hem döner hem solar) */}
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
            }}
          >
            {/* Mum mührü */}
            <div
              ref={sealRef}
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: "clamp(36px, 9vw, 48px)",
                height: "clamp(36px, 9vw, 48px)",
                left: "50%",
                top: "58%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle at 35% 30%, #c14b41, #7c211c)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(9px, 2.2vw, 11px)",
                color: "#f6e6c8",
                letterSpacing: 1,
              }}
            >
              Ş&amp;A
            </div>
          </div>
        </div>
      </div>

      {/* Kaydırma ipucu */}
      <div
        ref={hintRef}
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 text-center px-4"
      >
        <p
          className={playfair.className}
          style={{
            fontSize: "clamp(10px, 2.6vw, 12px)",
            letterSpacing: 4,
            color: "#8a7248",
            textTransform: "uppercase",
          }}
        >
          Zarfı açmak için kaydırın
        </p>
      </div>
    </section>
  );
}