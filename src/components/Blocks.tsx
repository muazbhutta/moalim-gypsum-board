import Image from "next/image";
import { images } from "@/content/media";
import type { Block, ListItem } from "@/content/types";

export function ListRow({ item }: { item: ListItem }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      <strong className="font-bold text-ink">{item.label}:</strong> {item.text}
    </>
  );
}

/** Renders rich text blocks (paragraphs, sub-headings, lists, inline images). */
export function Blocks({ blocks, className = "" }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`prose-block text-lg text-ink-soft ${className}`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <ListRow item={it} />
                  </li>
                ))}
              </List>
            );
          }
          case "img": {
            const img = images[b.pic.image];
            return (
              <Image
                key={i}
                src={img.src}
                alt={b.pic.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 720px, 100vw"
                className="my-8 h-auto w-full rounded-xl"
              />
            );
          }
        }
      })}
    </div>
  );
}
