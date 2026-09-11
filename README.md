# معلم جبس بورد مكة — website

The website for **Gypsum Board Master Makkah** (moalim-gypsumboard-makkah.com).
Arabic is the main language at `/`; English is at `/en`.

Built with Next.js, TypeScript and Tailwind CSS. There is no database and no CMS: all text lives in
plain files under `src/content/`, and all photos and videos live in `public/media/`.

---

## 1. Run it on your computer

You need **Node.js 20 or newer** (download from nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Arabic) or http://localhost:3000/en (English).
The page reloads by itself when you save a file.

To check that everything builds exactly like it will on Vercel:

```bash
npm run build
npm start
```

---

## 2. Change the phone number, WhatsApp, email or social links

Open **`src/content/site.ts`**. Everything is in one place:

```ts
phone:    { display: "0599480178", tel: "+966599480178" },
phone2:   { display: "05XXXXXXXX" },        // second number
whatsapp: "966599480178",                   // country code + number, no "+" or leading 0
email:    "zubut238238@gmail.com",
social:   { facebook: "…", tiktok: "…" },
```

The change appears everywhere automatically — header, footer, contact page, the sticky call bar on
phones, the WhatsApp contact form, and Google's structured data.

**Second phone number:** replace `05XXXXXXXX` with the real number (for example `"0551234567"`).
While it is still the placeholder it is hidden; as soon as it is a real Saudi mobile number it shows
up on the site.

---

## 3. Change any text

- Arabic text: **`src/content/ar.ts`**
- English text: **`src/content/en.ts`**

Both files have the same shape, page by page (`home`, `about`, `services`, `gallery`, `faq`,
`contact`, `blog`, `privacy`, `terms`, `posts`). Each page also has an `seo` block with the title and
description Google shows in search results — keep titles under ~60 characters and descriptions
under ~155.

---

## 4. Add a photo to the gallery

1. **Copy the photo** into `public/media/images/`. Use a short English file name with dashes, no
   spaces or Arabic letters, e.g. `gallery-majlis-ceiling.jpg`.
2. **Find its size in pixels.** On Windows: right-click the file → *Properties* → *Details*
   (Width and Height). On Mac: open it in Preview → *Tools* → *Show Inspector*.
3. **Register it** in `src/content/media.ts`, inside `images = { … }`:

   ```ts
   'gallery-majlis-ceiling': { src: '/media/images/gallery-majlis-ceiling.jpg', original: '/media/images/gallery-majlis-ceiling.jpg', width: 1080, height: 1440 },
   ```

4. **Show it on the gallery page** by adding a line to `gallery.items` in **both** `ar.ts` and `en.ts`:

   ```ts
   { image: "gallery-majlis-ceiling", title: "ديكور مجلس", alt: "مجلس بسقف جبس بورد وإضاءة مخفية" },
   ```

   `alt` describes the photo for Google and for blind visitors — write what is in the picture.
   To also show it on the home page, add the same line to `home.work.items`.

Photos are resized and converted automatically for each screen size, so you can upload the original
phone photo (ideally under ~2 MB).

---

## 5. Add a blog post

1. Pick a short English web address for it, e.g. `gypsum-ceiling-prices-makkah`.
2. In **`src/content/ar.ts`**, add a new entry at the **top** of the `posts: [ … ]` list (copy an
   existing post and edit it):

   ```ts
   {
     slug: "gypsum-ceiling-prices-makkah",
     datePublished: "2026-10-01",
     dateModified: "2026-10-01",
     title: "…",                                  // the heading on the page
     seo: { title: "…", description: "…" },       // what Google shows
     pic: { image: "gallery-reception-hall", alt: "…" },  // any image key from media.ts
     excerpt: "…",                                // short summary on the blog list
     blocks: [
       { type: "p", text: "A paragraph…" },
       { type: "h2", text: "A sub-heading" },
       { type: "ul", items: ["point one", { label: "Bold part", text: "rest of the point" }] },
       { type: "img", pic: { image: "gallery-tv-wall-decor", alt: "…" } },
     ],
   },
   ```

3. Add the English version to **`src/content/en.ts`** with the **same `slug`**.
4. The post appears on `/blog` and `/en/blog`, gets its own page at `/blog/<slug>`, and is added to
   the sitemap automatically. (Optional: to give it its own sharing image, put a 1200×630 JPG in
   `public/og/` and add it to `ogImages` in `src/lib/seo.ts`; otherwise the home image is used.)

---

## 6. Publishing changes

Once the site is connected to Vercel (below), every change you push to GitHub goes live by itself
within about a minute:

```bash
git add .
git commit -m "Add majlis photo to gallery"
git push
```

---

## 7. First-time deployment (GitHub → Vercel → your domain)

### a) Put the code on GitHub

1. Create a free account at github.com and click **New repository**. Name it
   `moalim-gypsumboard-makkah`, choose **Private**, and do **not** add a README or .gitignore.
2. In this folder run:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/<your-username>/moalim-gypsumboard-makkah.git
   git push -u origin main
   ```

### b) Import into Vercel

1. Sign in at vercel.com with the GitHub account.
2. **Add New… → Project → Import** the `moalim-gypsumboard-makkah` repository.
3. Leave every setting as it is (Vercel detects Next.js) and click **Deploy**. No environment
   variables are needed.
4. You get a working address like `moalim-gypsumboard-makkah.vercel.app`. Check it.

### c) Connect moalim-gypsumboard-makkah.com (DNS at Cloudflare)

1. In Vercel: **Project → Settings → Domains → Add** `moalim-gypsumboard-makkah.com`.
   When asked, also add `www.moalim-gypsumboard-makkah.com` and choose to **redirect www to the main
   domain**.
2. Vercel then shows the exact DNS records to create. In Cloudflare: **your domain → DNS → Records →
   Add record**, and create them. They normally look like this:

   | Type  | Name  | Content                  | Proxy status |
   |-------|-------|--------------------------|--------------|
   | A     | `@`   | `76.76.21.21`            | **DNS only** (grey cloud) |
   | CNAME | `www` | `cname.vercel-dns.com`   | **DNS only** (grey cloud) |

   If Vercel shows different values (it sometimes gives a project-specific CNAME or a newer IP),
   use **exactly what Vercel shows** — those take priority over this table.
3. **Delete any old A, AAAA or CNAME records** for `@` and `www` that point somewhere else.
4. Keep the records on **DNS only** (grey cloud). Vercel issues the HTTPS certificate itself and
   already serves the site from a global CDN. (If you ever switch the orange cloud on, set
   Cloudflare **SSL/TLS → Full (strict)**, otherwise you will get redirect loops.)
5. If the domain has **CAA** records, add one allowing `letsencrypt.org`, or the certificate can't
   be issued.
6. Wait a few minutes; Vercel's Domains page turns green ("Valid Configuration"). Done.

### d) After launch

- Add the site to **Google Search Console** (search.google.com/search-console → Domain property →
  verify with the TXT record it gives you, in Cloudflare DNS) and submit
  `https://moalim-gypsumboard-makkah.com/sitemap.xml`.
- If you ever regain control of the old domain `moalam-gypsumboard-makkah.com`, add it to the same
  Vercel project as a **redirect to moalim-gypsumboard-makkah.com**. All old page and image
  addresses are already mapped (see `redirects.config.ts`), so Google transfers the old rankings.

---

## Where things are

```
src/content/site.ts        phone, WhatsApp, email, social links
src/content/ar.ts          all Arabic text
src/content/en.ts          all English text
src/content/media.ts       list of images/videos with their pixel sizes
src/components/            the building blocks (Header, Hero, GalleryGrid, ContactForm, …)
src/app/(ar)/              Arabic pages       →  /
src/app/(en)/en/           English pages      →  /en
src/app/sitemap.ts         sitemap.xml (both languages)
src/lib/jsonld.ts          Google structured data (business, services, FAQ, videos, breadcrumbs)
redirects.config.ts        301 redirects from the old WordPress addresses
public/media/              photos and videos
public/og/                 images used when a link is shared on WhatsApp / social media
scrape/                    notes and scripts from copying the old site (not part of the website)
```

## Things to confirm with the client

- **Photo rights.** Several photos on the old site look like they came from the internet (stock
  renders, screenshots, another person's camera watermark). They are kept for now but listed in
  `scrape/PHASE1-REPORT.md`. Replace them with the client's own project photos when possible.
- **Opening hours** and a **street address** were never published, so they are left out of Google's
  business data. Add them to `src/lib/jsonld.ts` if the client wants them shown.
