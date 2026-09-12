import Image from "next/image";
import { images } from "@/content/media";
import type { Pic } from "@/content/types";

/** Text beside a framed photo: the alternating block down the home page. */
export function SplitSection({
  title,
  paragraphs,
  pic,
  flip = false,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  pic: Pic;
  flip?: boolean;
  tone?: "white" | "gold";
}) {
  const img = images[pic.image];
  return (
    <section className={tone === "gold" ? "bg-gold-50" : "bg-white"}>
      <div className="container-page section grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div data-reveal className={flip ? "md:order-2" : ""}>
          <h2 className="h-section">{title}</h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div data-reveal="zoom" className="relative">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[1.75rem] border-2 border-gold-500/30" />
          <Image
            src={img.src}
            alt={pic.alt}
            width={img.width}
            height={img.height}
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw"
            className="aspect-[4/3] h-auto w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
