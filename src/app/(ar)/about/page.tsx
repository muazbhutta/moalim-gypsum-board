import { AboutPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "about");

export default function Page() {
  return <AboutPage locale="ar" />;
}
