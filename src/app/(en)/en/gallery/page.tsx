import { GalleryPage } from "@/components/pages/InnerPages";
import { metaFor } from "@/lib/pageMeta";

export const metadata = metaFor("en", "gallery");

export default function Page() {
  return <GalleryPage locale="en" />;
}
