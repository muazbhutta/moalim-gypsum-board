// Business details used everywhere (header, footer, contact page, sticky bar, structured data).
// Change a value here and it updates across the whole site, in both languages.

export const site = {
  url: "https://moalim-gypsumboard-makkah.com",
  domain: "moalim-gypsumboard-makkah.com",

  phone: {
    display: "059 542 8955",
    tel: "+966595428955",
  },

  // Optional second phone number. Leave the display empty to hide it.
  phone2: {
    display: "",
  },

  // Same number as the phone above: both icons reach 059 542 8955.
  whatsapp: "966595428955",
  // No email address is published. Add one here and it appears in the contact
  // lists and in the business data search engines read.
  email: "",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=100046653366956",
    tiktok: "https://www.tiktok.com/@answarsheikh123",
  },

  // Link only — no embedded map, so no Google script runs on the site.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=%D9%85%D9%83%D8%A9+%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9",
} as const;

/** Saudi mobile in local form (05xxxxxxxx) → international tel: value, or null if not a real number. */
export function toTel(display: string): string | null {
  const digits = display.replace(/\D/g, "");
  if (/^05\d{8}$/.test(digits)) return `+966${digits.slice(1)}`;
  if (/^9665\d{8}$/.test(digits)) return `+${digits}`;
  return null;
}

const allPhones: { display: string; tel: string | null }[] = [site.phone, { display: site.phone2.display, tel: toTel(site.phone2.display) }];

/** Phone numbers to show on the site (the second one only once it is a real number). */
export const phones = allPhones.filter((p): p is { display: string; tel: string } => Boolean(p.tel));

export function whatsappLink(text?: string): string {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
