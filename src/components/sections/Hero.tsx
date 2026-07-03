"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FallingHeroField } from "@/components/sections/FallingHeroField";

// Sfondo hero: carte e fiches brandizzate (col vero emblema del circolo)
// cadono lentamente ai lati, restando sempre dietro logo e nome, che sono
// il fuoco della composizione. Allo scroll, il campo accelera leggermente
// e il contenuto si dissolve, come un mazzo che chiude la mano.
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const d = reduceMotion ? 0 : 1;

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 1 - 0.85 * d]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60 * d]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, 25 * d]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* Campo di carte e fiches brandizzate, in caduta lenta */}
      <FallingHeroField scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />

      {/* Vignettatura: scurisce i bordi e protegge la leggibilità al centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.7)_38%,rgba(10,10,10,0.97)_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent"
      />

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 w-full">
        <Container className="flex flex-col items-center gap-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Alone: anello sottile che ruota lentamente dietro l'emblema */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              style={{ rotate: haloRotate }}
              className="absolute h-52 w-52 sm:h-64 sm:w-64"
            >
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1"
                strokeDasharray="2 10"
                opacity="0.55"
              />
              <circle
                cx="100"
                cy="100"
                r="84"
                fill="none"
                stroke="var(--gold-light)"
                strokeWidth="0.75"
                opacity="0.35"
              />
            </motion.svg>

            <Image
              src="/logo/nettuno-gold-emblem-400.png"
              alt="Emblema Nettuno Gold: Nettuno con tridente in un cerchio dorato"
              width={400}
              height={450}
              priority
              className="relative z-10 h-40 w-auto sm:h-52 drop-shadow-[0_0_50px_rgba(240,199,94,0.35)]"
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
