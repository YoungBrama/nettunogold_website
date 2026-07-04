"use client";

import { motion } from "framer-motion";

type Particle = {
  id: string;
  leftPct: number;
  topPct: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

// Posizioni e tempi fissi (non casuali): stesso risultato su server e
// client, nessun mismatch di idratazione. Particelle raccolte attorno al
// centro (dove sta l'emblema), non sparse su tutta la hero.
const PARTICLES: Particle[] = [
  { id: "p1", leftPct: 50, topPct: 18, size: 3, duration: 5.5, delay: 0, drift: -14 },
  { id: "p2", leftPct: 30, topPct: 30, size: 2, duration: 4.5, delay: 0.6, drift: -10 },
  { id: "p3", leftPct: 68, topPct: 26, size: 2.5, duration: 6, delay: 1.2, drift: -16 },
  { id: "p4", leftPct: 22, topPct: 55, size: 2, duration: 5, delay: 1.8, drift: -8 },
  { id: "p5", leftPct: 78, topPct: 52, size: 3, duration: 4.8, delay: 0.3, drift: -12 },
  { id: "p6", leftPct: 42, topPct: 70, size: 2, duration: 5.8, delay: 2.4, drift: -10 },
  { id: "p7", leftPct: 60, topPct: 74, size: 2.5, duration: 4.2, delay: 0.9, drift: -14 },
  { id: "p8", leftPct: 50, topPct: 42, size: 2, duration: 6.4, delay: 1.5, drift: -9 },
  { id: "p9", leftPct: 16, topPct: 40, size: 2, duration: 5.2, delay: 3, drift: -11 },
  { id: "p10", leftPct: 84, topPct: 34, size: 2, duration: 4.6, delay: 2.1, drift: -13 },
  { id: "p11", leftPct: 36, topPct: 16, size: 2, duration: 5.6, delay: 3.6, drift: -10 },
  { id: "p12", leftPct: 58, topPct: 12, size: 2, duration: 4.9, delay: 0.2, drift: -8 },
  { id: "p13", leftPct: 12, topPct: 66, size: 2.5, duration: 6.2, delay: 1.1, drift: -15 },
  { id: "p14", leftPct: 88, topPct: 64, size: 2, duration: 5.3, delay: 2.7, drift: -9 },
];

export function GoldParticles({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 sm:h-[32rem] sm:w-[32rem]"
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: `${p.leftPct}%`,
            top: `${p.topPct}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1px rgba(240,199,94,0.7)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : { opacity: [0, 0.8, 0], y: [0, p.drift] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
