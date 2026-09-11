import { HomePage } from "@/components/pages/HomePage";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "home");

export default function Page() {
  return <HomePage locale="ar" />;
}
