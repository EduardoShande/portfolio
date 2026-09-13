"""
Prepare Eduardo's photographs for the site.

Run from the project root:

    python scripts/build-photos.py

Sources live outside the repo in D:/job/Eduardo/Img. Outputs are written to
public/photos and are the files the components actually reference, so re-run
this after replacing a source photo.

Three outputs:

  eduardo-hero.jpg      Wide canvas for the dark header, from the stage photo.
                        The projected slide is keyed out by its colour, then
                        blurred and dimmed so it reads as a soft backdrop
                        rather than a wall of garbled text; a spotlight keeps
                        him lit and pulls the stage down; the frame is centred
                        on him and feathered to black on every edge so it
                        melts into the header's dark field.

  eduardo-portrait.jpg  Square crop of the stage photo, centred on his upper
                        body, for the circular node at the centre of the
                        capability orbit.

  eduardo-speaking.jpg  The stage photo, resized and lightly compressed, kept
                        available for other sections.
"""

from pathlib import Path
import numpy as np
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


def _smooth(a: np.ndarray, lo: float, hi: float) -> np.ndarray:
    """Smoothstep from 0 at lo to 1 at hi."""
    t = np.clip((a - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def _blur_mask(a: np.ndarray, radius: float) -> np.ndarray:
    img = Image.fromarray((a * 255).astype(np.uint8))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius))) / 255.0


def build_hero() -> None:
    """Stage photo onto a wide black canvas, the slide behind him subdued.

    Coordinates below are in the 770x1081 source. His head sits around
    (540, 378) and his body spans roughly x 435-710; the slide fills the
    upper right down to y 545, with a pale border below it to y 615.
    """
    src = Image.open(SRC / "Eduardo speach.jpg").convert("RGB")
    w, h = src.size
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    arr = np.asarray(src).astype(np.float32)
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]

    # The slide, found by colour: blue or green clearly outrunning red.
    # Skin, hair and the black shirt never do. A closing fills the white
    # lettering without growing into his hair; a small dilation then takes
    # in the anti-aliased fringe so no bright outline is left round him.
    key = Image.fromarray((_smooth(np.maximum(b, g) - r, 25, 70) * 255)
                          .astype(np.uint8))
    key = (key.filter(ImageFilter.MaxFilter(27))
              .filter(ImageFilter.MinFilter(27))
              .filter(ImageFilter.MaxFilter(5))
              .filter(ImageFilter.GaussianBlur(2.5)))
    screen = (np.asarray(key) / 255.0)[..., None]

    blurred = np.asarray(src.filter(ImageFilter.GaussianBlur(16)))
    arr = arr * (1 - screen) + blurred * screen
    arr *= 1 - 0.72 * screen

    # The slide's pale lower border runs behind his hands. It is neutral
    # grey where skin is warm, so key on that inside the band, sparing the
    # white logo on his shirt.
    neutral = 1 - _smooth(np.abs(r - b), 12, 30)
    bright = _smooth((r + g + b) / 3, 70, 120)
    band = (_smooth(yy, 520, 540) * (1 - _smooth(yy, 615, 635))
            * _smooth(xx, 215, 235))
    logo = _blur_mask(((xx > 538) & (xx < 608) & (yy > 545) & (yy < 612))
                      .astype(np.float32), 4)
    arr *= (1 - 0.6 * neutral * bright * band * (1 - logo))[..., None]

    # Spotlight: full brightness on him, the stage and podium pulled down.
    d = np.sqrt(((xx - 560) / 250) ** 2 + ((yy - 600) / 480) ** 2)
    arr *= (0.35 + 0.65 * (1 - _smooth(d, 0.55, 1.2)))[..., None]

    edited = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

    # Crop from just above his head to the knees and fill the canvas height.
    # He lands high in the frame, clear of the header's bottom rail.
    canvas_w, canvas_h = 1920, 1080
    top, bottom = 170, 1000
    scale = canvas_h / (bottom - top)
    frame = edited.crop((0, top, w, bottom))
    frame = frame.resize((int(w * scale), canvas_h), Image.LANCZOS)
    fw, fh = frame.size

    # Feather every edge of the frame so it has no boundary of its own.
    fy, fx = np.mgrid[0:fh, 0:fw].astype(np.float32)
    alpha = (_smooth(fx, 0, 260) * (1 - _smooth(fx, fw - 110, fw))
             * _smooth(fy, 0, 90) * (1 - _smooth(fy, fh - 160, fh)))
    mask = Image.fromarray((alpha * 255).astype(np.uint8))

    canvas = Image.new("RGB", (canvas_w, canvas_h), (0, 0, 0))
    # Centre his body (x ~565 in the source) on the canvas.
    canvas.paste(frame, (int(canvas_w / 2 - 565 * scale), 0), mask)

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
