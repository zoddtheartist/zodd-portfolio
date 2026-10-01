import { images, type PortfolioImage } from "./portfolio-data"

/**
 * The shared source catalogue for the lab tools.
 *
 * Both tools used to embed their own base64 copies of the same four sketches, so
 * the "library" was really four duplicated files that could drift apart, and adding
 * a sketch meant pasting it into two HTML files by hand. The portfolio is the only
 * real catalogue of his work, so both tools read from it instead.
 *
 * Served to the static tools as JSON by app/labs/catalogue/route.ts.
 */

export type LabSource = {
  /** Path under public/, served same-origin. Read this directly, never via /_next/image. */
  src: string
  title: string
  /** Intrinsic size, so a tool can lay out before the image loads. */
  w: number
  h: number
  /** Poster sources only. How the ink treatment has to be adjusted for this scan. */
  treatment?: SketchTreatment
}

/**
 * Per-sketch correction for the poster engine's ink logic.
 *
 * `b` and `c` are a levels stretch applied before the invert, mapping the ink point to
 * black and the paper point to white, so a scan on grey paper stops inverting into a
 * grey haze.
 *
 * `polarity` is which side the scan's ground sits on. Most pieces are ink on white
 * ("light"); a few are already light-on-dark ("dark") and inverting those a second time
 * floods the poster. The engine decides whether to invert from this plus the preset's
 * mode, rather than assuming every source is ink on paper.
 *
 * Measured by scripts/measure-sketch-levels.py. Re-run it when sketches are added;
 * it keeps identity values where a stretch would only lift paper grain.
 */
export type SketchTreatment = {
  b: number
  c: number
  polarity: "light" | "dark"
}

const TREATMENT: Record<string, SketchTreatment> = {
  "astroboy-sunglasses-1.webp": { b: 1.0, c: 1.0, polarity: "light" },
  "chisel-peak.webp": { b: 0.85, c: 1.427, polarity: "light" },
  "eagle.webp": { b: 0.924, c: 1.179, polarity: "light" },
  "frame-3.webp": { b: 1.0, c: 1.0, polarity: "light" },
  "gaucho.webp": { b: 1.024, c: 1.041, polarity: "light" },
  "imagination-fish.webp": { b: 0.928, c: 1.169, polarity: "light" },
  "moon-cat.webp": { b: 0.931, c: 1.16, polarity: "dark" },
  "plane-sketch.webp": { b: 0.766, c: 2.066, polarity: "light" },
  "submerge.webp": { b: 1.0, c: 1.0, polarity: "light" },
  "the-valley.webp": { b: 0.625, c: 4.0, polarity: "light" },
  "twins.webp": { b: 1.0, c: 1.0, polarity: "light" },
  "tyson-sunglasses-1.webp": { b: 1.0, c: 1.0, polarity: "light" },
}

const DEFAULT_TREATMENT: SketchTreatment = { b: 1, c: 1, polarity: "light" }

/**
 * Monochrome, but not poster material.
 *
 * These stay in MONO_FILES because the classification is correct and it is what keeps
 * them out of the Claim Office — a palette pulled from line art is a row of greys.
 * They are only excluded from the poster engine.
 */
const NOT_FOR_POSTERS = new Set([
  // Zodd, 2026-10-01. Product renders rather than drawings: the eyewear pair are
  // commissioned objects on a plain ground, so the ink treatments have nothing to
  // bite on and they read as a catalogue shot dropped into a poster frame.
  "tyson-sunglasses-1.webp",
  "astroboy-sunglasses-1.webp",
])

/**
 * The monochrome pieces, measured rather than inferred from the `ink` category.
 *
 * Mean per-pixel saturation across a 160px sample, ignoring near-black pixels where
 * saturation is meaningless. The split is unambiguous: every piece below is at or
 * under 0.032, and the next piece up (Chicago) is 0.122, a four-fold gap.
 *
 *   the-valley 0.000   moon-cat 0.000      submerge 0.000     plane-sketch 0.002
 *   tyson 0.002        eagle 0.002         imagination-fish 0.003
 *   chisel-peak 0.003  twins 0.005         frame-3 0.009
 *   astroboy 0.013     gaucho 0.032
 *
 * Note this is all nine `ink` pieces plus three `commercial` ones that happen to be
 * line art. Re-measure with the same method if new work is added.
 */
const MONO_FILES = new Set([
  "the-valley.webp",
  "moon-cat.webp",
  "submerge.webp",
  "plane-sketch.webp",
  "tyson-sunglasses-1.webp",
  "eagle.webp",
  "imagination-fish.webp",
  "chisel-peak.webp",
  "twins.webp",
  "frame-3.webp",
  "astroboy-sunglasses-1.webp",
  "gaucho.webp",
])

export function isMono(img: PortfolioImage): boolean {
  return MONO_FILES.has(img.file)
}

function toSource(img: PortfolioImage): LabSource {
  return { src: `/portfolio/${img.file}`, title: img.title ?? img.file, w: img.w, h: img.h }
}

/**
 * Poster engine sources: the black and white sketches.
 *
 * The ink treatments (invert + screen for dark presets, multiply for paper ones)
 * assume line art on a light ground, which is why this is the monochrome set and
 * not the whole portfolio.
 *
 * No aspect-ratio guard. Frame 3 is 10012x3941 and renders as a thin strip in most
 * grid modes, which is Zodd's call rather than the code's; Specimen and Asymmetric
 * suit it better than Stacked does.
 */
export function posterSources(): LabSource[] {
  return images
    .filter((i) => isMono(i) && !NOT_FOR_POSTERS.has(i.file))
    .map((i) => ({ ...toSource(i), treatment: TREATMENT[i.file] ?? DEFAULT_TREATMENT }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

/**
 * Claim Office sources: the colour work.
 *
 * A palette pulled from a black and white sketch is a row of greys, so the
 * monochrome set is excluded. Flip this to `images.map(toSource)` to offer
 * everything.
 */
export function paletteSources(): LabSource[] {
  return images
    .filter((i) => !isMono(i))
    .map(toSource)
    .sort((a, b) => a.title.localeCompare(b.title))
}
