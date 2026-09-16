import { loadRawContent } from "@/lib/content-loader";
import { seriesSchema, type Series } from "@/lib/schemas/series";

// Nessuna cache in memoria: vedi il commento in src/lib/data/events.ts.
function parseAllSeries(): Series[] {
  const rawSeries = loadRawContent("serie");

  const parsed = rawSeries.map((raw, index) => {
    const result = seriesSchema.safeParse(raw);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  • campo "${issue.path.join(".") || "?"}": ${issue.message}`)
        .join("\n");
      throw new Error(`\n\nERRORE nella serie #${index + 1} in content/serie/:\n${details}\n`);
    }
    return result.data;
  });

  return parsed.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getAllSeries(): Series[] {
  return parseAllSeries();
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return parseAllSeries().find((series) => series.slug === slug);
}
