"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { images } from "@/content/media";
import type { GalleryItem } from "@/content/types";
import { ArrowIcon, CloseIcon } from "./Icons";
import { chunk, panelSizes, WorkPanelMedia } from "./WorkPanelMedia";

type Labels = { open: string; close: string; prev: string; next: string; counter: string };

/**
 * Rows of photo strips in the old site's style — each expands on hover and shows
 * its caption over a dark veil — where clicking one also opens the photo full
 * size in an accessible <dialog> (Esc, arrow keys, backdrop click).
 */
export function GalleryGrid({ items, labels }: { items: GalleryItem[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (d && index !== null && !d.open) d.showModal();
  }, [index]);

  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const rtl = document.documentElement.dir === "rtl";
    step(e.key === (rtl ? "ArrowLeft" : "ArrowRight") ? 1 : -1);
  };

  const current = index === null ? null : items[index];
  const currentImg = current ? images[current.image] : null;
  const navBtn = "inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25";

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {chunk(items, 3).map((row) => (
          <ul key={row[0].image} className="work-row">
            {row.map((item) => (
              <li key={item.image} data-reveal>
                <button
                  type="button"
                  onClick={() => setIndex(items.indexOf(item))}
                  aria-haspopup="dialog"
                  className="work-panel text-start"
                >
                  <WorkPanelMedia item={item} sizes={panelSizes} />
                  <span className="sr-only">{` — ${labels.open}`}</span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        aria-label={current?.title}
        className="m-auto w-[min(94vw,980px)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85"
      >
        {current && currentImg ? (
          <figure className="flex flex-col items-center gap-3">
            <Image
              src={currentImg.src}
              alt={current.alt}
              width={currentImg.width}
              height={currentImg.height}
              sizes="94vw"
              className="max-h-[78vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="flex w-full flex-wrap items-center justify-between gap-3">
              <span className="text-lg font-bold">{current.title}</span>
              <span className="text-sm text-white/80">
                {labels.counter.replace("{current}", String((index ?? 0) + 1)).replace("{total}", String(items.length))}
              </span>
              <span className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className={navBtn}>
                  <ArrowIcon className="rotate-180 rtl:rotate-0" />
                  <span className="sr-only">{labels.prev}</span>
                </button>
                <button type="button" onClick={() => step(1)} className={navBtn}>
                  <ArrowIcon className="rtl:rotate-180" />
                  <span className="sr-only">{labels.next}</span>
                </button>
                <button type="button" onClick={() => dialog.current?.close()} className={navBtn} autoFocus>
                  <CloseIcon />
                  <span className="sr-only">{labels.close}</span>
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
