"""
Prepare Eduardo's photographs for the site.

Run from the project root:

    python scripts/build-photos.py

Sources live outside the repo in D:/job/Eduardo/Img. Outputs are written to
public/photos and are the files the components actually reference, so re-run
this after replacing a source photo.

Three outputs:

  eduardo-hero.jpg      Wide canvas for the dark header. The couch portrait is
                        already vignetted to a circle on black, so extending
                        that black to a 16:9 canvas gives edges that melt into
                        the header's dark field with no visible seam. The
                        subject is nudged above centre because the header's
                        lower third is covered by the contact rail.

  eduardo-portrait.jpg  Square crop of the stage photo, centred on his upper
                        body, for the circular node at the centre of the
                        capability orbit.

  eduardo-speaking.jpg  The stage photo, resized and lightly compressed, kept
                        available for other sections.
"""

from pathlib import Path
from PIL import Image, ImageFilter

SRC = Path("D:/job/Eduardo/Img")
OUT = Path("public/photos")
OUT.mkdir(parents=True, exist_ok=True)


def save(img: Image.Image, name: str, quality: int = 86) -> None:
    path = OUT / name
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True,
                            progressive=True)
    kb = path.stat().st_size / 1024
    print(f"  {name:<24} {img.width}x{img.height}  {kb:6.1f} KB")


def build_hero() -> None:
    """Couch portrait onto a wide black canvas, subject above centre.

    The source is already vignetted to a hard-edged circle on black. Pasted
    straight down that edge stays visible as a curve across the header, so
    the subject is composited through a radial mask whose falloff is blurred:
    opaque across the middle of the circle, fading to nothing before the
    original edge. The photograph then has no boundary of its own and simply
    dissolves into the header's dark field.
    """
    src = Image.open(SRC / "Eduardo on couch.jpg").convert("RGB")

    canvas_w, canvas_h = 1920, 1080
    scale = 1.28
    size = int(canvas_h * scale)
    subject = src.resize((size, size), Image.LANCZOS)

    # Radial mask: solid to 60% of the radius, then a gradient out to 92%,
    # which is inside the source's own circular edge.
    mask = Image.new("L", (size, size), 0)
    px = mask.load()
    cx = cy = size / 2
    inner, outer = size * 0.30, size * 0.46
    span = outer - inner
    for y in range(size):
        dy = y - cy
        for x in range(size):
            d = (dx := x - cx) * dx + dy * dy
            d = d ** 0.5
            if d <= inner:
                px[x, y] = 255
            elif d >= outer:
                px[x, y] = 0
            else:
                px[x, y] = int(255 * (1 - (d - inner) / span))
    mask = mask.filter(ImageFilter.GaussianBlur(size * 0.02))

    canvas = Image.new("RGB", (canvas_w, canvas_h), (0, 0, 0))
    x = (canvas_w - size) // 2
    # Sit him higher than centre: the header's bottom rail covers the lower
    # third, and the reference frames its subject high as well.
    y = int((canvas_h - size) * 0.42)
    canvas.paste(subject, (x, y), mask)

    save(canvas, "eduardo-hero.jpg", quality=84)


def build_portrait() -> None:
    """Square crop of the stage photo, centred on his upper body."""
    src = Image.open(SRC / "Eduardo speach.jpg").convert("RGB")
    w, h = src.size

    # He occupies roughly the right-centre of the frame; his head sits a
    # little above a third of the way down.
    cx, cy = int(w * 0.70), int(h * 0.52)
    side = int(h * 0.52)

    left = max(0, min(cx - side // 2, w - side))
    top = max(0, min(cy - side // 2, h - side))
    crop = src.crop((left, top, left + side, top + side))
    crop = crop.resize((900, 900), Image.LANCZOS)

    save(crop, "eduardo-portrait.jpg")


def build_speaking() -> None:
    """The stage photo at a sane size for the web."""
    src = Image.open(SRC / "Eduardo speach.jpg").convert("RGB")
    target_h = 1400
    if src.height > target_h:
        ratio = target_h / src.height
        src = src.resize((int(src.width * ratio), target_h), Image.LANCZOS)
    save(src, "eduardo-speaking.jpg")


if __name__ == "__main__":
    print("Writing to", OUT.resolve())
    build_hero()
    build_portrait()
    build_speaking()
