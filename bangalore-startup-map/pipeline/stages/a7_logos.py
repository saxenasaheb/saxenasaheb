"""A7 — Fetch a 200x200 logo for every company.

Clearbit's logo API (logo.clearbit.com) was shut down by HubSpot and no longer
resolves, so the chain is now:
    1. Google favicon service at 256px (free, ungated)
    2. Brandfetch (optional, only if BRANDFETCH_API_KEY is set)
    3. Generated monogram (first letter on a deterministic brand colour)

Output: public/logos/{company_id}.png, and a logo_url column pointing at it.
"""
from __future__ import annotations

import hashlib
import io
import os
from urllib.parse import urlparse

import pandas as pd
from PIL import Image, ImageDraw, ImageFont

from common import LOGO_DIR, PROCESSED_DIR, get_logger, session

LOG = get_logger("a7")
IN = PROCESSED_DIR / "geocoded.csv"
OUT = PROCESSED_DIR / "with_logos.csv"
SIZE = 200

PALETTE = ["#E8743B", "#19A979", "#1C8CEC", "#945ECF", "#E0488B", "#13A4B4", "#E8A33B", "#6C8893"]


def _domain(website: str | None) -> str | None:
    if not website or pd.isna(website):
        return None
    w = str(website).strip()
    if not w.startswith("http"):
        w = "http://" + w
    host = urlparse(w).netloc.lower()
    return host[4:] if host.startswith("www.") else host or None


def _save_square(img: Image.Image, path) -> None:
    img = img.convert("RGBA")
    side = min(img.size)
    left = (img.width - side) // 2
    top = (img.height - side) // 2
    img.crop((left, top, left + side, top + side)).resize((SIZE, SIZE)).save(path)


def _try_favicon(domain: str, path) -> bool:
    url = f"https://www.google.com/s2/favicons?domain={domain}&sz=256"
    try:
        r = session().get(url, timeout=20)
        r.raise_for_status()
        img = Image.open(io.BytesIO(r.content))
        if min(img.size) < 32:  # tiny default globe == no real favicon
            return False
        _save_square(img, path)
        return True
    except Exception:
        return False


def _try_brandfetch(domain: str, path) -> bool:
    key = os.environ.get("BRANDFETCH_API_KEY")
    if not key:
        return False
    try:
        r = session().get(
            f"https://api.brandfetch.io/v2/brands/{domain}",
            headers={"Authorization": f"Bearer {key}"},
            timeout=20,
        )
        r.raise_for_status()
        logos = r.json().get("logos", [])
        src = next((f["src"] for lg in logos for f in lg.get("formats", []) if f.get("src")), None)
        if not src:
            return False
        img = Image.open(io.BytesIO(session().get(src, timeout=20).content))
        _save_square(img, path)
        return True
    except Exception:
        return False


def _monogram(name: str, path) -> None:
    letter = (name.strip()[:1] or "?").upper()
    color = PALETTE[int(hashlib.md5(name.encode()).hexdigest(), 16) % len(PALETTE)]
    img = Image.new("RGBA", (SIZE, SIZE), color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("DejaVuSans-Bold.ttf", 110)
    except OSError:
        font = ImageFont.load_default()
    box = draw.textbbox((0, 0), letter, font=font)
    draw.text(
        ((SIZE - (box[2] - box[0])) / 2 - box[0], (SIZE - (box[3] - box[1])) / 2 - box[1]),
        letter,
        fill="white",
        font=font,
    )
    img.save(path)


def run() -> int:
    df = pd.read_csv(IN)
    if "company_id" not in df.columns:
        df["company_id"] = df["company_name"].map(
            lambda n: hashlib.md5(str(n).encode()).hexdigest()[:12]
        )
    logo_urls = []
    for rec in df.to_dict("records"):
        cid = rec["company_id"]
        path = LOGO_DIR / f"{cid}.png"
        domain = _domain(rec.get("website"))
        if not path.exists():
            ok = bool(domain) and (_try_favicon(domain, path) or _try_brandfetch(domain, path))
            if not ok:
                _monogram(str(rec.get("company_name", "?")), path)
        logo_urls.append(f"/logos/{cid}.png")
    df["company_id"] = df.get("company_id")
    df["logo_url"] = logo_urls
    df.to_csv(OUT, index=False)
    LOG.info("Logos ready for %d companies -> %s", len(df), LOGO_DIR)
    return len(df)
