import { loadRawContent } from "@/lib/content-loader";
import { rankingSchema, type Ranking } from "@/lib/schemas/ranking";

// Nessuna cache in memoria: vedi il commento in src/lib/data/events.ts.
function parseAllRankings(): Ranking[] {
  const rawRankings = loadRawContent("classifiche");

  return rawRankings.map((raw, index) => {
    const result = rankingSchema.safeParse(raw);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  • campo "${issue.path.join(".") || "?"}": ${issue.message}`)
        .join("\n");
      throw new Error(
        `\n\nERRORE nella classifica #${index + 1} in content/classifiche/:\n${details}\n`
      );
    }
    return result.data;
  });
}

export function getRankings(): Ranking[] {
  return parseAllRankings();
}

export function getRankingBySlug(slug: string): Ranking | undefined {
  return parseAllRankings().find((ranking) => ranking.slug === slug);
}
