# What changed compared with the old site

The text, photos and videos are the client's own, copied across from
`moalam-gypsumboard-makkah.com`. This file lists every place where the new site does **not**
match the old one, and why.

## 1. Another business's details removed (the big one)

The old site was built from a copy of a Dammam company's website ("ABU ANAS GYPSUM DECOR",
`gypsum-decore-dammam.com`). Its details were still all over the Makkah site:

| Where | Old site | New site |
|---|---|---|
| Every page title, meta description, OG/Twitter tag | "جبس-ديكور-الدمام \| معلم جبس بورد الدمام ابوانس" | Written fresh for Makkah (see §4) |
| Both blog posts (title, headings, body) | "الدمام" throughout | "مكة" |
| Privacy policy + terms body text | "جبس-ديكور-الدمام" | "جبس ديكور مكة" |
| Buttons at the bottom of privacy/terms/blog posts | `tel:966549096677`, `wa.link/keo3ir` | The client's number `0599480178` / `wa.me/966599480178` |
| Contact page map | Embedded map pinned on **Dammam** (26.445 N, 50.092 E) | Removed — replaced with a "service area: Makkah" card linking to Google Maps |

"الدمام" appeared 109 times and the Dammam phone number `0549096677` 38 times. Neither appears
on the new site.

## 2. Images left out

| Image | Why |
|---|---|
| `دیکورات-جبس-بورد-الدمام-0549096677.jpg` | Advertisement graphic with the **Dammam company's name, phone number and website printed on it** |
| `معلم-جبس-جبسم-بورد-الدمام-0549096677.jpg` | Same |
| `1280x960_F6F879FA…png` (home page) | Carries a **Haraj.com.sa watermark** |
| `maxresdefault-1.png` (home page) | A **YouTube video thumbnail** |

The two blog-post images were replaced with the client's own project photos. The two home-page
photos were replaced with frames from the client's own job videos. The files are kept out of the
website in `scrape/excluded-media/` in case the client wants them back.

**Still in use but worth checking** (kept because they were the client's chosen photos, but they
do not look like the client's own work): the hero photo and one gallery photo carry a
"Galaxy S24 Ultra · Omar Al Hilali" camera watermark; three gallery photos also appear inside the
Dammam company's adverts; two are phone screenshots (an Instagram heart and a Google Lens icon are
visible); and a few look like stock renders. See `scrape/PHASE1-REPORT.md` for the full list.

## 3. Text fixes

- **Persian letters replaced with Arabic ones.** The old site wrote "دیکورات" and "سیمنت" with the
  Persian ی and ک. Search engines treat those as different letters, so the pages could not match
  Arabic searches. Now spelled "ديكورات" and "سيمنت".
- **Three sentences on the home page stopped mid-sentence** (they ended in a comma). Completed:
  - Pakistani gypsum section: "…لضمان المتانة والجودة العالية." 
  - "معلم جبس بورد مكة" card: "…سواء كنت تبحث عن ديكورات جبسية للأسقف أو الجدران أو البارتيشن."
  - Cement board card: "…ما يجعله خيارًا مناسبًا للواجهات والأماكن الرطبة."
- **Spacing and typos:** "جبس-ديكور- مكة" → "جبس ديكور مكة"; "لل رخام" → "للرخام"; a stray hyphen
  before "ديكورات جبس بورد باكستاني مكة"; "نقدم خدماتنا مكة" → "نقدم خدماتنا في مكة";
  "عزل صوتي وفعال" → "عزلًا صوتيًا فعّالًا"; gallery captions tidied ("جدادجبسم بورد" → "جدار جبسم بورد").
- **Video titles rewritten.** The old captions were dictation errors
  ("‏شو السقف جدران جدران سوا سوا إنارة مكفي جدار كله شغل مهل", "‏شغل الاستراحة مال جهال"). They now
  describe what the clip shows, e.g. "سقف وجدران بإنارة مخفية".
- **Privacy policy corrected to match reality.** The old text said the site uses cookies and
  collects analytics. The new site does neither, so that section now says so. It also explains that
  the contact form opens WhatsApp and stores nothing on the server.

## 4. Structure and SEO

- **Every page now has exactly one `<h1>`.** On the old site, six pages (about, services, FAQ,
  contact, privacy, terms) had no `<h1>` at all, and one blog post's `<h1>` was for Dammam.
- **Headings follow a real order** (h1 → h2 → h3, no skipped levels).
- **New titles and descriptions** for every page in both languages, written around real searches
  (معلم جبس بورد مكة، جبس بورد مكة، اسعار جبس بورد مكة، ديكورات جبسية مكة، جبس عادي مكة، سيمنت بورد مكة).
- **New page addresses** (`/services` instead of `/خدماتنا`), with **301 redirects** from all the old
  addresses — pages, blog posts, categories, feeds, old sitemaps and every old image URL.
- **Structured data** added: business details, services, FAQ, videos, breadcrumbs and blog posts.

## 5. English

The old `/en/` pages were not really English — the translation plugin (Weglot) was no longer
working, so `/en/` showed Arabic text and redirected to the Arabic home page. The English site has
been **written from scratch** as a translation of the Arabic. It is worth a read-through by someone
who knows the business.

## 6. Things that behave differently

- **Contact form:** the old one emailed through a WordPress plugin. The new one validates the
  fields and opens WhatsApp with the message ready to send — no server, nothing stored.
- **Gallery:** the old hover-expanding strips are now a photo grid; clicking a photo opens it
  larger (keyboard and screen-reader accessible).
- **Videos:** they now show a preview image and only download the video when someone presses play.
  On the home page the previews link to the gallery page, where the players live.
- **Maps:** no embedded Google map anywhere (it loaded Google scripts on every visit and pointed at
  Dammam). There is a link to Makkah on Google Maps instead.
- **Chat widget, translation bar, cookie/emoji scripts:** all removed.
- **Footer credit** to the previous developer (`7csdigitalsolutions.com`) removed.
- **Social links:** kept, with the tracking parameters stripped from the TikTok link.

## 7. Left out on purpose

- **Opening hours** and a **street address** — the old site never published them, so they are not in
  the business's structured data. Send them over and they can be added.
- **No reviews, ratings or counts** were invented.

## 8. Update — motion and the work panels

Added after review, at the client's request. This supersedes the "Gallery" line in §6.

- **"اكتشف أعمالنا" now matches the old site.** Two large photo panels per row (440px tall on
  desktop), each caption hidden until you hover, then sliding into the middle of the photo over a
  dark veil — the same `#00000096` veil and the same 0.3s/0.4s timings the old site used. Two
  improvements on top: on phones and tablets (where there is no hover) the captions stay visible,
  and keyboard focus reveals them as well. The gallery page keeps its lightbox on top of the panels.
- **Entrance transitions are back.** The old site faded and zoomed sections in as you scrolled
  (Elementor's fade-up/zoom-in). The same effect now runs as CSS scroll-driven animations, so
  nothing is added to the JavaScript the visitor downloads. It is skipped entirely for anyone whose
  device asks for reduced motion, and browsers that do not support it simply show the content.
- **Hover transitions** on service and article cards (lift + slow photo zoom), footer links, social
  buttons and the floating call/WhatsApp buttons.
