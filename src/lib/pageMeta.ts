import type { Metadata } from "next";
import type { Locale, PageKey } from "@/content/types";
import { getContent } from "./content";
import { pagePaths } from "./routes";
import { pageMetadata } from "./seo";

export function metaFor(locale: Locale, page: PageKey): Metadata {
  return pageMetadata({ locale, path: pagePaths[page], seo: getContent(locale)[page].seo, og: page });
}
