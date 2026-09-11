import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/media";
import type { GalleryItem } from "@/content/types";

/**
 * Same look as GalleryGrid but every tile is a plain link to the gallery page.
 * Server-rendered with no client JavaScript — used on the home page, where the
 * lightbox isn't needed and hydration cost matters for Core Web Vitals.
 */
export function GalleryTiles({ items, href }: { items: GalleryItem[]; href: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const img = images[item.image];
        return (
          <li key={item.image}>
            <Link href={href} className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl bg-gold-100 text-start">
              <Image
                src={img.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1152px) 270px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pt-10 pb-3 text-sm font-bold text-white sm:text-base">
                {item.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
