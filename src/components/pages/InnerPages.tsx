import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { faqLd, serviceLd, videoLd } from "@/lib/jsonld";
import { pagePaths } from "@/lib/routes";
import { Blocks, ListRow } from "../Blocks";
import { ContactCard } from "../ContactCard";
import { ContactForm } from "../ContactForm";
import { CtaBand } from "../CtaBand";
import { FaqAccordion } from "../FaqAccordion";
import { GalleryGrid } from "../GalleryGrid";
import { JsonLd } from "../JsonLd";
import { PageHeader } from "../PageHeader";
import { ServiceArea } from "../ServiceArea";
import { ServiceCard } from "../ServiceCard";
import { VideoCard } from "../VideoCard";

export { BlogPage, LegalPage, PostPage } from "./BlogPages";

export const body = "container-page section";

export function AboutPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, about } = c;
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={about.title} intro={about.intro[0]} trail={[{ name: ui.nav.about, path: pagePaths.about }]} />
      <div className={body}>
        <div className="max-w-3xl">
          {about.intro.slice(1).map((p) => (
            <p key={p} className="lead mb-4">
              {p}
            </p>
          ))}
          <Blocks blocks={about.blocks} />
        </div>
      </div>
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
    </>
  );
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, services } = c;
  return (
    <>
      <JsonLd data={services.items.map((s) => serviceLd(locale, s, pagePaths.services))} />
      <PageHeader locale={locale} ui={ui} title={services.title} intro={services.intro} trail={[{ name: ui.nav.services, path: pagePaths.services }]} />
      <div className={body}>
        <div className="grid gap-6 md:grid-cols-2">
          {services.items.map((s) => (
            <ServiceCard key={s.id} service={s} as="h2" sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw">
              <p className="mt-3 leading-7 text-muted">{s.lead}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 leading-7 text-muted">
                {s.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span>
                      <ListRow item={p} />
                    </span>
                  </li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section data-reveal className="rounded-3xl border border-gold-200 bg-gold-50 p-6 sm:p-8">
            <h2 className="h-section">{services.why.title}</h2>
            <ul className="mt-6 space-y-3">
              {services.why.items.map((it, i) => (
                <li key={i} className="flex gap-3 leading-7 text-muted">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                  <span>
                    <ListRow item={it} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section data-reveal className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="h-section">{services.how.title}</h2>
            <ol className="mt-6 space-y-5">
              {services.how.steps.map((it, i) => (
                <li key={i} className="flex gap-4 leading-7 text-muted">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-500 font-bold text-ink">
                    {(i + 1).toLocaleString(locale === "ar" ? "ar-SA" : "en")}
                  </span>
                  <span>
                    <ListRow item={it} />
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <p className="lead mt-12">{services.closing}</p>
      </div>
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
    </>
  );
}

export function GalleryPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, gallery } = c;
  return (
    <>
      <JsonLd data={gallery.videos.map((v) => videoLd(v.video, v.title, v.description))} />
      <PageHeader locale={locale} ui={ui} title={gallery.title} intro={gallery.intro} trail={[{ name: ui.nav.gallery, path: pagePaths.gallery }]} />
      <div className={body}>
        <div data-reveal>
          <p className="eyebrow">{ui.nav.gallery}</p>
          <h2 className="h-section">{gallery.workTitle}</h2>
          <p className="lead mt-4">{gallery.workBody}</p>
        </div>
        <div className="mt-10">
          <GalleryGrid items={gallery.items} labels={ui.gallery} />
        </div>

        <div data-reveal className="mt-16">
          <h2 className="h-section">{gallery.videosTitle}</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.videos.map((v) => (
            <VideoCard key={v.video} item={v} playLabel={ui.playVideo} unsupported={ui.videoUnsupported} />
          ))}
        </div>
      </div>
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
    </>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, faq } = c;
  return (
    <>
      <JsonLd data={faqLd(faq.items)} />
      <PageHeader locale={locale} ui={ui} title={faq.title} intro={faq.intro} trail={[{ name: ui.nav.faq, path: pagePaths.faq }]} />
      <div className={body}>
        <div className="max-w-4xl">
          <FaqAccordion items={faq.items} />
          <p className="lead mt-10">{faq.outro}</p>
        </div>
      </div>
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
    </>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const { ui, contact } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={contact.title} intro={contact.intro} trail={[{ name: ui.nav.contact, path: pagePaths.contact }]} />
      <div className={body}>
        <div className="grid gap-6 lg:grid-cols-2">
          <ContactCard title={contact.cardTitle} body={contact.cardBody} ui={ui} />
          <section data-reveal className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <h2 className="h-section">{contact.formTitle}</h2>
            <div className="mt-6">
              <ContactForm text={ui.form} />
            </div>
          </section>
        </div>
        <div className="mt-6">
          <ServiceArea title={contact.mapTitle} body={contact.mapBody} ui={ui} />
        </div>
      </div>
    </>
  );
}
