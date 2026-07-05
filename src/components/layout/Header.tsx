"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "./nav-links";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-nettuno flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Nettuno Gold, torna alla home">
          <Image
            src="/logo/nettuno-gold-emblem-180.png"
            alt="Emblema Nettuno Gold"
            width={180}
            height={202}
            className="h-11 w-auto md:h-12"
            priority
          />
          <span className="font-display text-xl md:text-2xl tracking-wide text-gold-gradient">
            NETTUNO GOLD
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-widest transition-colors hover:text-gold",
                  active ? "text-gold" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/tornei" size="sm">
            Calendario tornei
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden flex h-11 w-11 items-center justify-center text-gold"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border-subtle bg-background"
          >
            <nav className="container-nettuno flex flex-col py-4">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "min-h-[44px] flex items-center text-base uppercase tracking-widest border-b border-border-subtle/60 last:border-none",
                      active ? "text-gold" : "text-foreground/85"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button href="/tornei" className="mt-4 w-full">
                Calendario tornei
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
