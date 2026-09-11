import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/content/media";
import type { Service } from "@/content/types";

export function ServiceCard({
  service,
  as: Heading = "h3",
  sizes = "(min-width: 1152px) 540px, (min-width: 768px) 45vw, 92vw",
  children,
}: {
  service: Service;
  as?: "h2" | "h3";
  sizes?: string;
  children?: ReactNode;
}) {
  const img = images[service.pic.image];
  return (
    <article id={service.id} className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <Image src={img.src} alt={service.pic.alt} width={img.width} height={img.height} sizes={sizes} className="aspect-[7/5] h-auto w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-bold text-ink">{service.title}</Heading>
        {children ?? <p className="mt-3 leading-7 text-ink-soft">{service.body}</p>}
      </div>
    </article>
  );
}
