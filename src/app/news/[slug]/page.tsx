import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNews, getNewsBySlug } from "@/lib/data/news";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt } from "@/lib/utils";

export function generateStaticParams() {
  return getNews().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <div className="py-12 md:py-20">
      <Container className="mx-auto flex max-w-3xl flex-col gap-8">
        <Link
          href="/news"
          className="inline-flex w-fit items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-gold"
        >
          <ArrowLeft size={16} /> Tutte le news
        </Link>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border-subtle">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Badge>{post.category}</Badge>
            <span className="text-xs uppercase tracking-widest text-muted">
              {formatDateIt(post.date)}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-gold-gradient">{post.title}</h1>
        </div>

        <div className="flex flex-col gap-4 text-foreground/85 leading-relaxed">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
