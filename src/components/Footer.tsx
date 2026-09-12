import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/media";
import type { Locale, Ui } from "@/content/types";
import { pageHref } from "@/lib/routes";
import { ContactList, SocialLinks } from "./ContactCard";

export function Footer({ locale, ui }: { locale: Locale; ui: Ui }) {
  const links = (["about", "services", "gallery", "faq", "contact", "blog"] as const).map((k) => ({ href: pageHref(locale, k), label: ui.nav[k] }));
  const legal = (["privacy", "terms"] as const).map((k) => ({ href: pageHref(locale, k), label: ui.legalNav[k] }));
  const year = new Date().getFullYear();
  const heading = "text-lg font-bold text-gold-300";
  const link = "text-white/85 transition-colors hover:text-gold-300";

  return (
    <footer className="bg-ink pb-20 text-white/85 md:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <span className="inline-block rounded-xl bg-white p-2">
            <Image src={images.logo.src} alt={ui.brand} width={83} height={80} className="h-20 w-auto" />
          </span>
          <h2 className={`mt-5 ${heading}`}>{ui.footerAboutTitle}</h2>
          <p className="mt-2 leading-7">{ui.footerAbout}</p>
        </div>
        <div>
          <h2 className={heading}>{ui.footerContactTitle}</h2>
          <div className="mt-4">
            <ContactList ui={ui} tone="dark" />
          </div>
          <p className="mt-4 text-white/85">{ui.serviceArea}</p>
          <div className="mt-5">
            <SocialLinks ui={ui} tone="dark" />
          </div>
        </div>
        <div>
          <h2 className={heading}>{ui.footerLinksTitle}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {[...links, ...legal].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-5 text-center text-sm text-white/75">{ui.copyright(year)}</p>
      </div>
    </footer>
  );
}
