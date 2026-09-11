"""Extract structured content from scraped Elementor pages into scrape/content.json.

Walks each page's main Elementor document in order, top-level container by
container, and emits one item per widget. Also collects every /wp-content/uploads/
URL referenced anywhere (HTML + inline styles + data-bg + srcset + CSS files).
"""
import html as htmlmod, json, re, sys, urllib.parse
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(r"D:/Websites/moalim-gypsum-board/scrape")
OLD = "moalam-gypsumboard-makkah.com"
UPLOAD_RE = re.compile(r"https?://(?:www\.)?[a-z0-9.-]+/wp-content/uploads/[^\"'\s)<>,]+", re.I)


def norm(u):
    if not u:
        return u
    return urllib.parse.unquote(htmlmod.unescape(u.strip()))


def txt(el):
    if el is None:
        return ""
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()


def img_src(img):
    return norm(img.get("data-src") or img.get("data-lazy-src") or img.get("src") or "")


def blocks(el):
    """Block-level text runs inside a text-editor widget, in order."""
    out = []
    for b in el.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"]):
        if b.find_parent(["li"]) and b.name != "li":
            continue
        t = txt(b)
        if t:
            out.append({"tag": b.name, "text": t})
    if not out:
        t = txt(el)
        if t:
            out.append({"tag": "p", "text": t})
    return out


def widget_item(w):
    wt = (w.get("data-widget_type") or "").split(".")[0]
    c = w.select_one(".elementor-widget-container") or w
    if wt == "heading":
        h = c.find(re.compile(r"^(h[1-6]|p|div|span)$"))
        a = c.find("a")
        return {"type": "heading", "tag": h.name if h else "?", "text": txt(c), "href": norm(a["href"]) if a and a.get("href") else None}
    if wt == "text-editor":
        return {"type": "text", "blocks": blocks(c)}
    if wt == "image":
        img = c.find("img")
        a = c.find("a")
        cap = c.find("figcaption")
        if not img:
            return None
        return {"type": "image", "src": img_src(img), "alt": img.get("alt", ""), "width": img.get("width"), "height": img.get("height"),
                "href": norm(a["href"]) if a and a.get("href") else None, "caption": txt(cap) or None}
    if wt == "button":
        a = c.find("a")
        return {"type": "button", "label": txt(c.select_one(".elementor-button-text") or c), "href": norm(a.get("href")) if a else None}
    if wt == "icon-list":
        items = []
        for li in c.select("li"):
            a = li.find("a")
            items.append({"text": txt(li), "href": norm(a["href"]) if a and a.get("href") else None})
        return {"type": "list", "items": items}
    if wt == "video":
        v = c.find("video")
        ifr = c.find("iframe")
        settings = w.get("data-settings") or ""
        yt = re.search(r'"youtube_url":"([^"]+)"', settings)
        return {"type": "video", "src": norm(v.get("src")) if v else (norm(ifr.get("src")) if ifr else (yt.group(1).replace("\\/", "/") if yt else None)),
                "poster": norm(v.get("poster")) if v and v.get("poster") else None}
    if wt == "eael-image-accordion":
        items = []
        for it in c.select(".eael-image-accordion-item"):
            bg = it.get("data-bg")
            if not bg:
                m = re.search(r"url\(([^)]+)\)", it.get("style", ""))
                bg = m.group(1) if m and "data:" not in m.group(1) else None
            t = it.select_one(".img-accordion-title")
            d = it.select_one(".overlay-inner p")
            items.append({"image": norm(bg), "title": txt(t), "text": txt(d) or None})
        return {"type": "accordion", "items": items}
    if wt in ("google_maps", "html"):
        ifr = c.find("iframe")
        if ifr:
            return {"type": "iframe", "src": norm(ifr.get("src")), "title": ifr.get("title")}
        return {"type": "html", "text": txt(c)}
    if wt in ("social-icons", "elementskit-social-media"):
        return {"type": "social", "links": [norm(a["href"]) for a in c.find_all("a") if a.get("href")]}
    if wt in ("elementskit-blog-posts", "elementskit-post-list"):
        items = []
        for p in c.select(".elementskit-blog-block-post, .elementskit-post-image-card, li"):
            a = p.find("a", href=True)
            img = p.find("img", attrs={"data-src": True}) or p.find("img")
            title = p.select_one(".entry-title, .elementor-icon-list-text, .elementskit-post-title")
            ex = p.select_one(".elementskit-post-footer p, .elementskit-post-body p")
            items.append({"title": txt(title) or txt(a), "href": norm(a["href"]) if a else None,
                          "image": img_src(img) if img else None, "excerpt": txt(ex) or None})
        return {"type": "posts", "items": items}
    if wt == "wpforms":
        fields = []
        for f in c.select(".wpforms-field"):
            lab = f.select_one("label.wpforms-field-label")
            inp = f.select_one("input, textarea, select")
            if not inp:
                continue
            fields.append({"label": txt(lab).replace("*", "").strip(), "tag": inp.name, "type": inp.get("type"),
                           "required": bool(inp.has_attr("required") or f.select_one(".wpforms-required-label")),
                           "placeholder": inp.get("placeholder")})
        sub = c.select_one("button[type=submit], .wpforms-submit")
        return {"type": "form", "fields": fields, "submit": txt(sub)}
    if wt == "ekit-nav-menu":
        return {"type": "nav", "items": [{"text": txt(a), "href": norm(a.get("href"))} for a in c.select("a.ekit-menu-nav-link, .elementskit-navbar-nav > li > a")]}
    return {"type": wt or "unknown", "text": txt(c)}


def container_bg(el):
    bg = el.get("data-bg")
    if bg:
        return norm(bg)
    m = re.search(r"url\(['\"]?([^)'\"]+)", el.get("style", ""))
    if m and "data:" not in m.group(1):
        return norm(m.group(1))
    return None


def walk_sections(root):
    """Top-level containers of an Elementor document, each with its widgets in order."""
    sections = []
    tops = [ch for ch in root.find_all(recursive=False) if isinstance(ch, Tag) and ("e-con" in ch.get("class", []) or "elementor-section" in ch.get("class", []))]
    if not tops:
        tops = [root]
    for i, sec in enumerate(tops):
        items = []
        bgs = [b for b in [container_bg(sec)] + [container_bg(x) for x in sec.select(".e-con, .elementor-section, .elementor-column")] if b]
        for w in sec.select("[data-widget_type]"):
            if w.find_parent(attrs={"data-widget_type": True}):
                continue
            it = widget_item(w)
            if it:
                items.append(it)
        sections.append({"index": i, "id": sec.get("data-id"), "backgrounds": bgs, "items": items})
    return sections


def meta(soup, **kw):
    t = soup.find("meta", attrs=kw)
    return htmlmod.unescape(t["content"]) if t and t.get("content") else None


def main():
    pages = json.loads((ROOT / "pages.json").read_text(encoding="utf-8"))
    uploads = {}
    out = {"source": f"https://{OLD}", "pages": [], "header": None, "footer": None}

    def add_up(u, where):
        u = norm(u).rstrip("\\")
        if "/google-fonts/" in u:
            return
        uploads.setdefault(u, set()).add(where)

    for p in pages:
        fn = ROOT / "html" / f"{p['lang']}-{p['key']}.html"
        raw = fn.read_text(encoding="utf-8")
        soup = BeautifulSoup(raw, "html.parser")
        for m in UPLOAD_RE.finditer(raw):
            add_up(m.group(0), f"{p['lang']}-{p['key']}")
        canon = soup.find("link", rel="canonical")
        # ElementsKit header/footer templates also render as data-elementor-type="wp-post",
        # so skip anything inside their wrappers and take the largest remaining document.
        candidates = [
            el for el in soup.select('[data-elementor-type="wp-page"], [data-elementor-type="wp-post"], [data-elementor-type="single-post"]')
            if not el.find_parent(class_=re.compile(r"^ekit-template-content-(header|footer)$"))
            and not el.find_parent(attrs={"data-elementor-type": True})
        ]
        body_root = max(candidates, key=lambda el: len(el.get_text(" ", strip=True)), default=None)
        page = {
            "key": p["key"], "lang": p["lang"], "url": p["url"],
            "html_lang": (soup.html or {}).get("lang"), "dir": (soup.html or {}).get("dir"),
            "title": txt(soup.title), "description": meta(soup, name="description"),
            "canonical": norm(canon["href"]) if canon else None,
            "og": {k: meta(soup, property=f"og:{k}") for k in ("title", "description", "image", "type", "url")},
            "h1": [txt(h) for h in soup.find_all("h1")],
            "jsonld_types": sorted({t for s in soup.find_all("script", type="application/ld+json") for t in re.findall(r'"@type":"([^"]+)"', s.string or "")}),
            "body_root": body_root.get("data-elementor-type") if body_root else None,
            "sections": walk_sections(body_root) if body_root else [],
        }
        if not body_root:
            art = soup.select_one("article, main, .entry-content")
            page["fallback_text"] = txt(art)[:4000] if art else None
        out["pages"].append(page)

        if p["key"] == "home":
            hdr = soup.select_one(".ekit-template-content-header, header")
            ftr = soup.select_one(".ekit-template-content-footer, footer")
            out.setdefault("chrome", {})[p["lang"]] = {
                "header": walk_sections(hdr.select_one("[data-elementor-type]") or hdr) if hdr else None,
                "footer": walk_sections(ftr.select_one("[data-elementor-type]") or ftr) if ftr else None,
                "footer_text": txt(ftr) if ftr else None,
            }

    for css in (ROOT / "raw" / "css").glob("*.css"):
        for m in UPLOAD_RE.finditer(css.read_text(encoding="utf-8", errors="ignore")):
            add_up(m.group(0), "css")

    (ROOT / "content.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    (ROOT / "raw" / "upload-refs.json").write_text(json.dumps({k: sorted(v) for k, v in sorted(uploads.items())}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("pages:", len(out["pages"]), "| upload refs:", len(uploads))
    for pg in out["pages"]:
        n = sum(len(s["items"]) for s in pg["sections"])
        print(f"{pg['lang']}-{pg['key']}: root={pg['body_root']} sections={len(pg['sections'])} items={n} h1={len(pg['h1'])} | {pg['title'][:60]}")


if __name__ == "__main__":
    main()
