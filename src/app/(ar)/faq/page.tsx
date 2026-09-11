import { FaqPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "faq");

export default function Page() {
  return <FaqPage locale="ar" />;
}
