import type { Faq } from "@/content/types";
import { Blocks } from "./Blocks";
import { ChevronIcon } from "./Icons";

/** Native <details> accordion — works without JavaScript, keyboard accessible, answers stay indexable. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((f, i) => (
        <details key={f.q} data-reveal="fade" className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 hover:bg-gold-50 sm:px-6 [&::-webkit-details-marker]:hidden">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{f.q}</h2>
            <ChevronIcon className="shrink-0 text-gold-700 transition-transform group-open:rotate-180" width={22} height={22} />
          </summary>
          <Blocks blocks={f.a} className="px-5 pb-5 sm:px-6" />
        </details>
      ))}
    </div>
  );
}
