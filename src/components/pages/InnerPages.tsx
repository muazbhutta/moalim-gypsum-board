import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { images } from "@/content/media";
import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { blogPostingLd, faqLd, serviceLd, videoLd } from "@/lib/jsonld";
import { pageHref, pagePaths, postHref } from "@/lib/routes";
import { Blocks, ListRow } from "../Blocks";
import { ContactCard, ContactList } from "../ContactCard";
import { ContactForm } from "../ContactForm";
import { CtaButtons } from "../CtaButtons";
import { FaqAccordion } from "../FaqAccordion";
import { GalleryGrid } from "../GalleryGrid";
import { ArrowIcon } from "../Icons";
import { JsonLd } from "../JsonLd";
import { PageHeader } from "../PageHeader";
import { ServiceArea } from "../ServiceArea";
import { ServiceCard } from "../ServiceCard";
import { VideoCard } from "../VideoCard";

const body = "container-page py-12 sm:py-16";

export function AboutPage({ locale }: { locale: Locale }) {
  const { ui, about } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={about.title} intro={about.intro[0]} trail={[{ name: ui.nav.about, path: pagePaths.about }]} />
      <div className={body}>
        <div className="max-w-3xl">
          {about.intro.slice(1).map((p) => (
            <p key={p} className="mb-4 text-lg leading-8 text-ink-soft">
              {p}
            </p>
          ))}
          <Blocks blocks={about.blocks} />
          <CtaButtons ui={ui} className="mt-8" />
        </div>
      </div>
    </>
  );
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const { ui, services } = getContent(locale);
  return (
    <>
      <JsonLd data={services.items.map((s) => serviceLd(locale, s, pagePaths.services))} />
      <PageHeader locale={locale} ui={ui} title={services.title} intro={services.intro} trail={[{ name: ui.nav.services, path: pagePaths.services }]} />
      <div className={body}>
        <div className="grid gap-8 md:grid-cols-2">
          {services.items.map((s) => (
            <ServiceCard key={s.id} service={s} as="h2">
              <p className="mt-3 leading-7 text-ink-soft">{s.lead}</p>
              <ul className="mt-3 list-disc space-y-2 ps-6 leading-7 text-ink-soft marker:text-gold-600">
                {s.points.map((p, i) => (
                  <li key={i}>
                    <ListRow item={p} />
                  </li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl bg-gold-50 p-6 ring-1 ring-gold-200 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">{services.why.title}</h2>
            <ul className="mt-5 list-disc space-y-3 ps-6 text-lg leading-8 text-ink-soft marker:text-gold-600">
              {services.why.items.map((it, i) => (
                <li key={i}>
                  <ListRow item={it} />
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-line p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">{services.how.title}</h2>
            <ol className="mt-5 space-y-4">
              {services.how.steps.map((it, i) => (
                <li key={i} className="flex gap-4 text-lg leading-8 text-ink-soft">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-bold text-white">
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

        <p className="mt-12 max-w-3xl text-lg leading-8 text-ink-soft">{services.closing}</p>
        <CtaButtons ui={ui} className="mt-6" />
      </div>
    </>
  );
}

export function GalleryPage({ locale }: { locale: Locale }) {
  const { ui, gallery } = getContent(locale);
  return (
    <>
      <JsonLd data={gallery.videos.map((v) => videoLd(v.video, v.title, v.description))} />
      <PageHeader locale={locale} ui={ui} title={gallery.title} intro={gallery.intro} trail={[{ name: ui.nav.gallery, path: pagePaths.gallery }]} />
      <div className={body}>
        <h2 className="text-3xl font-bold text-ink">{gallery.workTitle}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">{gallery.workBody}</p>
        <div className="mt-10">
          <GalleryGrid items={gallery.items} labels={ui.gallery} />
        </div>

        <h2 className="mt-16 text-3xl font-bold text-ink">{gallery.videosTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.videos.map((v) => (
            <VideoCard key={v.video} item={v} playLabel={ui.playVideo} unsupported={ui.videoUnsupported} />
          ))}
        </div>
        <CtaButtons ui={ui} className="mt-12 justify-center" />
      </div>
    </>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const { ui, faq } = getContent(locale);
  return (
    <>
      <JsonLd data={faqLd(faq.items)} />
      <PageHeader locale={locale} ui={ui} title={faq.title} intro={faq.intro} trail={[{ name: ui.nav.faq, path: pagePaths.faq }]} />
      <div className={body}>
        <div className="max-w-4xl">
          <FaqAccordion items={faq.items} />
          <p className="mt-10 text-lg leading-8 text-ink-soft">{faq.outro}</p>
          <CtaButtons ui={ui} className="mt-6" />
        </div>
      </div>
    </>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const { ui, contact } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={contact.title} intro={contact.intro} trail={[{ name: ui.nav.contact, path: pagePaths.contact }]} />
      <div className={`${body} grid gap-8 lg:grid-cols-2`}>
        <ContactCard title={contact.cardTitle} body={contact.cardBody} ui={ui} />
        <section className="rounded-2xl border border-line p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-ink">{contact.formTitle}</h2>
          <ContactForm text={ui.form} />
        </section>
        <div className="lg:col-span-2">
          <ServiceArea title={contact.mapTitle} body={contact.mapBody} ui={ui} />
        </div>
      </div>
    </>
  );
}

function PostCard({ locale, slug, title, excerpt, image, alt, readMore, heading = "h3" }: {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  image: keyof typeof images;
  alt: string;
  readMore: string;
  heading?: "h2" | "h3";
}) {
  const img = images[image];
  const Heading = heading;
  const href = postHref(locale, slug);
  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
    >
      <Image src={img.src} alt={alt} width={img.width} height={img.height} sizes="(min-width: 640px) 280px, 92vw" className="aspect-[4/3] h-auto w-full object-cover sm:w-72" />
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-bold text-ink">
          <Link href={href} className="after:absolute after:inset-0 hover:text-gold-700">
            {title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 leading-7 text-ink-soft">{excerpt}</p>
        <span aria-hidden="true" className="mt-4 inline-flex items-center gap-2 font-bold text-gold-700">
          {readMore}
          <ArrowIcon className="rtl:rotate-180" />
        </span>
      </div>
    </article>
  );
}

export function BlogPage({ locale }: { locale: Locale }) {
  const { ui, blog, posts } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={blog.title} intro={blog.intro} trail={[{ name: ui.nav.blog, path: pagePaths.blog }]} />
      <div className={body}>
        <h2 className="text-2xl font-bold text-ink">{blog.postsTitle}</h2>
        <div className="mt-8 grid gap-6">
          {posts.map((p) => (
            <PostCard key={p.slug} locale={locale} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.pic.image} alt={p.pic.alt} readMore={ui.readMore} />
          ))}
        </div>
      </div>
    </>
  );
}

export function PostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const { ui, posts } = getContent(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const img = images[post.pic.image];
  const others = posts.filter((p) => p.slug !== slug);
  const dateFmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", { dateStyle: "long" });

  return (
    <>
      <JsonLd data={blogPostingLd(locale, post)} />
      <PageHeader
        locale={locale}
        ui={ui}
        title={post.title}
        trail={[
          { name: ui.nav.blog, path: pagePaths.blog },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article className={body}>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">
            <time dateTime={post.datePublished}>{dateFmt.format(new Date(post.datePublished))}</time>
          </p>
          <Image
            src={img.src}
            alt={post.pic.alt}
            width={img.width}
            height={img.height}
            preload
            sizes="(min-width: 800px) 768px, 92vw"
            className="mt-4 aspect-[16/10] h-auto w-full rounded-2xl object-cover"
          />
          <Blocks blocks={post.blocks} className="mt-8" />
          <div className="mt-8 rounded-2xl bg-gold-50 p-6 ring-1 ring-gold-200">
            <ContactList ui={ui} />
            <CtaButtons ui={ui} className="mt-6" />
          </div>
        </div>
      </article>
      {others.length ? (
        <section className="border-t border-line bg-gold-50">
          <div className={body}>
            <h2 className="text-2xl font-bold text-ink">{ui.latestPosts}</h2>
            <div className="mt-6 grid gap-6">
              {others.map((p) => (
                <PostCard key={p.slug} locale={locale} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.pic.image} alt={p.pic.alt} readMore={ui.readMore} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function LegalPage({ locale, page }: { locale: Locale; page: "privacy" | "terms" }) {
  const c = getContent(locale);
  const doc = c[page];
  return (
    <>
      <PageHeader locale={locale} ui={c.ui} title={doc.title} intro={doc.intro} trail={[{ name: c.ui.legalNav[page], path: pagePaths[page] }]} />
      <div className={body}>
        <div className="max-w-3xl">
          <Blocks blocks={doc.blocks} />
          <div className="mt-2 rounded-2xl bg-gold-50 p-6 ring-1 ring-gold-200">
            <ContactList ui={c.ui} />
            <CtaButtons ui={c.ui} className="mt-6" />
          </div>
          <p className="mt-8">
            <Link href={pageHref(locale, "contact")} className="font-bold text-gold-700 underline underline-offset-4">
              {c.ui.nav.contact}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
