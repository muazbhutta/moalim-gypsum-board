import Image from "next/image";
import { images } from "@/content/media";
import { site, whatsappLink } from "@/content/site";
import type { Pic, Ui } from "@/content/types";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Home hero: warm gold wash, headline and lead on one side, a framed project
 * photo on the other, and the three things the business leads on.
 */
export function Hero({ title, body, pic, ui, points }: { title: string; body: string; pic: Pic; ui: Ui; points: string[] }) {
  const photo = images[pic.image];
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 82% 0%, #fdf8ee 0%, #f5e9d2 45%, #edd8ad 100%)" }}
      />
      <div aria-hidden="true" className="absolute -top-24 start-1/4 -z-10 size-72 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="container-page grid items-center gap-12 py-14 sm:py-20 md:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight font-extrabold text-ink">{title}</h1>
          <p className="lead mt-5 text-ink-soft">{body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <WhatsAppIcon />
              {ui.whatsappUs}
            </a>
            <a href={`tel:${site.phone.tel}`} className="btn btn-dark">
              <PhoneIcon />
              {ui.callUs}
            </a>
          </div>

          {points.length ? (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-bold text-ink-soft">
                  <CheckIcon width={18} height={18} className="text-gold-600" />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[1.75rem] border-2 border-gold-500/40 sm:-inset-4" />
          <Image
            src={photo.src}
            alt={pic.alt}
            width={photo.width}
            height={photo.height}
            preload
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw"
            className="aspect-[4/3] h-auto w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
