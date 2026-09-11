import { site } from "@/content/site";
import type { Ui } from "@/content/types";
import { MapPinIcon } from "./Icons";

/** Replaces the old embedded Google Map with a plain link — nothing third-party loads on the page. */
export function ServiceArea({ title, body, ui }: { title: string; body: string; ui: Ui }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-8">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700">
        <MapPinIcon width={28} height={28} />
      </span>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-ink">{title}</h2>
        <p className="mt-1 text-ink-soft">{body}</p>
      </div>
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center rounded-md border-2 border-ink px-5 py-2 font-bold text-ink hover:bg-ink hover:text-white"
      >
        {ui.openMap}
      </a>
    </div>
  );
}
