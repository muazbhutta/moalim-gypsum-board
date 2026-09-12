import { images, videos, type VideoKey } from "@/content/media";
import { phones, site } from "@/content/site";
import type { Faq, ListItem, Locale, Post, Service, SiteContent } from "@/content/types";
import { localePath } from "./routes";

// Structured data. Only facts that are actually known are included — no ratings,
// reviews, street address or opening hours (none of these were published by the client).

const abs = (path: string) => new URL(path, site.url).toString();
export const businessId = `${site.url}/#business`;

const city = (locale: Locale) => ({ "@type": "City", name: locale === "ar" ? "مكة المكرمة" : "Makkah" });

export function localBusiness(c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: c.ui.brand,
    alternateName: c.locale === "ar" ? ["جبس ديكور مكة", "Gypsum Board Master Makkah"] : ["Gypsum Decor Makkah", "معلم جبس بورد مكة"],
    description: c.home.seo.description,
    url: abs(localePath(c.locale, "/")),
    logo: abs(images.logo.original),
    image: [abs(images["gallery-bedroom-decor"].original), abs(images.logo.original)],
    telephone: site.phone.tel,
    ...(phones.length > 1 ? { contactPoint: phones.map((p) => ({ "@type": "ContactPoint", telephone: p.tel, contactType: "customer service" })) } : {}),
    ...(site.email ? { email: site.email } : {}),
    areaServed: city(c.locale),
    address: { "@type": "PostalAddress", addressLocality: "مكة المكرمة", addressCountry: "SA" },
    sameAs: [site.social.facebook, site.social.tiktok],
    inLanguage: c.locale === "ar" ? "ar-SA" : "en",
  };
}

export function webSiteLd(c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: abs(localePath(c.locale, "/")),
    name: c.ui.brand,
    inLanguage: c.locale === "ar" ? "ar-SA" : "en",
    publisher: { "@id": businessId },
  };
}

export function serviceLd(locale: Locale, s: Service, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(localePath(locale, pagePath))}#${s.id}`,
    name: s.schemaName,
    serviceType: s.schemaName,
    description: s.body,
    image: abs(images[s.pic.image].original),
    provider: { "@id": businessId },
    areaServed: city(locale),
    url: `${abs(localePath(locale, pagePath))}#${s.id}`,
  };
}

const listText = (i: ListItem) => (typeof i === "string" ? i : `${i.label}: ${i.text}`);

export function faqLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/^[\d٠-٩]+\.\s*/, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
          .map((b) => (b.type === "p" ? b.text : b.type === "ul" || b.type === "ol" ? b.items.map(listText).join(" • ") : ""))
          .filter(Boolean)
          .join(" "),
      },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function videoLd(key: VideoKey, name: string, description: string) {
  const v = videos[key];
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [abs(v.poster)],
    contentUrl: abs(v.src),
    uploadDate: `${v.uploaded}T12:00:00+03:00`,
    duration: `PT${Math.round(v.duration)}S`,
    width: v.width,
    height: v.height,
  };
}

export function blogPostingLd(locale: Locale, post: Post) {
  const url = abs(localePath(locale, `/blog/${post.slug}`));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    image: abs(images[post.pic.image].original),
    datePublished: `${post.datePublished}T12:00:00+03:00`,
    dateModified: `${post.dateModified}T12:00:00+03:00`,
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    mainEntityOfPage: url,
    url,
    author: { "@id": businessId },
    publisher: { "@id": businessId },
  };
}
