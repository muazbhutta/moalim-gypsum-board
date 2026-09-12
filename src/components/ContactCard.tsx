import { phones, site } from "@/content/site";
import type { Ui } from "@/content/types";
import { CtaButtons } from "./CtaButtons";
import { FacebookIcon, MailIcon, PhoneIcon, TikTokIcon } from "./Icons";

export function ContactList({ ui, tone = "light" }: { ui: Ui; tone?: "light" | "dark" }) {
  const link = tone === "dark" ? "text-white hover:text-gold-300" : "text-ink hover:text-gold-700";
  const icon = tone === "dark" ? "text-gold-300" : "text-gold-700";
  return (
    <ul className="space-y-3">
      {phones.map((p) => (
        <li key={p.tel}>
          <a href={`tel:${p.tel}`} className={`inline-flex items-center gap-3 font-bold ${link}`}>
            <PhoneIcon className={icon} />
            <span className="sr-only">{ui.phoneLabel}: </span>
            <span dir="ltr">{p.display}</span>
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-3 font-bold break-all ${link}`}>
          <MailIcon className={icon} />
          <span className="sr-only">{ui.emailLabel}: </span>
          <span dir="ltr">{site.email}</span>
        </a>
      </li>
    </ul>
  );
}

export function SocialLinks({ ui, tone = "light" }: { ui: Ui; tone?: "light" | "dark" }) {
  const cls =
    tone === "dark"
      ? "bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-ink"
      : "bg-gold-100 text-ink transition-colors hover:bg-gold-500 hover:text-white";
  return (
    <ul className="flex gap-3">
      <li>
        <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={`inline-flex size-11 items-center justify-center rounded-full ${cls}`}>
          <FacebookIcon />
          <span className="sr-only">{`${ui.followUs}: Facebook`}</span>
        </a>
      </li>
      <li>
        <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className={`inline-flex size-11 items-center justify-center rounded-full ${cls}`}>
          <TikTokIcon />
          <span className="sr-only">{`${ui.followUs}: TikTok`}</span>
        </a>
      </li>
    </ul>
  );
}

/** "Contact us today!" panel: text, phone(s), email, socials and the WhatsApp/Call pair. */
export function ContactCard({ title, body, ui, as: Heading = "h2" }: { title: string; body: string; ui: Ui; as?: "h2" | "h3" }) {
  return (
    <div data-reveal className="rounded-2xl bg-gold-50 p-6 ring-1 ring-gold-200 sm:p-8">
      <Heading className="text-2xl font-bold text-ink sm:text-3xl">{title}</Heading>
      <p className="mt-4 text-lg leading-8 text-ink-soft">{body}</p>
      <div className="mt-6">
        <ContactList ui={ui} />
      </div>
      <div className="mt-6">
        <SocialLinks ui={ui} />
      </div>
      <CtaButtons ui={ui} className="mt-8" />
    </div>
  );
}
