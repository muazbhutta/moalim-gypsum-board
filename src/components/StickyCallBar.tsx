import { site, whatsappLink } from "@/content/site";
import type { Ui } from "@/content/types";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Mobile: full-width Call + WhatsApp bar pinned to the bottom. Desktop: two floating round buttons. */
export function StickyCallBar({ ui }: { ui: Ui }) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <a href={`tel:${site.phone.tel}`} className="flex min-h-14 items-center justify-center gap-2 bg-ink text-lg font-bold text-white">
          <PhoneIcon width={22} height={22} />
          {ui.callNow}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 bg-wa text-lg font-bold text-white">
          <WhatsAppIcon width={22} height={22} />
          {ui.whatsapp}
        </a>
      </div>

      <div className="fixed end-6 bottom-6 z-50 hidden flex-col gap-3 md:flex">
        <a
          href={`tel:${site.phone.tel}`}
          className="grid size-14 place-items-center rounded-full bg-ink text-white shadow-lg ring-2 ring-white hover:bg-ink-soft"
        >
          <PhoneIcon width={26} height={26} />
          <span className="sr-only">{ui.callNow}</span>
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-14 place-items-center rounded-full bg-wa text-white shadow-lg ring-2 ring-white hover:bg-wa-dark"
        >
          <WhatsAppIcon width={28} height={28} />
          <span className="sr-only">{ui.whatsappUs}</span>
        </a>
      </div>
    </>
  );
}
