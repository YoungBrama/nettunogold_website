import fs from "node:fs";
import path from "node:path";

// Legge tutti i file .json di una cartella di "content/" e ne restituisce
// il contenuto grezzo (non ancora validato). Usata dal layer dati di ogni
// tipo di contenuto (eventi, serie, news, classifiche): non serve più un
// file "index.ts" con l'elenco manuale, ogni file .json nella cartella
// fa parte automaticamente della raccolta — è anche il modo in cui il
// pannello di amministrazione (CMS) legge e scrive i contenuti.
export function loadRawContent(folder: string): unknown[] {
  const dir = path.join(process.cwd(), "content", folder);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".json"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`\n\nERRORE: il file "content/${folder}/${file}" non è un JSON valido.\n`);
    }
  });
}
