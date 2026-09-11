import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Locale, Seo } from "@/content/types";
import { languageAlternates, localePath } from "./routes";

// Open Graph images live in /public/og (1200×630, generated from the client's photos).
export const ogImages = {
  home: "/og/home.jpg",
  about: "/og/about.jpg",
  services: "/og/services.jpg",
  gallery: "/og/gallery.jpg",
  faq: "/og/faq.jpg",
  contact: "/og/contact.jpg",
  blog: "/og/blog.jpg",
  privacy: "/og/legal.jpg",
  terms: "/og/legal.jpg",
  "gypsum-board-decor-makkah": "/og/post-gypsum-board-decor-makkah.jpg",
  "moalim-gypsum-board-makkah": "/og/post-moalim-gypsum-board-makkah.jpg",
} as const;

export type OgKey = keyof typeof ogImages;

type Options = {
  locale: Locale;
  /** Language-neutral path, e.g. "/services". */
  path: string;
  seo: Seo;
  /** Key in ogImages; unknown keys (e.g. a new blog post) fall back to the home image. */
  og: OgKey | (string & {});
  type?: "website" | "article";
  published?: string;
  modified?: string;
};

export function pageMetadata({ locale, path, seo, og, type = "website", published, modified }: Options): Metadata {
  const url = localePath(locale, path);
  const image = { url: ogImages[og as OgKey] ?? ogImages.home, width: 1200, height: 630, alt: seo.title };
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title: seo.title,
      description: seo.description,
      siteName: locale === "ar" ? "معلم جبس بورد مكة" : "Gypsum Board Master Makkah",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [image],
      ...(type === "article" ? { publishedTime: published, modifiedTime: modified } : {}),
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [image.url] },
  };
}

export const metadataBase = new URL(site.url);
