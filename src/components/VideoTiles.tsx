import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/media";
import type { VideoItem } from "@/content/types";
import { PlayIcon } from "./Icons";

/**
 * Video previews that link to the gallery page instead of playing inline.
 * Server-rendered with no client JavaScript — the players themselves live on /gallery,
 * which keeps the home page cheap to hydrate.
 */
export function VideoTiles({ items, href, playLabel }: { items: VideoItem[]; href: string; playLabel: string }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const poster = images[`poster-${item.video}` as ImageKey];
        return (
          <li key={item.video}>
            <Link href={href} className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <span className="relative block aspect-[9/16] bg-ink">
                <Image
                  src={poster.src}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 270px, (min-width: 640px) 45vw, 92vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/10">
                  <span className="grid size-16 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform group-hover:scale-110">
                    <PlayIcon width={28} height={28} className="ms-1 rtl:ms-0 rtl:me-1 rtl:-scale-x-100" />
                  </span>
                </span>
              </span>
              <span className="block p-4">
                <span className="block text-lg font-bold text-ink">{item.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{item.description}</span>
                <span className="sr-only">{` — ${playLabel}`}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
