"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// Hero statica ma pensata per evolvere: l'emblema e le onde sono elementi
// separati (non un'unica immagine) così in futuro si potrà animarli
// indipendentemente allo scroll (parallax) senza rifare il layout.
export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-background waves-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,162,39,0.14),transparent_60%)]"
      />

      <Container className="relative z-10 flex flex-col items-center gap-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="/logo/nettuno-gold-emblem.png"
            alt="Emblema Nettuno Gold: Nettuno con tridente in un cerchio dorato"
            width={220}
            height={222}
            priority
            className="h-40 w-40 sm:h-52 sm:w-52 drop-shadow-[0_0_40px_rgba(201,162,39,0.25)]"
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
    </section>
  );
}
