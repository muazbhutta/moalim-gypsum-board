import Link from "next/link";
import type { CSSProperties } from "react";
import type { GalleryItem } from "@/content/types";
import { mosaicRows } from "./WorkMosaic";
import { panelSizes, WorkPanelMedia } from "./WorkPanelMedia";

/**
 * The home page work mosaic: rows of photos with mixed heights, each linking
 * through to the gallery. Server rendered, no client JavaScript.
 */
export function GalleryTiles({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {mosaicRows(items).map((row) => (
        <ul key={row[0].item.image} className="work-row">
          {row.map(({ item, height }) => (
            <li key={item.image} data-reveal>
              <Link href={href} className="work-panel" style={{ "--h": `${height}px` } as CSSProperties}>
                <WorkPanelMedia item={item} sizes={panelSizes} />
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
