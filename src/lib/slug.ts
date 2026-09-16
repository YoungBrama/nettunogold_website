// Genera uno slug leggibile da un testo libero (titolo): minuscolo, senza
// accenti/emoji, solo lettere/numeri separati da trattini.
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // rimuove accenti
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Suffisso "GG-MM" da una data AAAA-MM-GG, usato per distinguere tornei
// con lo stesso titolo in date diverse (es. lo stesso torneo ricorrente
// ogni settimana).
export function dateSlugSuffix(dateISO: string): string {
  const [, month, day] = dateISO.split("-");
  return `${day}-${month}`;
}
