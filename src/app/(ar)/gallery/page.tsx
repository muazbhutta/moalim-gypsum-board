import { GalleryPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("ar", "gallery");

export default function Page() {
  return <GalleryPage locale="ar" />;
}
