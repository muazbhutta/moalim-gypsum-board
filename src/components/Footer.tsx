import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/media";
import { site } from "@/content/site";
import type { Locale, Ui } from "@/content/types";
import { pageHref } from "@/lib/routes";
import { ContactList } from "./ContactCard";
import { MapPinIcon } from "./Icons";

export function Footer({ locale, ui }: { locale: Locale; ui: Ui }) {
  const links = (["about", "services", "gallery", "faq", "contact", "blog"] as const).map((k) => ({ href: pageHref(locale, k), label: ui.nav[k] }));
  const legal = (["privacy", "terms"] as const).map((k) => ({ href: pageHref(locale, k), label: ui.legalNav[k] }));
  const heading = "text-base font-bold tracking-wide text-gold-300";
  const link = "text-white/80 transition-colors hover:text-gold-300";

  return (
    <footer className="border-t-4 border-gold-500 bg-ink pb-20 text-white/80 md:pb-0">
      <div className="container-page grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="lg:col-span-1">
          <span className="inline-block rounded-2xl bg-white p-3">
            <Image src={images.logo.src} alt={ui.brand} width={72} height={69} className="h-16 w-auto" />
          </span>
          <p className="mt-5 text-sm leading-7">{ui.footerAbout}</p>
        </div>

        <div>
          <h2 className={heading}>{ui.footerLinksTitle}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{ui.footerContactTitle}</h2>
          <div className="mt-4">
            <ContactList ui={ui} tone="dark" />
          </div>
        </div>

        <div>
          <h2 className={heading}>{ui.nav.gallery}</h2>
          <p className="mt-4 flex items-start gap-2 text-sm leading-7">
            <MapPinIcon className="mt-1 shrink-0 text-gold-300" width={18} height={18} />
            {ui.serviceArea}
          </p>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block text-sm font-bold ${link}`}>
            {ui.openMap}
          </a>
          <ul className="mt-6 space-y-2.5 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-page py-5 text-center text-sm text-white/60">{ui.copyright}</p>
      </div>
    </footer>
  );
}
