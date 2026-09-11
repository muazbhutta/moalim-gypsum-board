"""Download every referenced upload (originals only) into public/media/ with ASCII slugs.

- WordPress resize variants (-300x200 etc.) are mapped to their original.
- Byte-identical files are stored once.
- Images get real width/height; a .webp sibling is written when it is smaller.
- Videos get dimensions + duration + a poster frame when ffmpeg/ffprobe exist.
Writes scrape/media-map.json (old URL -> new path + metadata) and scrape/media-report.json.
"""
import hashlib, json, re, shutil, subprocess, time, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image

PROJECT = Path(r"D:/Websites/moalim-gypsum-board")
SCRAPE = PROJECT / "scrape"
PUB = PROJECT / "public" / "media"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36"
RLM = "\u200f"

# original upload path (after /uploads/, RLM stripped) -> ascii slug (no extension)
SLUGS = {
    "2025/02/banner1.png": "hero-banner",
    "2025/02/file_000000003af461faab9b3eb3bf2bc985-removebg-preview-e1761905978703.png": "logo",
    "2025/02/cropped-file_000000003af461faab9b3eb3bf2bc985-removebg-preview-e1761905978703.png": "site-icon",
    "2025/02/الأسقف-الحديثة.webp": "service-modern-ceilings",
    "2025/02/الديكورات-الداخلية-والخارجية.webp": "service-interior-exterior-decor",
    "2025/02/بدائل-المواد.webp": "service-material-alternatives",
    "2025/02/جدران-البارتيشن.webp": "service-partition-walls",
    "2025/02/الديكور-شاشه-الدمام.jpeg": "gallery-tv-wall-decor",
    "2025/02/جبسون-بورد-ديكور-حمام.jpeg": "gallery-bathroom-gypsum-board",
    "2025/02/جدادجبسم-بورد.jpeg": "gallery-gypsum-board-wall",
    "2025/02/جديد-تركيب-لايت-لمبات.jpeg": "gallery-light-installation",
    "2025/02/ديكور-برابيس-صلاه.jpeg": "gallery-prayer-area-decor",
    "2025/02/ديكور-جبس-ثريا-نجف.jpeg": "gallery-chandelier-ceiling",
    "2025/02/ديكور-جبس-كورنيش.jpeg": "gallery-gypsum-cornice",
    "2025/02/ديكور-عالم-سترونج-60-60.jpeg": "gallery-strong-60x60-ceiling",
    "2025/02/ديكور-مدخل.jpeg": "gallery-entrance-decor",
    "2025/02/ديكور-مطبخ.jpeg": "gallery-kitchen-decor",
    "2025/02/ديكورات-لوحة-سينمائية-بورد.jpeg": "gallery-cinema-panel",
    "2025/02/ستريك-لايت.jpeg": "gallery-strip-light",
    "2025/02/غرفه-نوم-ديكور-1.jpeg": "gallery-bedroom-decor",
    "2025/02/غرفه-نوم-ديكور.jpeg": "gallery-bedroom-decor",
    "2025/02/الجدار-إنارة-مكفي.jpeg": "gallery-wall-hidden-lighting",
    "2025/02/الجديد-شكل-مخفيات.jpeg": "gallery-hidden-lighting-design",
    "2025/02/ديكور-أبواب-جبسون-بورد.jpeg": "gallery-gypsum-board-doors",
    "2025/02/ديكور-صالة-استقبال.jpeg": "gallery-reception-hall",
    "2025/02/ديكور-صالة-حريم.jpeg": "gallery-ladies-majlis",
    "2025/02/ديكور-غرفة-ملابس-1.jpeg": "gallery-dressing-room",
    "2025/02/ديكور-غرفة-ملابس.jpeg": "gallery-dressing-room",
    "2025/02/ديكور-غرفة-نوم-سرير.jpeg": "gallery-bedroom-bed-wall",
    "2025/02/دیکورات-جبس-بورد-الدمام-0549096677.jpg": "blog-gypsum-board-decor",
    "2025/02/معلم-جبس-جبسم-بورد-الدمام-0549096677.jpg": "blog-gypsum-board-master",
    "2025/10/2324.png": "home-2324",
    "2025/10/5-29.png": "home-5-29",
    "2025/10/maxresdefault-1.png": "home-maxresdefault",
    "2025/10/معلم-جبس-جدة-1.png": "home-gypsum-master",
    "2025/11/1280x960_F6F879FA-F725-4E2A-8E98.png": "home-ceiling-work",
    "2025/11/51968676_ceiling-installation-wi.png": "home-ceiling-installation",
    "2025/02/ديكورات-السلالم-بالجبس.mp4": "video-staircase-gypsum-decor",
    "2025/02/ديكورات-جبس.mp4": "video-gypsum-decor",
    "2025/02/تركيب-سبعة-سبعة-شغل-تركيب-خديجة-جبسون-بورد-2.mp4": "video-gypsum-board-installation",
    "2025/02/ديكورات-الصالة-ستارة.mp4": "video-living-room-curtain-decor",
    "2025/02/شغل-الاستراحة-مال-جهال.mp4": "video-rest-house-work",
    "2025/02/شو-السقف-جدران-جدران-سوا-سوا-إنارة-مكفي-جدار-كله-شغل-مهل.mp4": "video-ceiling-walls-hidden-lighting",
}

VARIANT = re.compile(r"-\d+x\d+(?=\.[a-z0-9]+$)", re.I)


def rel(u):
    return u.split("/wp-content/uploads/", 1)[1]


def key(r):
    return r.replace(RLM, "")


def fetch(url):
    parts = urllib.parse.urlsplit(url)
    q = urllib.parse.urlunsplit(parts._replace(path=urllib.parse.quote(parts.path)))
    last = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(q, headers={"User-Agent": UA}), timeout=120) as r:
                return r.read()
        except Exception as e:
            last = e
            time.sleep(1.5 * (attempt + 1))
    raise last


def _ffmpeg():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return None


FFMPEG = _ffmpeg()


def probe_video(path):
    """Display dimensions (rotation applied) and duration, parsed from `ffmpeg -i` stderr."""
    if not FFMPEG:
        return {}
    err = subprocess.run([FFMPEG, "-hide_banner", "-i", str(path)], capture_output=True, text=True, encoding="utf-8", errors="ignore").stderr
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", err)
    dim = re.search(r"Video: .*?, (\d{2,5})x(\d{2,5})", err)
    rot = re.search(r"rotat(?:e|ion of)\s*:?\s*(-?[\d.]+)", err)
    w, h = (int(dim.group(1)), int(dim.group(2))) if dim else (None, None)
    if rot and w and abs(float(rot.group(1))) % 180 == 90:
        w, h = h, w
    return {"width": w, "height": h,
            "duration": round(int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3)), 1) if dur else None}


def make_poster(video, dest):
    if not FFMPEG:
        return False
    r = subprocess.run([FFMPEG, "-y", "-v", "error", "-ss", "1", "-i", str(video), "-frames:v", "1", "-q:v", "3", str(dest)], capture_output=True)
    return r.returncode == 0 and dest.exists()


def main():
    refs = json.loads((SCRAPE / "raw" / "upload-refs.json").read_text(encoding="utf-8"))
    lib = {key(rel(i["source_url"])): i for i in json.loads((SCRAPE / "raw" / "media-1.json").read_text(encoding="utf-8"))}
    (PUB / "images").mkdir(parents=True, exist_ok=True)
    (PUB / "videos").mkdir(parents=True, exist_ok=True)

    # group every referenced URL under its original
    originals = {}
    for u in refs:
        if "moalam-gypsumboard-makkah.com" not in u:
            continue
        r = rel(u)
        orig_r = VARIANT.sub("", r)
        if key(orig_r) not in SLUGS and key(r) in SLUGS:
            orig_r = r
        if key(orig_r).startswith("2025/02/cropped-file_"):  # favicon sizes -> cropped site icon original
            orig_r = VARIANT.sub("", r)
        originals.setdefault(orig_r, set()).add(u)

    by_hash, media_map, failed, unmapped = {}, {}, [], []
    base = "https://moalam-gypsumboard-makkah.com/wp-content/uploads/"
    for orig_r, urls in sorted(originals.items()):
        slug = SLUGS.get(key(orig_r))
        if not slug:
            unmapped.append(orig_r)
            continue
        url = base + orig_r
        try:
            data = fetch(url)
        except Exception as e:
            failed.append({"url": url, "error": str(e)})
            continue
        h = hashlib.sha1(data).hexdigest()
        ext = orig_r.rsplit(".", 1)[1].lower().replace("jpeg", "jpg")
        if h in by_hash:
            entry = dict(by_hash[h], duplicate_of=by_hash[h]["path"])
        else:
            is_video = ext == "mp4"
            folder = PUB / ("videos" if is_video else "images")
            dest = folder / f"{slug}.{ext}"
            dest.write_bytes(data)
            entry = {"path": f"/media/{folder.name}/{dest.name}", "bytes": len(data), "type": "video" if is_video else "image", "sha1": h}
            if is_video:
                info = probe_video(dest)
                li = (lib.get(key(orig_r)) or {}).get("media_details") or {}
                entry.update(width=info.get("width") or li.get("width"), height=info.get("height") or li.get("height"),
                             duration=info.get("duration") or li.get("length"))
                poster = folder / f"{slug}-poster.jpg"
                if make_poster(dest, poster):
                    with Image.open(poster) as im:
                        entry["poster"] = {"path": f"/media/videos/{poster.name}", "width": im.width, "height": im.height, "bytes": poster.stat().st_size}
            else:
                with Image.open(dest) as im:
                    entry.update(width=im.width, height=im.height, format=im.format, mode=im.mode)
                    if ext != "webp":
                        wp = folder / f"{slug}.webp"
                        keep_alpha = im.mode in ("RGBA", "LA", "P")
                        im2 = im.convert("RGBA" if keep_alpha else "RGB")
                        im2.save(wp, "WEBP", quality=82, method=6)
                        if wp.stat().st_size < len(data) * 0.9:
                            entry["webp"] = {"path": f"/media/images/{wp.name}", "bytes": wp.stat().st_size}
                        else:
                            wp.unlink()
            by_hash[h] = entry
        for u in sorted(urls):
            e = dict(entry)
            if u != url.replace(orig_r, orig_r):
                m = VARIANT.search(rel(u))
                if m:
                    e["variant"] = m.group(0)[1:]
            media_map[u] = e
        media_map.setdefault(base + orig_r, entry)
        print(f"ok  {entry['path']}  {entry['bytes']:>9}  {entry.get('width')}x{entry.get('height')}" + ("  (dup)" if "duplicate_of" in entry else "") + ("  +webp" if "webp" in entry else "") + ("  +poster" if "poster" in entry else ""))

    files = list(PUB.rglob("*"))
    report = {
        "unique_files_downloaded": len(by_hash),
        "urls_mapped": len(media_map),
        "files_on_disk": sum(1 for f in files if f.is_file()),
        "bytes_on_disk": sum(f.stat().st_size for f in files if f.is_file()),
        "bytes_originals": sum(e["bytes"] for e in by_hash.values()),
        "failed": failed, "unmapped": unmapped,
        "ffmpeg": bool(FFMPEG),
    }
    (SCRAPE / "media-map.json").write_text(json.dumps(media_map, ensure_ascii=False, indent=2), encoding="utf-8")
    (SCRAPE / "media-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
