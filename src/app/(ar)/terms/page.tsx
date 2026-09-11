import { LegalPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "terms");

export default function Page() {
  return <LegalPage locale="ar" page="terms" />;
}
