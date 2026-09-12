import Image from "next/image";
import { images } from "@/content/media";
import type { GalleryItem } from "@/content/types";

/**
 * Inside of a work panel: the photo, the veil that darkens on hover, and the
 * caption that slides in. Shared by the linked panels (home) and the clickable
 * ones that open the lightbox (gallery page). Styles live in globals.css under
 * .work-panel and .work-row.
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

/** Four tiles per row on desktop, three on tablet, two on phones. */
export const panelSizes = "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 48vw";

/** Split the photos into rows, so each row is its own group of expanding strips. */
export function chunk<T>(list: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < list.length; i += size) rows.push(list.slice(i, i + size));
  return rows;
}
