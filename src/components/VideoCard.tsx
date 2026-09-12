"use client";

import Image from "next/image";
import { useState } from "react";
import { images, videos, type ImageKey } from "@/content/media";
import type { VideoItem } from "@/content/types";
import { PlayIcon } from "./Icons";

/**
 * Project video. Shows a lightweight poster until the visitor presses play, so no video bytes
 * are downloaded on page load (keeps the page fast on mobile data).
 */
export function VideoCard({ item, playLabel, unsupported, as: Heading = "h3" }: { item: VideoItem; playLabel: string; unsupported: string; as?: "h2" | "h3" }) {
  const [playing, setPlaying] = useState(false);
  const v = videos[item.video];
  const poster = images[`poster-${item.video}` as ImageKey];

  return (
    <figure data-reveal className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="relative aspect-[9/16] bg-ink">
        {playing ? (
          <video
            src={v.src}
            poster={v.poster}
            width={v.width}
            height={v.height}
            controls
            autoPlay
            playsInline
            aria-label={item.title}
            className="absolute inset-0 h-full w-full object-contain"
          >
            {unsupported}
          </video>
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block w-full">
            <Image src={poster.src} alt="" fill sizes="(min-width: 1152px) 270px, (min-width: 640px) 45vw, 92vw" className="object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/10">
              <span className="grid size-16 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform group-hover:scale-110">
                <PlayIcon width={28} height={28} className="ms-1 rtl:ms-0 rtl:me-1 rtl:-scale-x-100" />
              </span>
            </span>
            <span className="sr-only">{`${playLabel}: ${item.title}`}</span>
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <Heading className="text-lg font-bold text-ink">{item.title}</Heading>
        <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
      </figcaption>
    </figure>
  );
}
