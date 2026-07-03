import Image from "next/image";
import { cn } from "@/lib/utils";

// Fiche da gioco brandizzata: bordo dentellato oro e il vero emblema
// Nettuno Gold impresso al centro, come una vera fiche del circolo.
export function ChipStack({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="var(--surface)" stroke="var(--gold)" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          const rad = (angle * Math.PI) / 180;
          // Arrotondato a 2 decimali: i motori JS possono calcolare seno/coseno
          // con un'ultima cifra binaria diversa tra loro, causando mismatch di
          // idratazione se il valore grezzo finisce negli attributi SVG.
          const x1 = (50 + 41 * Math.cos(rad)).toFixed(2);
          const y1 = (50 + 41 * Math.sin(rad)).toFixed(2);
          const x2 = (50 + 47 * Math.cos(rad)).toFixed(2);
          const y2 = (50 + 47 * Math.sin(rad)).toFixed(2);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--gold-light)"
              strokeWidth="3"
              opacity="0.85"
            />
          );
        })}
        <circle cx="50" cy="50" r="34" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
      </svg>
      <div className="absolute inset-[26%] flex items-center justify-center">
        <Image
          src="/logo/nettuno-gold-emblem-180.png"
          alt=""
          width={180}
          height={202}
          className="h-full w-auto object-contain opacity-95"
        />
      </div>
    </div>
  );
}
