import { ServicesPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "services");

export default function Page() {
  return <ServicesPage locale="en" />;
}
