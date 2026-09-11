import { ar } from "@/content/ar";
import { en } from "@/content/en";
import type { Locale, SiteContent } from "@/content/types";

export function getContent(locale: Locale): SiteContent {
  return locale === "ar" ? ar : en;
}
