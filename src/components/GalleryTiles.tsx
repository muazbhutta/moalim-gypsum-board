import Link from "next/link";
import type { GalleryItem } from "@/content/types";
import { chunk, panelSizes, WorkPanelMedia } from "./WorkPanelMedia";

/**
 * Work panels for the home page: rows of photo strips that expand on hover,
 * each linking through to the gallery page. Server rendered with no client
 * JavaScript, so the home page stays cheap to hydrate.
 */
export function GalleryTiles({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {chunk(items, 3).map((row) => (
        <ul key={row[0].image} className="work-row">
          {row.map((item) => (
            <li key={item.image} data-reveal>
              <Link href={href} className="work-panel">
                <WorkPanelMedia item={item} sizes={panelSizes} />
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
