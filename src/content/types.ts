import type { ImageKey, VideoKey } from "./media";

export type Locale = "ar" | "en";

export type PageKey = "home" | "about" | "services" | "gallery" | "faq" | "contact" | "blog" | "privacy" | "terms";

export type Seo = { title: string; description: string };

export type Pic = { image: ImageKey; alt: string };

/** "label: text" list rows render the label in bold. */
export type ListItem = string | { label: string; text: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: ListItem[] }
  | { type: "img"; pic: Pic };

export type Service = {
  id: string;
  title: string;
  body: string;
  pic: Pic;
  /** Plain name used in Service structured data. */
  schemaName: string;
};

export type ServiceDetail = Service & { lead: string; points: ListItem[] };

export type GalleryItem = Pic & { title: string };

export type VideoItem = { video: VideoKey; title: string; description: string };

export type Faq = { q: string; a: Block[] };

export type Post = {
  slug: string;
  datePublished: string;
  dateModified: string;
  title: string;
  seo: Seo;
  pic: Pic;
  excerpt: string;
  blocks: Block[];
};

export type Ui = {
  brand: string;
  tagline: string;
  skipToContent: string;
  nav: Record<Exclude<PageKey, "privacy" | "terms">, string>;
  legalNav: { privacy: string; terms: string };
  menuOpen: string;
  menuClose: string;
  switchLanguage: string;
  switchLanguageLabel: string;
  callUs: string;
  callNow: string;
  whatsapp: string;
  whatsappUs: string;
  emailUs: string;
  phoneLabel: string;
  emailLabel: string;
  followUs: string;
  openMap: string;
  serviceArea: string;
  readMore: string;
  seeAllWork: string;
  latestPosts: string;
  playVideo: string;
  gallery: { open: string; close: string; prev: string; next: string; counter: string };
  breadcrumbHome: string;
  footerAboutTitle: string;
  footerAbout: string;
  footerContactTitle: string;
  footerLinksTitle: string;
  copyright: (year: number) => string;
  videoUnsupported: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  form: {
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    details: string;
    detailsPlaceholder: string;
    submit: string;
    note: string;
    required: string;
    errors: { name: string; phone: string; details: string; summary: string };
    /** WhatsApp message template; {name}, {phone} and {details} are filled in from the form. */
    message: string;
  };
};

export type SiteContent = {
  locale: Locale;
  ui: Ui;
  home: {
    seo: Seo;
    hero: { title: string; body: string; pic: Pic };
    intro: { title: string; paragraphs: string[]; pic: Pic };
    pakistani: { title: string; body: string; pic: Pic };
    servicesIntro: { title: string; body: string };
    plainGypsum: Service[];
    services: Service[];
    moreServices: Service[];
    team: { title: string; body: string };
    work: { title: string; body: string; items: GalleryItem[] };
    videos: { title: string; items: VideoItem[] };
    contact: { title: string; body: string };
  };
  about: { seo: Seo; title: string; intro: string[]; blocks: Block[] };
  services: {
    seo: Seo;
    title: string;
    intro: string;
    items: ServiceDetail[];
    why: { title: string; items: ListItem[] };
    how: { title: string; steps: ListItem[] };
    closing: string;
  };
  gallery: {
    seo: Seo;
    title: string;
    intro: string;
    workTitle: string;
    workBody: string;
    items: GalleryItem[];
    videosTitle: string;
    videos: VideoItem[];
  };
  faq: { seo: Seo; title: string; intro: string; items: Faq[]; outro: string };
  contact: { seo: Seo; title: string; intro: string; cardTitle: string; cardBody: string; formTitle: string; mapTitle: string; mapBody: string };
  blog: { seo: Seo; title: string; intro: string; postsTitle: string };
  privacy: { seo: Seo; title: string; intro: string; blocks: Block[] };
  terms: { seo: Seo; title: string; intro: string; blocks: Block[] };
  posts: Post[];
};
