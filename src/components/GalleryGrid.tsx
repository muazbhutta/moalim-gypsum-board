"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { images } from "@/content/media";
import type { GalleryItem } from "@/content/types";
import { ArrowIcon, CloseIcon } from "./Icons";

type Labels = { open: string; close: string; prev: string; next: string; counter: string };

/** Photo grid with captions; each photo opens in an accessible <dialog> lightbox (Esc, arrows, backdrop click). */
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
    const forward = e.key === (rtl ? "ArrowLeft" : "ArrowRight");
    step(forward ? 1 : -1);
  };

  const current = index === null ? null : items[index];
  const currentImg = current ? images[current.image] : null;
  const navBtn = "inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25";

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => {
          const img = images[item.image];
          return (
            <li key={item.image}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-haspopup="dialog"
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-xl bg-gold-100 text-start"
              >
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
                <span className="sr-only">{` — ${labels.open}`}</span>
              </button>
            </li>
          );
        })}
      </ul>

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
