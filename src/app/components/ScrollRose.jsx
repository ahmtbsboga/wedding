/**
 * ScrollRose.jsx
 * ------------------------------------------------------------
 * Zarf açıldıktan sonra gelen bölüm. Scroll ettikçe dağılmış gül
 * yaprakları toplanıp bir gül oluşturur, ardından "Şeyda & Ahmet"
 * ismi belirir.
 * ------------------------------------------------------------
 */

"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Great_Vibes, Playfair_Display } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"] });

const VIEWBOX = 400;
const CENTER = VIEWBOX / 2;

const PETAL_PATH = "M0,0 C-14,-8 -18,-30 0,-48 C18,-30 14,-8 0,0 Z";

function buildRoseLayout() {
  const rings = [
    { count: 6, radius: 5, scale: 0.35, rotOffset: 0 },
    { count: 7, radius: 11, scale: 0.42, rotOffset: 20 },
    { count: 8, radius: 18, scale: 0.50, rotOffset: 10 },
    { count: 9, radius: 26, scale: 0.58, rotOffset: 30 },
    { count: 10, radius: 35, scale: 0.68, rotOffset: 5 },
    { count: 11, radius: 45, scale: 0.78, rotOffset: 25 },
    { count: 12, radius: 56, scale: 0.88, rotOffset: 15 },
    { count: 13, radius: 68, scale: 0.98, rotOffset: 35 },
    { count: 14, radius: 81, scale: 1.08, rotOffset: 8 },
    { count: 15, radius: 95, scale: 1.18, rotOffset: 22 },
    { count: 16, radius: 110, scale: 1.28, rotOffset: 12 },
    { count: 17, radius: 126, scale: 1.38, rotOffset: 32 },
    { count: 18, radius: 143, scale: 1.48, rotOffset: 5 },
    { count: 19, radius: 161, scale: 1.58, rotOffset: 28 },
    { count: 20, radius: 180, scale: 1.68, rotOffset: 15 },
    { count: 21, radius: 200, scale: 1.78, rotOffset: 40 },
  ];

  const targets = [];
  let z = 0;

  rings.forEach((ring) => {
    const step = 360 / ring.count;
    for (let i = 0; i < ring.count; i++) {
      const angle = i * step + ring.rotOffset + (Math.random() * 2 - 1);
      const rad = (angle * Math.PI) / 180;
      const yMultiplier = 0.85 + (Math.random() * 0.15);
      targets.push({
        x: Math.cos(rad) * ring.radius,
        y: Math.sin(rad) * ring.radius * yMultiplier,
        rotation: angle + 90 + (Math.random() * 6 - 3),
        scale: ring.scale * (0.9 + Math.random() * 0.2),
        z: z++,
        tiltX: (Math.random() * 8 - 4),
        tiltY: (Math.random() * 8 - 4),
      });
    }
  });

  return targets;
}

function buildShardConfigs() {
  const targets = buildRoseLayout();
  return targets.map((t, index) => {
    const dist = 150 + Math.random() * 250;
    const angle = Math.random() * Math.PI * 2;
    const scatterX = Math.cos(angle + (index * 0.08)) * dist;
    const scatterY = Math.sin(angle + (index * 0.08)) * dist * 0.8;
    
    return {
      ...t,
      scatterX: scatterX,
      scatterY: scatterY,
      scatterRotation: Math.random() * 720 - 360,
      scatterScale: 0.15 + Math.random() * 0.3,
      scatterOpacity: 0.15 + Math.random() * 0.25,
    };
  });
}

function petalColor(z, total) {
  const t = z / total;
  const r = Math.round(130 + t * 110);
  const g = Math.round(5 + t * 30);
  const b = Math.round(25 + t * 35);
  const variation = Math.sin(z * 1.8) * 10;
  return `rgb(${r + variation}, ${g + variation * 0.5}, ${b + variation * 0.3})`;
}

export default function ScrollRose() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const petalRefs = useRef([]);
  const afterTextRef = useRef(null);
  const subTextRef = useRef(null);
  const containerRef = useRef(null);

  const shards = useMemo(() => buildShardConfigs(), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const petals = petalRefs.current;

      petals.forEach((el, i) => {
        const config = shards[i];
        gsap.set(el, {
          x: config.scatterX,
          y: config.scatterY,
          rotation: config.scatterRotation,
          scale: config.scatterScale,
          opacity: config.scatterOpacity,
          transformOrigin: "0px 0px",
        });
      });

      gsap.set(afterTextRef.current, { opacity: 0, y: 50, scale: 0.7 });
      gsap.set(subTextRef.current, { opacity: 0, y: 40, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1600", // 2800'den 1600'e düşürüldü - DAHA HIZLI
          scrub: 0.8, // 1.2'den 0.8'e düşürüldü - DAHA HIZLI
          pin: true,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "power2.inOut",
        },
      });

      petals.forEach((el, i) => {
        const ringIndex = Math.floor(i / 10);
        const delay = (i * 0.003) + (ringIndex * 0.01); // Gecikme azaltıldı
        const duration = 0.4 + Math.random() * 0.3; // Süre azaltıldı
        
        tl.to(
          el,
          {
            x: shards[i].x,
            y: shards[i].y,
            rotation: shards[i].rotation,
            scale: shards[i].scale,
            opacity: 1,
            duration: duration,
            ease: "power2.out",
          },
          delay
        );
      });

      tl.to(
        svgRef.current,
        {
          scale: 1.12,
          duration: 0.3, // 0.5'ten 0.3'e
          ease: "power1.inOut",
        },
        "-=0.3"
      );

      tl.to(
        svgRef.current,
        {
          scale: 1.07,
          duration: 0.2, // 0.3'ten 0.2'ye
          ease: "power1.inOut",
        },
        "-=0.15"
      );

      tl.to(
        afterTextRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3, // 0.5'ten 0.3'e
          ease: "back.out(2)",
        },
        "-=0.15"
      );

      tl.to(
        subTextRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25, // 0.4'ten 0.25'e
          ease: "back.out(1.8)",
        },
        "-=0.1"
      );

      tl.to(
        svgRef.current,
        {
          y: -4,
          duration: 0.6, // 1'den 0.6'ya
          ease: "sine.inOut",
        },
        "+=0.15"
      ).to(
        svgRef.current,
        {
          y: 0,
          duration: 0.6, // 1'den 0.6'ya
          ease: "sine.inOut",
        },
        "+=0.05"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [shards]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #faf4ea 0%, #f2e6d2 55%, #e9d6b6 100%)",
        padding: "20px",
      }}
    >
      {/* Arka plan gradientleri */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 40%, rgba(201, 164, 92, 0.1), transparent 70%)"
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 70% 60%, rgba(156, 124, 60, 0.08), transparent 60%)"
          }}
        />
      </div>

      {/* Gül SVG */}
      <div
        ref={containerRef}
        className="relative z-10"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          width={340}
          height={340}
          style={{
            transformOrigin: "center center",
            overflow: "visible",
            filter: "drop-shadow(0 15px 40px rgba(156, 124, 60, 0.2))",
          }}
        >
          <g transform={`translate(${CENTER}, ${CENTER})`}>
            {shards.map((s, i) => (
              <path
                key={i}
                ref={(el) => (petalRefs.current[i] = el)}
                d={PETAL_PATH}
                fill={petalColor(s.z, shards.length)}
                style={{
                  transition: "all 0.3s ease",
                  stroke: "rgba(200, 150, 100, 0.05)",
                  strokeWidth: 0.5,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* İsim ve alt yazı */}
      <div className="relative z-10 flex flex-col items-center mt-4">
        <p
          ref={afterTextRef}
          className={greatVibes.className}
          style={{
            color: "#9c7a3c",
            fontSize: "clamp(36px, 8vw, 56px)",
            textShadow: "0 2px 30px rgba(156, 124, 60, 0.2)",
            lineHeight: 1.2,
            letterSpacing: 2,
          }}
        >
          Şeyda &amp; Ahmet
        </p>

        <p
          ref={subTextRef}
          className={playfair.className}
          style={{
            marginTop: 10,
            color: "#7a6440",
            fontSize: "clamp(11px, 2vw, 14px)",
            letterSpacing: 4,
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: "80vw",
            padding: "0 16px",
            opacity: 0.85,
          }}
        >
          Aşkımızın en güzel gününe davetlisiniz
        </p>
      </div>
    </section>
  );
}