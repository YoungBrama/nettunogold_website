import { cn } from "@/lib/utils";

// Stack di fiches (chips) in oro su nero, vista di profilo.
export function ChipStack({ className, count = 5 }: { className?: string; count?: number }) {
  const chips = Array.from({ length: count });
  return (
    <svg viewBox="0 0 120 100" className={cn("h-full w-full", className)} aria-hidden="true">
      {chips.map((_, i) => {
        const y = 84 - i * 13;
        return (
          <g key={i}>
            <ellipse cx="60" cy={y + 6} rx="42" ry="11" fill="var(--background)" stroke="var(--gold-dark)" strokeWidth="1.5" />
            <ellipse cx="60" cy={y} rx="42" ry="11" fill="var(--surface)" stroke="var(--gold)" strokeWidth="1.5" />
            <ellipse cx="60" cy={y} rx="30" ry="7.5" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
            {/* dentelli del bordo */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const ex = 60 + 42 * Math.cos(rad);
              const ey = y + 11 * Math.sin(rad);
              return <circle key={angle} cx={ex} cy={ey} r="1.6" fill="var(--gold-light)" opacity="0.8" />;
            })}
          </g>
        );
      })}
    </svg>
  );
}
