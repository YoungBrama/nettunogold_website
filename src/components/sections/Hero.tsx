"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GoldParticles } from "@/components/sections/GoldParticles";

// Hero essenziale: sfondo scuro pieno, un pulviscolo dorato raccolto
// attorno all'emblema, e logo/nome sempre il fuoco assoluto della
// composizione, senza altro a competere con loro.
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

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
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
            <GoldParticles reduceMotion={reduceMotion} />

            <Image
              src="/logo/nettuno-gold-emblem-400.png"
              alt="Emblema Nettuno Gold: Nettuno con tridente in un cerchio dorato"
              width={400}
              height={450}
              priority
              className="relative z-10 h-40 w-auto sm:h-52 drop-shadow-[0_0_40px_rgba(201,162,39,0.25)]"
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
