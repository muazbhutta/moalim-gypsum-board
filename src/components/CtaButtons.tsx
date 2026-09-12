import { site, whatsappLink } from "@/content/site";
import type { Ui } from "@/content/types";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** WhatsApp + call pair. Used where a visitor is ready to get in touch, not after every section. */
export function CtaButtons({ ui, className = "", tone = "light" }: { ui: Ui; className?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`btn ${tone === "dark" ? "btn-gold" : "btn-wa"}`}>
        <WhatsAppIcon />
        {ui.whatsappUs}
      </a>
      <a href={`tel:${site.phone.tel}`} className={`btn ${tone === "dark" ? "btn-light" : "btn-dark"}`}>
        <PhoneIcon />
        {ui.callUs}
      </a>
    </div>
  );
}
