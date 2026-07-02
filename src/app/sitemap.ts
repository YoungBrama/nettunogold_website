import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tornei",
    "/il-club",
    "/servizi",
    "/classifiche",
    "/classifiche/regolamento",
    "/news",
    "/contatti",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/tornei" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/tornei" ? 0.9 : 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = getEvents().map((event) => ({
    url: `${SITE_URL}/eventi/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = getNews().map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...eventRoutes, ...newsRoutes];
}
