import { z } from "zod";

// Il widget "number" del pannello CMS, quando lasciato vuoto su un campo
// facoltativo, salva una stringa vuota "" invece di omettere del tutto la
// chiave: senza questo preprocess, un campo numerico facoltativo lasciato
// vuoto fallisce la validazione segnalando "non è un numero" invece di
// essere trattato come non specificato.
export function optionalNumber(schema: z.ZodNumber) {
  return z
    .preprocess((value) => (value === "" ? null : value), schema.nullable())
    .default(null);
}
