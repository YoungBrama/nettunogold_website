import { loadRawContent } from "@/lib/content-loader";
import { rankingSchema, type Ranking } from "@/lib/schemas/ranking";

let cachedRankings: Ranking[] | null = null;

function parseAllRankings(): Ranking[] {
  if (cachedRankings) return cachedRankings;

  const rawRankings = loadRawContent("classifiche");

  cachedRankings = rawRankings.map((raw, index) => {
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

  return cachedRankings;
}

export function getRankings(): Ranking[] {
  return parseAllRankings();
}

export function getRankingBySlug(slug: string): Ranking | undefined {
  return parseAllRankings().find((ranking) => ranking.slug === slug);
}
