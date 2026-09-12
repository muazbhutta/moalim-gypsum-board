import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/content/media";
import type { Service } from "@/content/types";

/** The old copy numbered some service titles ("١. الأسقف الحديثة"); cards read better without it. */
export const serviceTitle = (title: string) => title.replace(/^[٠-٩\d]+\s*[.٫-]\s*/, "");

export function ServiceCard({
  service,
  as: Heading = "h3",
  sizes = "(min-width: 1152px) 360px, (min-width: 768px) 45vw, 92vw",
  children,
}: {
  service: Service;
  as?: "h2" | "h3";
  sizes?: string;
  children?: ReactNode;
}) {
  const img = images[service.pic.image];
  return (
    <article id={service.id} data-reveal className="card group scroll-mt-24">
      <div className="relative overflow-hidden">
        <Image
          src={img.src}
          alt={service.pic.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-lg font-bold text-ink sm:text-xl">{serviceTitle(service.title)}</Heading>
        {children ?? <p className="mt-3 leading-7 text-muted">{service.body}</p>}
      </div>
    </article>
  );
}
