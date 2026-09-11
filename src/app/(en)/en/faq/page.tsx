import { FaqPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "faq");

export default function Page() {
  return <FaqPage locale="en" />;
}
