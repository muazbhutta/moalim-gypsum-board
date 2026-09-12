import Link from "next/link";
import type { Locale, Ui } from "@/content/types";
import { breadcrumbLd } from "@/lib/jsonld";
import { localePath } from "@/lib/routes";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

/** Title band for inner pages: breadcrumbs, the single h1, and a short intro. */
export function PageHeader({
  locale,
  ui,
  title,
  intro,
  trail,
}: {
  locale: Locale;
  ui: Ui;
  title: string;
  intro?: string;
  trail: Crumb[];
}) {
  const full = [{ name: ui.breadcrumbHome, path: localePath(locale, "/") }, ...trail.map((t) => ({ ...t, path: localePath(locale, t.path) }))];
  return (
    <header className="relative isolate overflow-hidden border-b border-gold-200/70 bg-gold-50">
      <div aria-hidden="true" className="absolute -top-20 end-10 -z-10 size-64 rounded-full bg-gold-300/25 blur-3xl" />
      <JsonLd data={breadcrumbLd(full)} />
      <div className="container-page py-12 sm:py-16">
        <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}>
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            {full.map((c, i) => {
              const last = i === full.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-bold text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="underline-offset-4 transition-colors hover:text-gold-700 hover:underline">
                        {c.name}
                      </Link>
                      <span aria-hidden="true" className="text-gold-600">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-5 text-[clamp(1.9rem,4.2vw,2.75rem)] leading-tight font-extrabold text-ink">{title}</h1>
        {intro ? <p className="lead mt-5">{intro}</p> : null}
      </div>
    </header>
  );
}
