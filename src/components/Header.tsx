import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/media";
import { site } from "@/content/site";
import type { Locale, Ui } from "@/content/types";
import { pageHref } from "@/lib/routes";
import { PhoneIcon } from "./Icons";
import { NavMenu } from "./NavMenu";

export function Header({ locale, ui }: { locale: Locale; ui: Ui }) {
  const order = ["home", "about", "services", "gallery", "faq", "contact", "blog"] as const;
  const items = order.map((k) => ({ href: pageHref(locale, k), label: ui.nav[k] }));
  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold-500 bg-white">
      <div className="container-page relative flex h-18 items-center gap-3">
        <Link href={pageHref(locale, "home")} className="me-auto shrink-0 lg:me-0">
          <Image src={images.logo.src} alt={ui.brand} width={60} height={58} className="h-14 w-auto" preload />
        </Link>
        <NavMenu
          items={items}
          locale={locale}
          labels={{ nav: locale === "ar" ? "القائمة الرئيسية" : "Main menu", open: ui.menuOpen, close: ui.menuClose, switchText: ui.switchLanguage, switchLabel: ui.switchLanguageLabel }}
        />
        <a
          href={`tel:${site.phone.tel}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-ink-soft sm:text-base"
        >
          <PhoneIcon width={18} height={18} />
          {ui.callUs}
        </a>
      </div>
    </header>
  );
}
