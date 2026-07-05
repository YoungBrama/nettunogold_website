import { cn } from "@/lib/utils";

// Fiche da gioco, puro tratto oro con bordo dentellato, senza marchio:
// texture d'atmosfera per gli sfondi, non un elemento di brand.
export function PlainChip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("h-full w-full", className)} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold)" strokeWidth="2" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = (50 + 40 * Math.cos(rad)).toFixed(2);
        const y1 = (50 + 40 * Math.sin(rad)).toFixed(2);
        const x2 = (50 + 46 * Math.cos(rad)).toFixed(2);
        const y2 = (50 + 46 * Math.sin(rad)).toFixed(2);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)" strokeWidth="2" />;
      })}
    </svg>
  );
}
