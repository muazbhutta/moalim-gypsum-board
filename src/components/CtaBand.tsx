import { phones } from "@/content/site";
import type { Ui } from "@/content/types";
import { CtaButtons } from "./CtaButtons";

/** Dark closing band: one clear call to action at the end of an inner page. */
export function CtaBand({ ui, title, body }: { ui: Ui; title: string; body: string }) {
  return (
    <section className="bg-ink">
      <div className="container-page section">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <h2 className="h-section text-white">{title}</h2>
          <p className="lead mx-auto mt-4 text-white/80">{body}</p>
          <CtaButtons ui={ui} tone="dark" className="mt-8 justify-center" />
          <p className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} dir="ltr" className="text-lg font-bold text-gold-300 transition-colors hover:text-gold-200">
                {p.display}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
