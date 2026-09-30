#!/usr/bin/env python3
"""
Works out, per sketch, the levels correction and the ink polarity the poster engine
needs.

The ink treatments assume line art on a clean light ground: dark presets invert so the
lines come out bone, paper presets multiply so they print down. Two things break that.

1. A scan whose paper is mid-grey rather than white inverts to a grey haze instead of
   dropping away to the ground colour. Fixed with a levels stretch before the invert,
   mapping the ink point to black and the paper point to white. CSS brightness() and
   contrast() compose as

       v' = ((v * b) - 0.5) * c + 0.5          (v normalised 0..1)

   Solving lo -> 0 and hi -> 1 gives c = 1 + 2*lo/(hi-lo), and b follows from hi -> 1.
   c has to be clamped or faint scans turn paper grain into blotches, so b is always
   derived from the clamped c. Deriving it from the unclamped value leaves the pair
   inconsistent, which is what made The Valley wash out on the first pass.

2. Some pieces are already light-on-dark. Inverting those a second time floods the
   poster. Polarity is decided by which side of mid the dominant tone sits on, since
   the most common tone in a line drawing is its ground.

Run:  python3 scripts/measure-sketch-levels.py
Paste the printed block into lib/lab-sources.ts.
"""
from PIL import Image
import os

Image.MAX_IMAGE_PIXELS = None
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MONO = ["astroboy-sunglasses-1.webp","chisel-peak.webp","eagle.webp","frame-3.webp",
        "gaucho.webp","imagination-fish.webp","moon-cat.webp","plane-sketch.webp",
        "submerge.webp","the-valley.webp","twins.webp","tyson-sunglasses-1.webp"]

C_MAX = 4.0

def pct(v, p):
    return v[min(int(len(v) * p / 100), len(v) - 1)]

rows = []
print(f"{'file':<30} {'p2':>4} {'p98':>4} {'ground':>7} {'b':>7} {'c':>6}  polarity")
print("-" * 76)
for f in MONO:
    im = Image.open(os.path.join(REPO, "public/portfolio", f)).convert("L")
    im.thumbnail((200, 200))
    data = list(im.getdata())
    v = sorted(data)

    # The ground is the most common tone, taken in 16-level buckets so noise does not
    # split the peak. Its side of mid tells us whether the art is ink-on-paper.
    hist = {}
    for x in data:
        k = x // 16
        hist[k] = hist.get(k, 0) + 1
    ground = max(hist, key=hist.get) * 16 + 8
    polarity = "light" if ground >= 128 else "dark"

    lo = max(0.0, pct(v, 2) / 255 - 0.02)
    hi = min(1.0, pct(v, 98) / 255 + 0.02)
    span = max(hi - lo, 0.05)
    c = min(1 + 2 * lo / span, C_MAX)
    # Derive b from the clamped c so the pair always satisfies hi -> 1.
    b = max(min((0.5 + 0.5 / c) / max(hi, 0.05), 2.0), 0.3)

    # A stretch is not always a win. On a scan that is already clean it only lifts
    # paper grain, so score both and keep whichever reads better: a bright line is
    # good, a lifted sheet is twice as bad because screen turns it into haze.
    invert = polarity == "light"

    def apply(bb, cc):
        out = []
        for x in data:
            y = x / 255 * bb
            y = max(0.0, min(1.0, (y - 0.5) * cc + 0.5))
            out.append(1 - y if invert else y)
        return sorted(out)

    def net(r):
        line = r[int(len(r) * 0.99)]
        haze = sum(r[: int(len(r) * 0.80)]) / max(1, int(len(r) * 0.80))
        return line - haze * 2.0

    if net(apply(b, c)) <= net(apply(1.0, 1.0)) + 0.01:
        b, c = 1.0, 1.0

    rows.append((f, round(b, 3), round(c, 3), polarity))
    print(f"{f:<30} {pct(v,2):>4} {pct(v,98):>4} {ground:>7} {b:>7.3f} {c:>6.3f}  {polarity}")

print("\n--- paste into lib/lab-sources.ts ---\n")
print("const TREATMENT: Record<string, SketchTreatment> = {")
for f, b, c, pol in rows:
    print(f'  "{f}": {{ b: {b}, c: {c}, polarity: "{pol}" }},')
print("}")
