"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { BrandedCard } from "@/components/motifs/BrandedCard";
import { ChipStack } from "@/components/motifs/ChipStack";

type Piece = {
  id: string;
  type: "card" | "chip";
  leftPct: number;
  size: number;
  duration: number;
  delay: number;
  rotateFrom: number;
  rotateTo: number;
  opacity: number;
  parallax: number;
};

// Posizioni e tempi fissi (non casuali): evita mismatch di idratazione e
// tiene il campo di carte/fiches lontano dalla colonna centrale, dove
// restano logo e nome del circolo, sempre in primo piano.
const PIECES: Piece[] = [
  { id: "c1", type: "card", leftPct: 5, size: 58, duration: 23, delay: 0, rotateFrom: -18, rotateTo: -6, opacity: 0.24, parallax: 70 },
  { id: "p1", type: "chip", leftPct: 15, size: 40, duration: 17, delay: 4, rotateFrom: 0, rotateTo: 40, opacity: 0.22, parallax: 110 },
  { id: "c2", type: "card", leftPct: 23, size: 46, duration: 27, delay: 10, rotateFrom: 12, rotateTo: 24, opacity: 0.16, parallax: 50 },
  { id: "p2", type: "chip", leftPct: 3, size: 32, duration: 15, delay: 7, rotateFrom: 0, rotateTo: -30, opacity: 0.18, parallax: 130 },
  { id: "c3", type: "card", leftPct: 89, size: 60, duration: 21, delay: 2, rotateFrom: 16, rotateTo: 4, opacity: 0.24, parallax: 80 },
  { id: "p3", type: "chip", leftPct: 80, size: 38, duration: 25, delay: 6, rotateFrom: 0, rotateTo: 35, opacity: 0.2, parallax: 100 },
  { id: "c4", type: "card", leftPct: 74, size: 44, duration: 18, delay: 12, rotateFrom: -10, rotateTo: -22, opacity: 0.16, parallax: 60 },
  { id: "p4", type: "chip", leftPct: 94, size: 30, duration: 22, delay: 9, rotateFrom: 0, rotateTo: -35, opacity: 0.18, parallax: 120 },
];

export function FallingHeroField({
  scrollYProgress,
  reduceMotion,
}: {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PIECES.map((piece) => (
        <FallingPiece key={piece.id} piece={piece} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

function FallingPiece({
  piece,
  scrollYProgress,
  reduceMotion,
}: {
  piece: Piece;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : piece.parallax]);

  return (
    <motion.div
      style={{ left: `${piece.leftPct}%`, width: piece.size, y: parallaxY, opacity: piece.opacity }}
      className="absolute top-0"
    >
      <motion.div
        initial={{ y: "-15vh", rotate: piece.rotateFrom }}
        animate={
          reduceMotion
            ? { y: "45vh", rotate: piece.rotateFrom }
            : { y: ["-15vh", "115vh"], rotate: [piece.rotateFrom, piece.rotateTo] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: piece.duration,
                delay: piece.delay,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {piece.type === "card" ? <BrandedCard /> : <ChipStack />}
      </motion.div>
    </motion.div>
  );
}
