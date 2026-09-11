"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { switchLocalePath } from "@/lib/routes";
import { CloseIcon, MenuIcon } from "./Icons";

type Item = { href: string; label: string };
type Labels = { nav: string; open: string; close: string; switchText: string; switchLabel: string };

const linkBase = "rounded-md font-medium transition-colors hover:text-gold-700 aria-[current=page]:text-gold-700";

export function NavMenu({ items, locale, labels }: { items: Item[]; locale: Locale; labels: Labels }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = switchLocalePath(pathname, other);
  const home = items[0]?.href;
  const isActive = (href: string) => href === pathname || (href !== home && pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav aria-label={labels.nav} className="hidden flex-1 justify-center lg:flex">
        <ul className="flex items-center gap-1 xl:gap-2">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} aria-current={isActive(i.href) ? "page" : undefined} className={`${linkBase} px-3 py-2 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8`}>
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={switchHref}
        hrefLang={other}
        lang={other}
        aria-label={labels.switchLabel}
        className="hidden rounded-md border border-line px-3 py-2 text-sm font-bold text-ink hover:border-gold-500 hover:text-gold-700 lg:inline-flex"
      >
        {labels.switchText}
      </a>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-md border-2 border-gold-500 text-gold-700 lg:hidden"
      >
        {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>

      <div id="mobile-menu" hidden={!open} className="absolute inset-x-0 top-full border-b-2 border-gold-500 bg-white shadow-lg lg:hidden">
        <nav aria-label={labels.nav}>
          <ul className="container-page divide-y divide-line py-2">
            {items.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(i.href) ? "page" : undefined}
                  className={`${linkBase} block px-2 py-3 text-lg`}
                >
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={switchHref} hrefLang={other} lang={other} className={`${linkBase} block px-2 py-3 text-lg font-bold`}>
                {labels.switchText}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
