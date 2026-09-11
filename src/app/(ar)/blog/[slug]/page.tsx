import type { Metadata } from "next";
import { PostPage } from "@/components/pages/InnerPages";
import { getContent } from "@/lib/content";
import { pageMetadata, type OgKey } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("ar").posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getContent("ar").posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    locale: "ar",
    path: `/blog/${slug}`,
    seo: post.seo,
    og: slug as OgKey,
    type: "article",
    published: post.datePublished,
    modified: post.dateModified,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PostPage locale="ar" slug={slug} />;
}
