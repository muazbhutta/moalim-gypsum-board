import { BlogPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "blog");

export default function Page() {
  return <BlogPage locale="en" />;
}
