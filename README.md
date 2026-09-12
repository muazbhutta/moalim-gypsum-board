<div align="center">

# 🏛️ معلم جبس بورد مكة

**Gypsum Board Master Makkah — a bilingual (Arabic / English) website for a gypsum board and interior decoration business in Makkah, Saudi Arabia.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-A31F34?style=flat-square)](#-license)
[![RTL Support](https://img.shields.io/badge/RTL-Arabic_first-0C4A3A?style=flat-square)](#-features)
[![No Database](https://img.shields.io/badge/Database-none-6B7280?style=flat-square)](#-how-it-works)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](#-contributing)

</div>

---

## 📖 What this project is

A fast, fully static marketing website for a construction trade business. It exists to do one thing well: turn a Google search for *معلم جبس بورد مكة* into a phone call or a WhatsApp message.

The site was rebuilt from scratch to replace a WordPress/Elementor site the business owner no longer had access to. All of the client's own content — text, project photos, videos, phone numbers — was carried over, but none of the original theme code. Every component here is written from zero, so the client fully owns the result.

**Live site:** [www.moalimgypsumboardmakkah.com](https://www.moalimgypsumboardmakkah.com)

---

## ✨ Features

| | |
|---|---|
| 🌍 **Bilingual** | Arabic at `/` (RTL), English at `/en` (LTR), with correct `hreflang` pairs |
| 🔍 **SEO built in** | Per-page metadata, canonicals, Open Graph, auto-generated `sitemap.xml` and `robots.txt` |
| 📊 **Structured data** | JSON-LD for `LocalBusiness`, `Service`, `FAQPage`, `VideoObject` and `BreadcrumbList` |
| 📱 **Mobile first** | Sticky call + WhatsApp bar, tested from 360px up |
| 💬 **No-backend contact form** | Composes a pre-filled WhatsApp message — nothing to host, nothing to leak |
| 🎞️ **Gallery & lightbox** | Project photos and videos with keyboard navigation and RTL-aware arrows |
| 🎬 **Motion** | Scroll-triggered reveals and hover transitions, all disabled under `prefers-reduced-motion` |
| ↩️ **301 redirects** | Every old WordPress URL and image path is mapped, so search rankings transfer |
| 🗂️ **No CMS, no database** | Content lives in typed TypeScript files — nothing to patch, nothing to hack |

---

## 🧰 Tech stack

- **[Next.js](https://nextjs.org/)** — App Router, static rendering
- **[TypeScript](https://www.typescriptlang.org/)** — content files are typed, so a missing field is a build error, not a broken page
- **[Tailwind CSS](https://tailwindcss.com/)** — with logical properties throughout for RTL/LTR
- **`next/image`** — automatic resizing and modern formats
- **`next/font`** — self-hosted Arabic fonts, subset to Arabic + Latin
- **[Vercel](https://vercel.com/)** — hosting, CDN and TLS

---

## 📁 Directory structure

```
moalim-gypsum-board/
├── public/
│   ├── media/
│   │   ├── images/              # project photos
│   │   └── videos/              # project videos
│   └── og/                      # 1200×630 link-preview images
├── scrape/                      # notes from the old-site migration (not shipped)
│   └── PHASE1-REPORT.md
├── src/
│   ├── app/
│   │   ├── (ar)/                # Arabic pages        →  /
│   │   ├── (en)/en/             # English pages       →  /en
│   │   ├── sitemap.ts           # sitemap.xml, both languages
│   │   ├── robots.ts            # robots.txt
│   │   └── layout.tsx           # <html lang dir>, fonts, JSON-LD
│   ├── components/              # Header, Hero, GalleryGrid, ContactForm, Footer …
│   ├── content/
│   │   ├── site.ts              # ☎️  phone, WhatsApp, email, social links
│   │   ├── ar.ts                # 🇸🇦 every word of Arabic copy
│   │   ├── en.ts                # 🇬🇧 every word of English copy
│   │   └── media.ts             # image/video registry with pixel dimensions
│   └── lib/
│       ├── jsonld.ts            # Google structured data
│       └── seo.ts               # metadata helpers, OG image map
├── redirects.config.ts          # 301s from the old WordPress URLs
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ How it works

There is no database, no admin panel and no API to call. At build time Next.js reads the content files, renders every page to static HTML, and Vercel serves those files from its CDN.

```
src/content/*.ts  ──►  next build  ──►  static HTML + optimised images  ──►  Vercel CDN
```

Two consequences worth knowing:

1. **Editing content means editing a file.** Change `ar.ts`, commit, push — the site rebuilds and goes live in about a minute.
2. **There is nothing to attack.** No login, no form endpoint, no database. The contact form opens WhatsApp on the visitor's own device.

Language handling is route-based, not cookie-based: `/` renders the Arabic tree with `dir="rtl"`, `/en` renders the English tree with `dir="ltr"`, and both pull from the same components with a different content object.

---

## 🚀 Getting started

**Requirements:** Node.js 20 or newer.

```bash
# 1. Clone
git clone https://github.com/<your-username>/moalim-gypsum-board.git
cd moalim-gypsum-board

# 2. Install
npm install

# 3. Run
npm run dev
```

Open <http://localhost:3000> for Arabic or <http://localhost:3000/en> for English. The page reloads as you save.

No `.env` file is needed. There are no secrets in this project.

---

## 📜 Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000 with hot reload |
| `npm run build` | Production build — exactly what Vercel runs |
| `npm start` | Serve the production build locally (run `build` first) |
| `npm run lint` | ESLint across the project |
| `npm run typecheck` | TypeScript with no emit — catches broken content files |

Before pushing anything, `npm run build` is the one that matters: if it passes locally, it will pass on Vercel.

---

## 🛠️ Using this project for your own business

This is a general-purpose template for a local trade or service business. To make it yours:

1. **Contact details** — edit `src/content/site.ts`. Phone, WhatsApp, email and social links live in one place and propagate to the header, footer, contact page, sticky mobile bar and structured data. Leave a field empty and it disappears everywhere, with no dead link left behind.
2. **Copy** — rewrite `src/content/ar.ts` and `src/content/en.ts`. Both files have the same shape, page by page. Each page carries an `seo` block; keep titles under ~60 characters and descriptions under ~155.
3. **Photos** — drop files into `public/media/images/` using short dash-separated English names, register them in `src/content/media.ts` with their real pixel width and height, then reference the key from the gallery list.
4. **Business data** — update `src/lib/jsonld.ts` with the real business name, area served and opening hours. Do not invent a street address or reviews; Google penalises fabricated business data.
5. **Domain** — replace the site URL in `src/lib/seo.ts` and clear out `redirects.config.ts`, which is specific to this migration.
6. **Deploy** — push to GitHub, import the repo at [vercel.com](https://vercel.com/new), accept the detected settings, deploy. Then add your domain under **Settings → Domains** and create the DNS records Vercel shows you.

The Arabic/RTL groundwork is the part worth reusing: logical CSS properties, font subsetting, `hreflang` pairing and RTL-aware carousel and lightbox controls are all already handled.

---

## 🤝 Contributing

Issues and pull requests are welcome. For anything larger than a typo, open an issue first so we can agree on the approach. Please run `npm run lint` and `npm run build` before submitting.

---

## 📄 License

Released under the **MIT License**.

```
MIT License

Copyright (c) 2026 Muhammad Muaz Bhutta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

> ⚠️ The MIT license covers **the code only**. The photographs, videos, business name and written
> copy in `public/media/` and `src/content/` belong to the business and are **not** covered — replace
> them with your own before reusing this project.

---

<div align="center">

Built by **[Muhammad Muaz Bhutta](https://github.com/)** 🇵🇰 in Saudi Arabia 🇸🇦

</div>
