import Image from "next/image";
import { cn } from "@/lib/utils";

// Dorso di carta da gioco brandizzato: il vero emblema Nettuno Gold
// stampato al centro, con doppia cornice a filo oro.
export function BrandedCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full rounded-[10%] border border-gold/80 bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div className="absolute inset-[6%] rounded-[8%] border border-gold/35" />
      <div className="absolute inset-0 flex items-center justify-center p-[18%]">
        <Image
          src="/logo/nettuno-gold-emblem-180.png"
          alt=""
          width={180}
          height={202}
          className="h-auto w-full opacity-95"
        />
      </div>
    </div>
  );
}
