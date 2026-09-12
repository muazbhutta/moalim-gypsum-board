import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { tajawal } from "@/lib/fonts";
import { localBusiness, webSiteLd } from "@/lib/jsonld";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { StickyCallBar } from "./StickyCallBar";

/** The <html> document shared by both root layouts; only language and direction differ. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getContent(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={tajawal.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {c.ui.skipToContent}
        </a>
        <JsonLd data={[localBusiness(c), webSiteLd(c)]} />
        <Header locale={locale} ui={c.ui} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} ui={c.ui} />
        <StickyCallBar ui={c.ui} />
      </body>
    </html>
  );
}
