import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { images } from "@/content/media";
import type { Locale } from "@/content/types";
import { getContent } from "@/lib/content";
import { blogPostingLd } from "@/lib/jsonld";
import { pageHref, pagePaths, postHref } from "@/lib/routes";
import { Blocks } from "../Blocks";
import { ContactList } from "../ContactCard";
import { CtaBand } from "../CtaBand";
import { ArrowIcon } from "../Icons";
import { JsonLd } from "../JsonLd";
import { PageHeader } from "../PageHeader";

const body = "container-page section";

function PostCard({
  locale,
  slug,
  title,
  excerpt,
  image,
  alt,
  readMore,
  heading = "h3",
}: {
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
  return (
    <article data-reveal className="card group relative sm:flex-row">
      <Image
        src={img.src}
        alt={alt}
        width={img.width}
        height={img.height}
        sizes="(min-width: 640px) 300px, 92vw"
        className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:w-72"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Heading className="text-lg font-bold text-ink sm:text-xl">
          <Link href={postHref(locale, slug)} className="after:absolute after:inset-0 hover:text-gold-700">
            {title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 leading-7 text-muted">{excerpt}</p>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2 font-bold text-gold-700">
          {readMore}
          <ArrowIcon className="rtl:rotate-180" />
        </span>
      </div>
    </article>
  );
}

export function BlogPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui, blog, posts } = c;
  return (
    <>
      <PageHeader locale={locale} ui={ui} title={blog.title} intro={blog.intro} trail={[{ name: ui.nav.blog, path: pagePaths.blog }]} />
      <div className={body}>
        <h2 className="h-section">{blog.postsTitle}</h2>
        <div className="mt-8 grid gap-6">
          {posts.map((p) => (
            <PostCard key={p.slug} locale={locale} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.pic.image} alt={p.pic.alt} readMore={ui.readMore} />
          ))}
        </div>
      </div>
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
    </>
  );
}

export function PostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const c = getContent(locale);
  const { ui, posts } = c;
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
            loading="eager"
            sizes="(min-width: 800px) 768px, 92vw"
            className="mt-4 aspect-[16/10] h-auto w-full rounded-3xl object-cover shadow-lg"
          />
          <Blocks blocks={post.blocks} className="mt-8" />
          <div className="mt-10 rounded-3xl border border-gold-200 bg-gold-50 p-6 sm:p-8">
            <ContactList ui={ui} />
          </div>
        </div>
      </article>
      {others.length ? (
        <section className="border-t border-line bg-gold-50/60">
          <div className={body}>
            <h2 className="h-section">{ui.latestPosts}</h2>
            <div className="mt-8 grid gap-6">
              {others.map((p) => (
                <PostCard key={p.slug} locale={locale} slug={p.slug} title={p.title} excerpt={p.excerpt} image={p.pic.image} alt={p.pic.alt} readMore={ui.readMore} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand ui={ui} title={c.home.contact.title} body={c.home.contact.body} />
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
          <div className="mt-4 rounded-3xl border border-gold-200 bg-gold-50 p-6 sm:p-8">
            <ContactList ui={c.ui} />
            <p className="mt-6">
              <Link href={pageHref(locale, "contact")} className="btn btn-ghost">
                {c.ui.nav.contact}
                <ArrowIcon className="rtl:rotate-180" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
