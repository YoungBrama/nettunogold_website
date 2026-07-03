"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PokerTableMotif } from "@/components/motifs/PokerTableMotif";
import { BrandedCard } from "@/components/motifs/BrandedCard";
import { ChipStack } from "@/components/motifs/ChipStack";

// La hero mette in scena il tavolo verde... nero e oro: il panno del
// circolo (rif. disegno tavolo reale) come sfondo atmosferico, con carte
// e fiches brandizzate ai bordi. Allo scroll il tavolo si allontana in
// parallasse, le carte vengono "spazzate via" e il contenuto si dissolve
// dolcemente, come un mazzo che chiude la mano.
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const d = reduceMotion ? 0 : 1;

  const tableY = useTransform(scrollYProgress, [0, 1], [0, 140 * d]);
  const tableScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.12 * d]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 1 - 0.85 * d]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60 * d]);

  const cardTopLeftY = useTransform(scrollYProgress, [0, 1], [0, -180 * d]);
  const cardTopLeftRotate = useTransform(scrollYProgress, [0, 1], [-14, -46 * d - 14]);
  const cardTopRightY = useTransform(scrollYProgress, [0, 1], [0, -220 * d]);
  const cardTopRightRotate = useTransform(scrollYProgress, [0, 1], [12, 12 + 50 * d]);
  const chipLeftY = useTransform(scrollYProgress, [0, 1], [0, 160 * d]);
  const chipRightY = useTransform(scrollYProgress, [0, 1], [0, 190 * d]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* Panno del tavolo: texture d'atmosfera, ingrandita e tagliata ai bordi */}
      <motion.div
        aria-hidden="true"
        style={{ y: tableY, scale: tableScale }}
        className="pointer-events-none absolute inset-[-12%] opacity-[0.4] sm:opacity-[0.5]"
      >
        <PokerTableMotif />
      </motion.div>

      {/* Vignettatura per leggibilità del contenuto sopra il tavolo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(10,10,10,0.35),rgba(10,10,10,0.92)_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent"
      />

      {/* Carte brandizzate, in bilico sul bordo del tavolo */}
      <motion.div
        aria-hidden="true"
        style={{ y: cardTopLeftY, rotate: cardTopLeftRotate }}
        className="pointer-events-none absolute left-[4%] top-[14%] hidden w-20 opacity-70 sm:block md:w-24 lg:left-[8%]"
      >
        <BrandedCard />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ y: cardTopRightY, rotate: cardTopRightRotate }}
        className="pointer-events-none absolute right-[5%] top-[20%] hidden w-16 opacity-60 sm:block md:w-20 lg:right-[10%]"
      >
        <BrandedCard />
      </motion.div>

      {/* Fiches, appoggiate ai bordi inferiori */}
      <motion.div
        aria-hidden="true"
        style={{ y: chipLeftY }}
        className="pointer-events-none absolute bottom-[8%] left-[6%] hidden w-16 opacity-60 md:block lg:left-[11%] lg:w-20"
      >
        <ChipStack />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ y: chipRightY }}
        className="pointer-events-none absolute bottom-[10%] right-[4%] hidden w-14 opacity-50 md:block lg:right-[9%] lg:w-[4.5rem]"
      >
        <ChipStack count={4} />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 w-full">
        <Container className="flex flex-col items-center gap-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/logo/nettuno-gold-emblem-400.png"
              alt="Emblema Nettuno Gold: Nettuno con tridente in un cerchio dorato"
              width={400}
              height={450}
              priority
              className="h-40 w-auto sm:h-52 drop-shadow-[0_0_40px_rgba(201,162,39,0.25)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wide text-gold-gradient">
              NETTUNO GOLD
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-muted">
              Poker Room · Bologna
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="max-w-xl text-base sm:text-lg text-foreground/85"
          >
            Dal 2007, il punto di riferimento del Texas Hold&apos;em a Bologna: 18 tavoli,
            staff professionale e quasi 150 tornei all&apos;anno.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/tornei" size="lg">
              Calendario tornei
            </Button>
            <Button href="/contatti" variant="secondary" size="lg">
              Come raggiungerci
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      {/* Indicatore di scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-gold/40 p-1.5">
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
