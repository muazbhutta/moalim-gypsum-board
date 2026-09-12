import Link from "next/link";
import type { ListItem, Locale } from "@/content/types";
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

const label = (i: ListItem) => (typeof i === "string" ? i : i.label);

export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, home: h, contact } = c;
  const allServices = [...h.plainGypsum, ...h.services, ...h.moreServices];
  const points = c.services.why.items.slice(0, 3).map(label);

  return (
    <>
      <JsonLd data={[...allServices.map((s) => serviceLd(locale, s, "/")), ...h.videos.items.map((v) => videoLd(v.video, v.title, v.description))]} />

      <Hero title={h.hero.title} body={h.hero.body} pic={h.hero.pic} ui={ui} points={points} />

      <SplitSection title={h.intro.title} paragraphs={h.intro.paragraphs} pic={h.intro.pic} />
      <SplitSection title={h.pakistani.title} paragraphs={[h.pakistani.body]} pic={h.pakistani.pic} flip tone="gold" />

      <section aria-labelledby="services-title" className="bg-white">
        <div className="container-page section">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <h2 id="services-title" className="h-section">
              {h.servicesIntro.title}
            </h2>
            <p className="lead mx-auto mt-5">{h.servicesIntro.body}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href={pageHref(locale, "services")} className="btn btn-ghost">
              {c.services.title}
              <ArrowIcon className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="bg-ink text-white">
        <div data-reveal className="container-page section text-center">
          <h2 id="team-title" className="h-section text-white">
            {h.team.title}
          </h2>
          <p className="lead mx-auto mt-5 text-white/80">{h.team.body}</p>
        </div>
      </section>

      <section aria-labelledby="work-title" className="bg-gold-50">
        <div className="container-page section">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <h2 id="work-title" className="h-section">
              {h.work.title}
            </h2>
            <p className="lead mx-auto mt-5">{h.work.body}</p>
          </div>
          <div className="mt-12">
            <GalleryTiles items={h.work.items.slice(0, 6)} href={pageHref(locale, "gallery")} />
          </div>
          <div className="mt-10 text-center">
            <Link href={pageHref(locale, "gallery")} className="btn btn-gold">
              {ui.seeAllWork}
              <ArrowIcon className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="videos-title" className="bg-white">
        <div className="container-page section">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <h2 id="videos-title" className="h-section">
              {h.videos.title}
            </h2>
          </div>
          <div className="mt-10">
            <VideoTiles items={h.videos.items} href={pageHref(locale, "gallery")} playLabel={ui.playVideo} />
          </div>
        </div>
      </section>

      <section aria-label={h.contact.title} className="bg-gold-50/60">
        <div className="container-page section">
          <div className="grid gap-6 lg:grid-cols-2">
            <ContactCard title={h.contact.title} body={h.contact.body} ui={ui} />
            <div data-reveal className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="h-section">{contact.formTitle}</h2>
              <div className="mt-6">
                <ContactForm text={ui.form} />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <ServiceArea title={contact.mapTitle} body={contact.mapBody} ui={ui} />
          </div>
        </div>
      </section>
    </>
  );
}
