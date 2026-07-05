import { cn } from "@/lib/utils";

// Sagoma di una carta da gioco, puro tratto oro, senza marchio o simboli:
// texture d'atmosfera per gli sfondi, non un elemento di brand.
export function PlainCard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={cn("h-full w-full", className)} aria-hidden="true">
      <rect x="3" y="3" width="94" height="134" rx="10" fill="none" stroke="var(--gold)" strokeWidth="2" />
      <rect x="12" y="12" width="76" height="116" rx="6" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
