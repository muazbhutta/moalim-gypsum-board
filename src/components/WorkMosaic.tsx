import type { GalleryItem } from "@/content/types";

/**
 * Row templates copied from the old site: four or five photos per row, with
 * mixed panel heights so the row bottoms stagger instead of lining up.
 */
const ROW_TEMPLATES = [
  [475, 500, 465, 465],
  [200, 500, 500, 200, 465],
  [480, 220, 220, 480, 465],
];

export type MosaicCell = { item: GalleryItem; height: number };

/** Groups photos into mosaic rows, cycling the templates for longer lists. */
export function mosaicRows(items: GalleryItem[]): MosaicCell[][] {
  const rows: MosaicCell[][] = [];
  let i = 0;
  let r = 0;
  while (i < items.length) {
    const heights = ROW_TEMPLATES[r % ROW_TEMPLATES.length];
    rows.push(items.slice(i, i + heights.length).map((item, k) => ({ item, height: heights[k] })));
    i += heights.length;
    r += 1;
  }
  return rows;
}
