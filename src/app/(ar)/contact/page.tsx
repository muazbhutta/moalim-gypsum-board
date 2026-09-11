import { ContactPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "contact");

export default function Page() {
  return <ContactPage locale="ar" />;
}
