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
    { count: 5, radius: 8, scale: 0.5, rotOffset: 0 },
    { count: 6, radius: 22, scale: 0.7, rotOffset: 25 },
    { count: 7, radius: 42, scale: 0.9, rotOffset: 10 },
    { count: 8, radius: 66, scale: 1.1, rotOffset: 30 },
    { count: 9, radius: 94, scale: 1.3, rotOffset: 5 },
  ];

  const targets = [];
  let z = 0;

  rings.forEach((ring) => {
    const step = 360 / ring.count;
    for (let i = 0; i < ring.count; i++) {
      const angle = i * step + ring.rotOffset;
      const rad = (angle * Math.PI) / 180;
      targets.push({
        x: Math.cos(rad) * ring.radius,
        y: Math.sin(rad) * ring.radius * 0.9,
        rotation: angle + 90,
        scale: ring.scale,
        z: z++,
      });
    }
  });

  return targets;
}

function buildShardConfigs() {
  const targets = buildRoseLayout();
  return targets.map((t) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 160 + Math.random() * 260;
    return {
      ...t,
      scatterX: Math.cos(angle) * dist,
      scatterY: Math.sin(angle) * dist,
      scatterRotation: Math.random() * 360,
    };
  });
}

function petalColor(z, total) {
  const t = z / total;
  const r = Math.round(150 + t * 90);
  const g = Math.round(10 + t * 20);
  const b = Math.round(40 + t * 20);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ScrollRose() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const petalRefs = useRef([]);
  const afterTextRef = useRef(null);
  const subTextRef = useRef(null);

  const shards = useMemo(() => buildShardConfigs(), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const petals = petalRefs.current;

      petals.forEach((el, i) => {
        gsap.set(el, {
          x: shards[i].scatterX,
          y: shards[i].scatterY,
          rotation: shards[i].scatterRotation,
          scale: 0.5,
          opacity: 0.35,
          transformOrigin: "0px 0px",
        });
      });

      gsap.set(afterTextRef.current, { opacity: 0, y: 30 });
      gsap.set(subTextRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
        },
      });

      petals.forEach((el, i) => {
        tl.to(
          el,
          {
            x: shards[i].x,
            y: shards[i].y,
            rotation: shards[i].rotation,
            scale: shards[i].scale,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          i * 0.02
        );
      });

      tl.to(
        svgRef.current,
        { scale: 1.05, duration: 0.4, ease: "power1.inOut" },
        "-=0.3"
      );
      tl.to(
        afterTextRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        "-=0.2"
      );
      tl.to(
        subTextRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        "-=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shards]);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf4ea",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        width={380}
        height={380}
        style={{ transformOrigin: "center center", overflow: "visible" }}
      >
        <g transform={`translate(${CENTER}, ${CENTER})`}>
          {shards.map((s, i) => (
            <path
              key={i}
              ref={(el) => (petalRefs.current[i] = el)}
              d={PETAL_PATH}
              fill={petalColor(s.z, shards.length)}
            />
          ))}
        </g>
      </svg>

      <p
        ref={afterTextRef}
        className={greatVibes.className}
        style={{
          marginTop: 20,
          color: "#9c7a3c",
          fontSize: 56,
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
          fontSize: 13,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Aşkımızın en güzel gününe davetlisiniz
      </p>
    </section>
  );
}