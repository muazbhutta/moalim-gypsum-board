import { BlogPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "blog");

export default function Page() {
  return <BlogPage locale="ar" />;
}
