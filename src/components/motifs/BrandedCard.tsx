import { cn } from "@/lib/utils";

// Dorso di carta da gioco brandizzato Nettuno Gold: doppia cornice a filo
// oro e monogramma centrale, nello stesso stile inciso del logo.
export function BrandedCard({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="196" height="276" rx="14" className="fill-surface" stroke="var(--gold)" strokeWidth="2" />
      <rect x="14" y="14" width="172" height="252" rx="8" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />

      {/* Monogramma centrale */}
      <g transform="translate(100 140)">
        <rect x="-34" y="-34" width="68" height="68" rx="4" fill="none" stroke="var(--gold)" strokeWidth="1.25" transform="rotate(45)" />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="34"
          fill="var(--gold)"
        >
          N
        </text>
      </g>

      {/* Indici agli angoli */}
      <g fill="var(--gold)" opacity="0.85">
        <text x="20" y="34" fontFamily="var(--font-display)" fontSize="16">NG</text>
        <text x="180" y="258" fontFamily="var(--font-display)" fontSize="16" textAnchor="end" transform="rotate(180 180 258)">NG</text>
      </g>
    </svg>
  );
}
