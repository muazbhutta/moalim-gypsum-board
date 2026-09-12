import Link from "next/link";
import type { GalleryItem } from "@/content/types";
import { panelSizes, WorkPanelMedia } from "./WorkPanelMedia";

/**
 * Work panels for the home page: two large photos per row, caption revealed on
 * hover, each linking through to the gallery page. Server-rendered with no
 * client JavaScript, so the home page stays cheap to hydrate.
 */
export function GalleryTiles({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
      {items.map((item) => (
        <li key={item.image} data-reveal>
          <Link href={href} className="work-panel">
            <WorkPanelMedia item={item} sizes={panelSizes} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
