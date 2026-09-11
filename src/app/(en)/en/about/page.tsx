import { AboutPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "about");

export default function Page() {
  return <AboutPage locale="en" />;
}
