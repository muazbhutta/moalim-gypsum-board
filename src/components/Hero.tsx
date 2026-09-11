import Image from "next/image";
import { images } from "@/content/media";
import type { Pic, Ui } from "@/content/types";
import { CtaButtons } from "./CtaButtons";

/** Home hero: warm gold band over the old banner photo, headline + intro + WhatsApp/Call, project photo beside it. */
export function Hero({ title, body, pic, ui }: { title: string; body: string; pic: Pic; ui: Ui }) {
  const photo = images[pic.image];
  return (
    <section className="relative isolate overflow-hidden bg-gold-100">
      {/* Warm gold wash, drawn in CSS rather than as an image so it costs nothing to load. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 0%, #fbf3e2 0%, #f3e6c9 45%, #eed7a9 100%)",
        }}
      />
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 md:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <h1 className="text-center text-4xl font-bold text-ink sm:text-5xl md:text-start">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-ink-soft">{body}</p>
          <CtaButtons ui={ui} className="mt-8 justify-center md:justify-start" />
        </div>
        <Image
          src={photo.src}
          alt={pic.alt}
          width={photo.width}
          height={photo.height}
          // Loaded eagerly (it is above the fold) but not preloaded: the LCP element here is the
          // headline text, and a preload link would push that paint later.
          loading="eager"
          sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw"
          className="h-auto w-full rounded-2xl shadow-xl ring-4 ring-white"
        />
      </div>
    </section>
  );
}
