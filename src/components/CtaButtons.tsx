import { site, whatsappLink } from "@/content/site";
import type { Ui } from "@/content/types";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold transition-colors focus-visible:outline-offset-4";

/** The green WhatsApp + black call pair used under most sections of the old site. */
export function CtaButtons({ ui, className = "" }: { ui: Ui; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${btn} bg-wa text-white hover:bg-wa-dark`}>
        <WhatsAppIcon />
        {ui.whatsappUs}
      </a>
      <a href={`tel:${site.phone.tel}`} className={`${btn} bg-ink text-white hover:bg-ink-soft`}>
        <PhoneIcon />
        {ui.callUs}
      </a>
    </div>
  );
}
