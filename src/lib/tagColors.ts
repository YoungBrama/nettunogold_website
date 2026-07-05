// Palette di colori per etichettare i tornei nel calendario: stesso
// formato -> sempre lo stesso colore (hash deterministico, non casuale
// a ogni render, per evitare mismatch di idratazione lato server/client).
const TAG_PALETTE = [
  { bg: "bg-amber-400/20", text: "text-amber-300" },
  { bg: "bg-rose-400/20", text: "text-rose-300" },
  { bg: "bg-emerald-400/20", text: "text-emerald-300" },
  { bg: "bg-sky-400/20", text: "text-sky-300" },
  { bg: "bg-violet-400/20", text: "text-violet-300" },
  { bg: "bg-orange-400/20", text: "text-orange-300" },
  { bg: "bg-teal-400/20", text: "text-teal-300" },
  { bg: "bg-fuchsia-400/20", text: "text-fuchsia-300" },
] as const;

export function getTagColorClasses(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return TAG_PALETTE[hash % TAG_PALETTE.length];
}
