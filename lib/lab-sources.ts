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
}

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

/** Pieces whose aspect ratio makes them useless in a poster image slot. */
const TOO_WIDE_FOR_POSTER = 2.2

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
 * not the whole portfolio. Ultra-wide pieces are excluded because they render as a
 * thin strip in every grid mode; Frame 3 at 10012x3941 is the only one so far.
 */
export function posterSources(): LabSource[] {
  return images
    .filter(isMono)
    .filter((i) => i.w / i.h < TOO_WIDE_FOR_POSTER)
    .map(toSource)
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
