import Image from "next/image";
import { images } from "@/content/media";
import type { Pic, Ui } from "@/content/types";
import { CtaButtons } from "./CtaButtons";

/** Text beside a photo, with the WhatsApp/Call pair — the repeating block of the old home page. */
export function SplitSection({
  title,
  paragraphs,
  pic,
  ui,
  flip = false,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  pic: Pic;
  ui: Ui;
  flip?: boolean;
  tone?: "white" | "gold";
}) {
  const img = images[pic.image];
  return (
    <section className={tone === "gold" ? "bg-gold-50" : "bg-white"}>
      <div className="container-page grid items-center gap-10 py-14 sm:py-20 md:grid-cols-2 lg:gap-14">
        <div data-reveal className={flip ? "md:order-2" : ""}>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-ink-soft">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <CtaButtons ui={ui} className="mt-8" />
        </div>
        <Image
          src={img.src}
          alt={pic.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw"
          data-reveal="zoom"
          className="aspect-[4/3] h-auto w-full rounded-2xl object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
