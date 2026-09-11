import Link from "next/link";
import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { serviceLd, videoLd } from "@/lib/jsonld";
import { pageHref } from "@/lib/routes";
import { ContactCard } from "../ContactCard";
import { ContactForm } from "../ContactForm";
import { GalleryTiles } from "../GalleryTiles";
import { Hero } from "../Hero";
import { ArrowIcon } from "../Icons";
import { JsonLd } from "../JsonLd";
import { ServiceArea } from "../ServiceArea";
import { ServiceCard } from "../ServiceCard";
import { SplitSection } from "../SplitSection";
import { VideoTiles } from "../VideoTiles";

export function HomePage({ locale }: { locale: Locale }) {
  const { ui, home: h, contact } = getContent(locale);
  const allServices = [...h.plainGypsum, ...h.services, ...h.moreServices];

  return (
    <>
      <JsonLd data={[...allServices.map((s) => serviceLd(locale, s, "/")), ...h.videos.items.map((v) => videoLd(v.video, v.title, v.description))]} />

      <Hero title={h.hero.title} body={h.hero.body} pic={h.hero.pic} ui={ui} />
      <SplitSection title={h.intro.title} paragraphs={h.intro.paragraphs} pic={h.intro.pic} ui={ui} />
      <SplitSection title={h.pakistani.title} paragraphs={[h.pakistani.body]} pic={h.pakistani.pic} ui={ui} flip tone="gold" />

      <section aria-labelledby="services-title" className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-title" className="text-3xl font-bold text-ink sm:text-4xl">
              {h.servicesIntro.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-soft">{h.servicesIntro.body}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {h.plainGypsum.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {h.services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {h.moreServices.map((s) => (
              <ServiceCard key={s.id} service={s} sizes="(min-width: 1152px) 360px, (min-width: 768px) 30vw, 92vw" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="bg-ink text-white">
        <div className="container-page py-14 text-center sm:py-16">
          <h2 id="team-title" className="text-3xl font-bold text-gold-300">
            {h.team.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/90">{h.team.body}</p>
        </div>
      </section>

      <section aria-labelledby="work-title" className="bg-gold-50">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="work-title" className="text-3xl font-bold text-ink sm:text-4xl">
              {h.work.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-soft">{h.work.body}</p>
          </div>
          <div className="mt-10">
            <GalleryTiles items={h.work.items} href={pageHref(locale, "gallery")} />
          </div>
          <div className="mt-8 text-center">
            <Link href={pageHref(locale, "gallery")} className="inline-flex items-center gap-2 font-bold text-gold-700 underline-offset-8 hover:underline">
              {ui.seeAllWork}
              <ArrowIcon className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="videos-title" className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <h2 id="videos-title" className="text-center text-3xl font-bold text-ink sm:text-4xl">
            {h.videos.title}
          </h2>
          <div className="mt-10">
            <VideoTiles items={h.videos.items} href={pageHref(locale, "gallery")} playLabel={ui.playVideo} />
          </div>
        </div>
      </section>

      <section aria-label={h.contact.title} className="bg-white pb-16 sm:pb-20">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <ContactCard title={h.contact.title} body={h.contact.body} ui={ui} />
          <div className="rounded-2xl border border-line p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-ink">{contact.formTitle}</h2>
            <ContactForm text={ui.form} />
          </div>
          <div className="lg:col-span-2">
            <ServiceArea title={contact.mapTitle} body={contact.mapBody} ui={ui} />
          </div>
        </div>
      </section>
    </>
  );
}
