import { ContactPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "contact");

export default function Page() {
  return <ContactPage locale="en" />;
}
