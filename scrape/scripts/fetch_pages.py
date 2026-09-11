"""Fetch every AR page and its Weglot /en/ twin into scrape/html/ with ASCII names."""
import json, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(r"D:/Websites/moalim-gypsum-board/scrape")
BASE = "https://moalam-gypsumboard-makkah.com"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36"

PAGES = {
    "home": "",
    "about": "من-نحن",
    "services": "خدماتنا",
    "gallery": "معرض-الأعمال",
    "faq": "الأسئلة-الشائعة",
    "contact": "اتصل-بنا",
    "blog": "مقالات",
    "privacy": "سياسة-الخصوصية",
    "terms": "الشروط-والأحكام",
    "post-moalim-gypsum-board-makkah": "معلم-جبس-جبسم-بورد-مكة-0599480178",
    "post-gypsum-board-decor-makkah": "دیکورات-جبس-بورد-مكة-0599480178",
}

out = ROOT / "html"
out.mkdir(parents=True, exist_ok=True)
results = []
for key, slug in PAGES.items():
    for lang in ("ar", "en"):
        path = ("/en/" if lang == "en" else "/") + (slug + "/" if slug else "")
        url = BASE + urllib.parse.quote(path)
        rec = {"key": key, "lang": lang, "slug": slug, "url": BASE + path}
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read()
                rec.update(status=r.status, final_url=urllib.parse.unquote(r.geturl()), bytes=len(body))
            (out / f"{lang}-{key}.html").write_bytes(body)
        except Exception as e:
            rec.update(status="ERR", error=str(e))
        results.append(rec)
        print(f"{rec['status']}\t{lang}-{key}\t{rec.get('bytes', '')}\t{rec.get('error', '')}")
        time.sleep(0.4)

(ROOT / "pages.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
