"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PokerTableMotif } from "@/components/motifs/PokerTableMotif";

// Variante quieta della hero: lo stesso panno da gioco della Home, qui
// solo come scorcio d'atmosfera in un angolo, con una parallasse leggera.
// Usata in testa alle pagine secondarie per dare continuità visiva senza
// ripetere l'elaborazione della hero principale.
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
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const d = reduceMotion ? 0 : 1;
  const motifY = useTransform(scrollYProgress, [0, 1], [0, 90 * d]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border-subtle bg-background py-20 md:py-28">
      <motion.div
        aria-hidden="true"
        style={{ y: motifY }}
        className="pointer-events-none absolute -right-[10%] top-1/2 h-[170%] w-[65%] -translate-y-1/2 opacity-[0.3] sm:w-[45%]"
      >
        <PokerTableMotif preserveAspectRatio="xMaxYMid slice" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.97)_0%,rgba(10,10,10,0.75)_45%,rgba(10,10,10,0.4)_100%)]"
      />

      <Container className="relative z-10">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </Container>
    </section>
  );
}
