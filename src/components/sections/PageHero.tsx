"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlainCard } from "@/components/motifs/PlainCard";
import { PlainChip } from "@/components/motifs/PlainChip";

type Piece = {
  id: string;
  type: "card" | "chip";
  leftPct: number;
  topPct: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
};

// Posizioni e tempi fissi (non casuali): stesso risultato su server e
// client. Sagome tenute ai bordi, mai al centro dove sta il titolo.
const PIECES: Piece[] = [
  { id: "c1", type: "card", leftPct: 4, topPct: 18, size: 64, duration: 6, delay: 0, drift: -10, rotate: -10 },
  { id: "p1", type: "chip", leftPct: 15, topPct: 68, size: 46, duration: 5.4, delay: 1.2, drift: -8, rotate: 0 },
  { id: "c2", type: "card", leftPct: 90, topPct: 22, size: 56, duration: 6.6, delay: 0.6, drift: -12, rotate: 12 },
  { id: "p2", type: "chip", leftPct: 80, topPct: 72, size: 40, duration: 5.8, delay: 2, drift: -9, rotate: 0 },
  { id: "c3", type: "card", leftPct: 6, topPct: 70, size: 46, duration: 5.6, delay: 2.4, drift: -8, rotate: 14 },
  { id: "p3", type: "chip", leftPct: 94, topPct: 48, size: 36, duration: 6.2, delay: 1.5, drift: -10, rotate: 0 },
];

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const d = reduceMotion ? 0 : 1;
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 50 * d]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border-subtle bg-background py-20 md:py-28">
      <motion.div aria-hidden="true" style={{ y: parallaxY }} className="pointer-events-none absolute inset-0">
        {PIECES.map((piece) => (
          <motion.div
            key={piece.id}
            style={{ left: `${piece.leftPct}%`, top: `${piece.topPct}%`, width: piece.size }}
            className="absolute opacity-[0.22]"
            initial={{ y: 0, rotate: piece.rotate }}
            animate={reduceMotion ? {} : { y: [0, piece.drift, 0], rotate: [piece.rotate, piece.rotate + 4, piece.rotate] }}
            transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {piece.type === "card" ? <PlainCard /> : <PlainChip />}
          </motion.div>
        ))}
      </motion.div>

      <Container className="relative z-10">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </Container>
    </section>
  );
}
