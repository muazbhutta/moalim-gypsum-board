import { LegalPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "terms");

export default function Page() {
  return <LegalPage locale="en" page="terms" />;
}
