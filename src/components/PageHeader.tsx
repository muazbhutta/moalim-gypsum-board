import Link from "next/link";
import type { Locale, Ui } from "@/content/types";
import { breadcrumbLd } from "@/lib/jsonld";
import { localePath } from "@/lib/routes";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

/** Title band for inner pages: breadcrumbs (visible + BreadcrumbList JSON-LD), the single h1, and an intro. */
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
  /** Crumbs after "Home"; paths are language-neutral. The last one is the current page. */
  trail: Crumb[];
}) {
  const full = [{ name: ui.breadcrumbHome, path: localePath(locale, "/") }, ...trail.map((t) => ({ ...t, path: localePath(locale, t.path) }))];
  return (
    <header className="border-b border-line bg-gold-50">
      <JsonLd data={breadcrumbLd(full)} />
      <div className="container-page py-10 sm:py-14">
        <nav aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}>
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            {full.map((c, i) => {
              const last = i === full.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="underline-offset-4 hover:text-gold-700 hover:underline">
                        {c.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-3xl text-lg text-ink-soft">{intro}</p> : null}
      </div>
    </header>
  );
}
