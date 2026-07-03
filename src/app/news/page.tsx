import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/data/news";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News e Risultati",
  description: "Risultati dei tornei, chip count, vincitori e comunicati di Nettuno Gold, Bologna.",
};

export default function NewsPage() {
  const news = getNews();

  return (
    <>
      <PageHero
        eyebrow="Il club"
        title="News &amp; Risultati"
        subtitle="Vincitori, chip count e comunicati direttamente dalla sala."
      />
      <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge className="absolute left-3 top-3">{post.category}</Badge>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-xs uppercase tracking-widest text-muted">
                  {formatDateIt(post.date)}
                </span>
                <h2 className="font-display text-xl text-foreground group-hover:text-gold-light transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      </div>
    </>
  );
}
