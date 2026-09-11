"""Build 1200x630 Open Graph images from the client's own photos, with the logo in a corner."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
IMG = ROOT / "public" / "media" / "images"
OUT = ROOT / "public" / "og"
W, H = 1200, 630

JOBS = {
    "home": "gallery-bedroom-decor.jpg",
    "about": "gallery-dressing-room.jpg",
    "services": "home-ceiling-installation.png",
    "gallery": "gallery-reception-hall.jpg",
    "faq": "gallery-strip-light.jpg",
    "contact": "gallery-ladies-majlis.jpg",
    "blog": "gallery-tv-wall-decor.jpg",
    "post-gypsum-board-decor-makkah": "gallery-tv-wall-decor.jpg",
    "post-moalim-gypsum-board-makkah": "gallery-reception-hall.jpg",
    "legal": None,
}

logo = Image.open(IMG / "logo.png").convert("RGBA")


def cover(im, w, h):
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


for name, src in JOBS.items():
    if src:
        canvas = cover(Image.open(IMG / src).convert("RGB"), W, H).convert("RGBA")
        shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(shade)
        for y in range(H):  # darken the bottom so the logo badge reads on any photo
            d.line([(0, y), (W, y)], fill=(20, 16, 10, int(150 * (y / H) ** 1.6)))
        canvas = Image.alpha_composite(canvas, shade)
    else:
        canvas = Image.new("RGBA", (W, H), (246, 235, 211, 255))
    badge_h = 190 if src else 360
    lg = logo.resize((round(logo.width * badge_h / logo.height), badge_h), Image.LANCZOS)
    pad = 26
    plate = Image.new("RGBA", (lg.width + pad * 2, lg.height + pad * 2), (255, 255, 255, 235 if src else 0))
    mask = Image.new("L", plate.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, plate.width - 1, plate.height - 1], 28, fill=255)
    plate.putalpha(mask.point(lambda v: min(v, 235 if src else 0)))
    plate.alpha_composite(lg, (pad, pad))
    pos = (W - plate.width - 40, H - plate.height - 40) if src else ((W - plate.width) // 2, (H - plate.height) // 2)
    canvas.alpha_composite(plate, pos)
    canvas.convert("RGB").save(OUT / f"{name}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    print(name, (OUT / f"{name}.jpg").stat().st_size)
