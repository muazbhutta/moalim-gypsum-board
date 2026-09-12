import type { MetadataRoute } from "next";
import { ar } from "@/content/ar";
import { site } from "@/content/site";
import { languageAlternates, localePath, locales, pagePaths } from "@/lib/routes";

const abs = (path: string) => new URL(path, site.url).toString();

/** Pages are static, so "last modified" is the build date. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// Every page in both languages, each entry listing its hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { path: string; lastModified: string; priority: number }[] = [
    ...Object.entries(pagePaths).map(([key, path]) => ({
      path,
      lastModified: BUILD_DATE,
      priority: key === "home" ? 1 : key === "privacy" || key === "terms" ? 0.3 : 0.8,
    })),
    ...ar.posts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.dateModified, priority: 0.6 })),
  ];

  return entries.flatMap((e) =>
    locales.map((locale) => ({
      url: abs(localePath(locale, e.path)),
      lastModified: e.lastModified,
      priority: e.priority,
      alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(e.path)).map(([k, v]) => [k, abs(v)])) },
    })),
  );
}
