# Phase 1 — Crawl & download report

Source: `https://moalam-gypsumboard-makkah.com` (WordPress 6.8 + Elementor 4.2 + ElementsKit + AIOSEO + Weglot)
Crawled: 2026-09-12

## Pages (11 unique, each also fetched under `/en/`)

| Key | Old Arabic URL | H1 on old site |
|---|---|---|
| home | `/` | معلم جبس جبسم بورد مكة |
| about | `/من-نحن/` | — (none) |
| services | `/خدماتنا/` | — (none) |
| gallery | `/معرض-الأعمال/` | معرض الأعمال |
| faq | `/الأسئلة-الشائعة/` | — (none) |
| contact | `/اتصل-بنا/` | — (none) |
| blog | `/مقالات/` | أفكار مبتكرة لديكورات الجبس بورد… |
| privacy | `/سياسة-الخصوصية/` | — (none) |
| terms | `/الشروط-والأحكام/` | — (none) |
| post | `/معلم-جبس-جبسم-بورد-مكة-0599480178/` | — (none) |
| post | `/دیکورات-جبس-بورد-مكة-0599480178/` | ديكورات جبس بورد **الدمام** … |

Also in the sitemap but not real pages: `/category/uncategorized/`, `?elementskit_template=header|footer`.

**English:** `/en/*` exists only as a Weglot switcher. The served HTML is identical Arabic text and, in a
real browser, `/en/` redirects to `/`. There is **no English copy** to reuse — it must be written.

## Assets

- Referenced upload URLs (incl. WordPress resize variants): **80**
- Unique originals downloaded: **41** (35 images, 6 MP4) — 2 byte-identical duplicates collapsed
- Derived: 30 WebP siblings (only kept when ≥10% smaller), 6 video poster frames
- On disk in `public/media/`: **77 files, 28.02 MB** (videos 18.35 MB, images 7.66 MB, WebP 1.77 MB, posters 0.23 MB)
- Failed downloads: **0**
- Map: `scrape/media-map.json` (old URL → new path, width, height, bytes, webp, poster, duration)

Not downloaded, on purpose:
- ~40 Astra "electrician" theme demo images still in the media library (template files, not client material)
- Unused library items (Abu Anas / Dammam logo variants, orphaned uploads)
- Fonts hotlinked from `gypsum-decore-dammam.com` (stock Google Fonts; will use `next/font`)

## Removed / not carried over
- Footer credit link `7csdigitalsolutions.com`
- TikTok tracking params `?_t=…&_r=1`
- Plugins/scripts: Weglot, Chaty, WPForms, Hostinger Reach, wp-emoji, jQuery, lazysizes, Elementor runtime
- No analytics/ad pixels were found (no GA/GTM/Meta/TikTok IDs)

## ⚠ Content that belongs to another business (Abu Anas Gypsum Decor, Dammam)
- "الدمام" appears 109× across Arabic pages; phone `0549096677` 38×; `gypsum-decore-dammam.com` 11×
- Every page `<title>`, most meta descriptions and OG/Twitter tags say "جبس-ديكور-الدمام | … ابوانس"
- Both blog posts are Dammam articles (body text, H1/H2, image alt) published under Makkah slugs
- Privacy + terms body text name the Dammam business
- Contact page map embed is pinned on "معلم جبس بورد الدمام" at 26.445 N, 50.092 E (Dammam)

## ⚠ Images whose ownership is doubtful
| File | Issue |
|---|---|
| `blog-gypsum-board-decor.jpg`, `blog-gypsum-board-master.jpg` | Ad graphics branded ABU ANAS GYPSUM DECOR + Dammam phone + domain |
| `home-ceiling-work.png` | Haraj.com.sa watermark |
| `home-maxresdefault.png` | Someone else's YouTube thumbnail |
| `home-ceiling-installation.png`, `home-gypsum-master.png`, `hero-banner.png`, `home-2324.png`, `home-5-29.png` | Stock / web images |
| `gallery-bedroom-decor.jpg`, `gallery-strip-light.jpg` | "Galaxy S24 Ultra · Omar Al Hilali" camera watermark |
| `gallery-light-installation.jpg`, `gallery-entrance-decor.jpg`, `gallery-kitchen-decor.jpg` | Same pictures used inside the Abu Anas ad graphics |
| `gallery-cinema-panel.jpg`, `gallery-bathroom-gypsum-board.jpg` | Phone screenshots (Instagram heart / Google Lens icon visible) |
| `gallery-ladies-majlis.jpg`, `gallery-dressing-room.jpg`, `gallery-bedroom-bed-wall.jpg` | Look like 3D renders from the web |

Clearly the client's own: all 6 videos (on-site job footage), the logo, and the remaining gallery photos.
