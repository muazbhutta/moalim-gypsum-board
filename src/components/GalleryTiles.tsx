import Link from "next/link";
import type { GalleryItem } from "@/content/types";
import { panelSizes, WorkPanelMedia } from "./WorkPanelMedia";

/** Home page work grid: equal tiles, each linking through to the gallery. */
export function GalleryTiles({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <ul className="work-grid">
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
