import Image from "next/image";
import { images } from "@/content/media";
import type { GalleryItem } from "@/content/types";

/**
 * Inside of a work panel: the photo, the veil that darkens on hover, and the
 * caption that slides in. Shared by the linked panels (home) and the
 * clickable ones that open the lightbox (gallery page). Styles live in
 * globals.css under `.work-panel`.
 */
export function WorkPanelMedia({ item, sizes }: { item: GalleryItem; sizes: string }) {
  const img = images[item.image];
  return (
    <>
      <Image src={img.src} alt={item.alt} fill sizes={sizes} className="work-panel__img" />
      <span className="work-panel__veil" aria-hidden="true" />
      <span className="work-panel__title">{item.title}</span>
    </>
  );
}

export const panelSizes = "(min-width: 1152px) 560px, (min-width: 640px) 48vw, 92vw";
