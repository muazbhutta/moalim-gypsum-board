import type { Locale, PageKey } from "@/content/types";

// One URL per page, identical in both languages; English lives under /en.
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  gallery: "/gallery",
  faq: "/faq",
  contact: "/contact",
  blog: "/blog",
  privacy: "/privacy",
  terms: "/terms",
};

export const locales: Locale[] = ["ar", "en"];

export function localePath(locale: Locale, path: string): string {
  if (locale === "ar") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function pageHref(locale: Locale, page: PageKey): string {
  return localePath(locale, pagePaths[page]);
}

export function postHref(locale: Locale, slug: string): string {
  return localePath(locale, `/blog/${slug}`);
}

/** Path of the same page in the other language. `pathname` is the current URL path. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const base = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return localePath(to, base);
}

/** hreflang map for a language-neutral path, as used by metadata and the sitemap. */
export function languageAlternates(path: string) {
  return {
    "ar-SA": localePath("ar", path),
    en: localePath("en", path),
    "x-default": localePath("ar", path),
  };
}
