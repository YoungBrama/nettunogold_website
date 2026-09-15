import { loadRawContent } from "@/lib/content-loader";
import { newsSchema, type NewsPost } from "@/lib/schemas/news";

let cachedNews: NewsPost[] | null = null;

function parseAllNews(): NewsPost[] {
  if (cachedNews) return cachedNews;

  const rawNews = loadRawContent("news");

  const parsed = rawNews.map((raw, index) => {
    const result = newsSchema.safeParse(raw);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  • campo "${issue.path.join(".") || "?"}": ${issue.message}`)
        .join("\n");
      throw new Error(`\n\nERRORE nella news #${index + 1} in content/news/:\n${details}\n`);
    }
    return result.data;
  });

  cachedNews = parsed.sort((a, b) => b.date.localeCompare(a.date));
  return cachedNews;
}

export function getNews(): NewsPost[] {
  return parseAllNews();
}

export function getLatestNews(limit?: number): NewsPost[] {
  const all = parseAllNews();
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return parseAllNews().find((post) => post.slug === slug);
}
