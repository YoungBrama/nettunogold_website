import { cn } from "@/lib/utils";

// Linea d'arte del tavolo da gioco Nettuno Gold: rotaia, panno e filo oro
// ripresi dal disegno reale del tavolo del circolo. Pensato come texture
// d'atmosfera sullo sfondo delle hero, non come illustrazione letterale:
// va quindi ingrandito e tagliato ai bordi del suo contenitore.
export function PokerTableMotif({
  className,
  preserveAspectRatio = "xMidYMid slice",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={cn("h-full w-full", className)}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden="true"
    >
      {/* Rotaia imbottita */}
      <rect x="40" y="90" width="1520" height="720" rx="360" className="fill-felt-rail" />
      {/* Panno (nero pieno, si fonde con lo sfondo) */}
      <rect x="96" y="146" width="1408" height="608" rx="304" className="fill-background" />
      {/* Filo oro interno, con l'intaglio del tray dealer in alto al centro */}
      <path
        d="
          M 800 178
          H 900
          L 900 130
          L 940 130
          L 940 210
          C 1180 210 1330 260 1330 330
          V 570
          C 1330 640 1180 690 940 690
          H 660
          C 420 690 270 640 270 570
          V 330
          C 270 260 420 210 660 210
          L 660 130
          L 700 130
          L 700 178
          Z
        "
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* Linea del piatto, al centro */}
      <line x1="740" y1="450" x2="860" y2="450" stroke="var(--gold)" strokeWidth="2" opacity="0.45" />

      {/* Emblemi ai due posti dealer, stilizzati */}
      <TableEmblem x={480} y={450} />
      <TableEmblem x={1120} y={450} />
    </svg>
  );
}

function TableEmblem({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.4">
      <circle r="58" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
      <circle r="50" fill="none" stroke="var(--gold)" strokeWidth="1" />
      {/* tridente semplificato */}
      <line x1="0" y1="-38" x2="0" y2="20" stroke="var(--gold)" strokeWidth="1.5" />
      <line x1="-14" y1="-30" x2="-14" y2="-6" stroke="var(--gold)" strokeWidth="1.5" />
      <line x1="14" y1="-30" x2="14" y2="-6" stroke="var(--gold)" strokeWidth="1.5" />
      <path d="M -18 -30 Q 0 -44 18 -30" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
      {/* onde stilizzate alla base */}
      <path d="M -30 24 Q -15 14 0 24 T 30 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <path d="M -26 34 Q -13 26 0 34 T 26 34" fill="none" stroke="var(--gold)" strokeWidth="1" />
    </g>
  );
}
