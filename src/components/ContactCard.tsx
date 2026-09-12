import { phones, site } from "@/content/site";
import type { Ui } from "@/content/types";
import { CtaButtons } from "./CtaButtons";
import { MailIcon, PhoneIcon } from "./Icons";

export function ContactList({ ui, tone = "light" }: { ui: Ui; tone?: "light" | "dark" }) {
  const link = tone === "dark" ? "text-white/85 hover:text-gold-300" : "text-ink hover:text-gold-700";
  const icon = tone === "dark" ? "text-gold-300" : "text-gold-600";
  return (
    <ul className="space-y-3">
      {phones.map((p) => (
        <li key={p.tel}>
          <a href={`tel:${p.tel}`} className={`inline-flex items-center gap-3 font-bold transition-colors ${link}`}>
            <PhoneIcon className={icon} />
            <span className="sr-only">{ui.phoneLabel}: </span>
            <span dir="ltr">{p.display}</span>
          </a>
        </li>
      ))}
      {site.email ? (
        <li>
          <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-3 font-bold break-all transition-colors ${link}`}>
            <MailIcon className={icon} />
            <span className="sr-only">{ui.emailLabel}: </span>
            <span dir="ltr">{site.email}</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

/** Contact panel: short pitch, the numbers, and the WhatsApp/call pair. */
export function ContactCard({ title, body, ui, as: Heading = "h2" }: { title: string; body: string; ui: Ui; as?: "h2" | "h3" }) {
  return (
    <div data-reveal className="rounded-3xl border border-gold-200 bg-gold-50 p-6 sm:p-8">
      <Heading className="h-section">{title}</Heading>
      <p className="lead mt-4">{body}</p>
      <div className="mt-7 border-t border-gold-200 pt-6">
        <ContactList ui={ui} />
      </div>
      <CtaButtons ui={ui} className="mt-7" />
    </div>
  );
}
