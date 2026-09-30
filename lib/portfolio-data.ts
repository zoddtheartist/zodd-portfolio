export type Category = "ink" | "painted" | "digital" | "commercial"

/** Which homepage gallery view a piece appears in. "all" is the default view. */
export type ShowcaseView = "all" | Category

/**
 * What happened to a piece. Says "this is working art, not a sketchbook"
 * without publishing a single price. Omit it and the tag shows nothing.
 */
export type PieceStatus = "commissioned" | "sold" | "edition" | "study"

export type PortfolioImage = {
  file: string
  title?: string
  status?: PieceStatus
  /** Rides beside the status, e.g. an edition size or "resale". */
  statusNote?: string
  /**
   * Works that belong together regardless of where the grid puts them. Pieces
   * sharing a key are chained to each other before geometry is considered.
   */
  affinity?: string
  /** Survey section number. Stable ID printed on the specimen tag. */
  sec: number
  categories: Category[]
  /** Homepage gallery only. Edit this to swap what the front page shows. */
  showcase?: ShowcaseView[]
  /** Intrinsic pixel size, used for layout and to avoid layout shift. */
  w: number
  h: number
}

export const CATEGORIES: { id: Category; label: string; abbr: string }[] = [
  { id: "ink", label: "Ink & Paper", abbr: "INK" },
  { id: "painted", label: "Painted", abbr: "PNT" },
  { id: "digital", label: "Digital Color", abbr: "DIG" },
  { id: "commercial", label: "Commercial", abbr: "CMM" },
]

export const images: PortfolioImage[] = [
  { file: "jack-on-the-rockies.webp", title: "Jack on the Rockies", sec: 51, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 2400, h: 1350 },
  { file: "amsterdam.webp", title: "Amsterdam", sec: 1, status: "sold", statusNote: "resale", categories: ["painted"], showcase: ["all", "painted"], w: 1500, h: 2000 },
  { file: "chisel-peak.webp", title: "Chisel Peak", sec: 2, status: "study", categories: ["ink"], showcase: ["all", "ink"], w: 2464, h: 1856 },
  { file: "eagle-coloured.webp", title: "Eagle", sec: 3, categories: ["digital"], showcase: ["all", "digital"], w: 1024, h: 1024 },
  { file: "fall.webp", title: "Fall", sec: 4, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "frame-3.webp", title: "Frame 3", sec: 5, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 10012, h: 3941 },
  { file: "gaucho.webp", title: "Gaucho", sec: 6, status: "study", categories: ["ink"], showcase: ["ink"], w: 1024, h: 1024 },
  { file: "king-graff.webp", title: "King Graff", sec: 7, categories: ["digital"], w: 2000, h: 2000 },
  { file: "nyc.webp", title: "NYC", sec: 8, status: "study", categories: ["painted"], showcase: ["all", "painted"], w: 1500, h: 2000 },
  { file: "night-market-stand.webp", title: "Night Market Stand", sec: 9, categories: ["digital"], w: 2000, h: 2000 },
  { file: "night-market.webp", title: "Night Market", sec: 10, status: "commissioned", categories: ["digital"], showcase: ["digital"], w: 2000, h: 2000 },
  { file: "renegade.webp", title: "Renegade", sec: 11, categories: ["digital"], showcase: ["digital"], w: 1936, h: 2000 },
  { file: "sourboy.webp", title: "Sourboy", sec: 12, categories: ["digital"], showcase: ["digital"], w: 2048, h: 2048 },
  { file: "soyer-and-daughter.webp", title: "Soyer and Daughter", sec: 13, status: "commissioned", categories: ["digital"], showcase: ["all", "digital"], w: 1332, h: 2000 },
  { file: "twins.webp", title: "Twins", sec: 14, status: "study", categories: ["ink"], showcase: ["ink"], w: 2048, h: 2048 },
  { file: "mfyc.webp", title: "MFYC", sec: 15, affinity: "maps", status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 2000, h: 1407 },
  { file: "money-land.webp", title: "Money Land", sec: 16, categories: ["digital"], w: 2000, h: 1333 },
  { file: "new-year-grandma.webp", title: "New Year Grandma", sec: 18, categories: ["digital"], w: 7083, h: 4675 },
  { file: "plane-sketch.webp", title: "Plane Sketch", sec: 19, status: "study", categories: ["ink"], showcase: ["ink"], w: 1024, h: 1024 },
  { file: "self-portrait.webp", title: "Self Portrait", sec: 20, categories: ["digital"], w: 928, h: 1232 },
  { file: "spooky-bois.webp", title: "Spooky Bois", sec: 21, categories: ["digital"], w: 2048, h: 2048 },
  { file: "spring.webp", title: "Spring", sec: 22, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "the-aquarium.webp", title: "The Aquarium", sec: 23, status: "sold", statusNote: "not available", categories: ["digital"], showcase: ["all", "digital"], w: 1500, h: 2000 },
  { file: "third-eye-ipa.webp", title: "Third Eye IPA", sec: 24, status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 2000, h: 1111 },
  { file: "wedding.webp", title: "Wedding", sec: 26, affinity: "maps", status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 1333, h: 2000 },
  { file: "yule.webp", title: "Yule", sec: 27, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "brain-pattern.webp", title: "Brain Pattern", sec: 28, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1024, h: 1024 },
  { file: "astroboy-sunglasses-1.webp", title: "Astro Boy Glasses", sec: 30, affinity: "eyewear", status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1000, h: 1000 },
  { file: "tyson-sunglasses-1.webp", title: "Tyson Glasses", sec: 31, affinity: "eyewear", status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1000, h: 1000 },
  { file: "goblin-and-cat.webp", title: "Goblin and Cat", sec: 32, categories: ["digital"], showcase: ["digital"], w: 2000, h: 2000 },
  { file: "snowy-craque.webp", title: "Snowy Craque", sec: 33, status: "study", categories: ["painted"], showcase: ["painted"], w: 1535, h: 1024 },
  { file: "big-cat.webp", title: "Big Cat", sec: 34, categories: ["digital"], showcase: ["all", "digital"], w: 1024, h: 1024 },
  { file: "big-sword.webp", title: "Big Sword", sec: 35, categories: ["digital"], w: 1900, h: 1900 },
  { file: "chicago.webp", title: "Chicago", sec: 36, status: "edition", statusNote: "sold out · 100 prints", categories: ["digital"], showcase: ["digital"], w: 550, h: 733 },
  { file: "eagle.webp", title: "Eagle", sec: 37, status: "study", categories: ["ink"], showcase: ["ink"], w: 1151, h: 1367 },
  { file: "ice-wolf.webp", title: "Ice Wolf", sec: 38, status: "study", categories: ["painted"], showcase: ["painted"], w: 1344, h: 896 },
  { file: "lords-shield.webp", title: "Lords Shield", sec: 39, categories: ["digital"], w: 1920, h: 1080 },
  { file: "supreme-savage.webp", title: "Supreme Savage", sec: 40, status: "edition", statusNote: "sold out · 1000 prints", categories: ["digital"], showcase: ["digital"], w: 1000, h: 1299 },
  { file: "imagination-fish.webp", title: "Imagination Fish", sec: 42, status: "study", categories: ["ink"], showcase: ["all", "ink"], w: 928, h: 1232 },
  { file: "moon-cat.webp", title: "Moon Cat", sec: 43, status: "study", categories: ["ink"], showcase: ["ink"], w: 2000, h: 2000 },
  { file: "submerge.webp", title: "Submerge", sec: 44, status: "study", categories: ["ink"], showcase: ["ink"], w: 1402, h: 2000 },
  { file: "the-lighthouse.webp", title: "The Lighthouse", sec: 45, categories: ["digital"], w: 1500, h: 2000 },
  { file: "the-skyscraper.webp", title: "The Skyscraper", sec: 46, status: "sold", statusNote: "not available", categories: ["digital"], showcase: ["digital"], w: 1500, h: 2000 },
  { file: "the-valley.webp", title: "The Valley", sec: 47, status: "study", categories: ["ink"], showcase: ["ink"], w: 3000, h: 3200 },
  { file: "turtle-town.webp", title: "Turtle Town", sec: 48, status: "commissioned", categories: ["digital"], showcase: ["digital"], w: 1280, h: 720 },
  { file: "boston-on-the-bed.webp", title: "Boston on the Bed", sec: 49, status: "commissioned", categories: ["painted"], showcase: ["painted"], w: 1232, h: 928 },
  { file: "whiskey-glass-study.webp", title: "Whiskey Glass Study", sec: 50, status: "study", categories: ["painted"], showcase: ["all", "painted"], w: 2544, h: 1904 },
  { file: "oilers-commission.webp", title: "Oilers Commission", sec: 52, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 2799, h: 1820 },
  { file: "cyclist-mural-amsterdam.webp", title: "Cyclist Mural", sec: 53, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1345, h: 816 },
]

/** Pieces shown in a given homepage gallery view. */
export function viewImages(view: ShowcaseView): PortfolioImage[] {
  return images.filter((i) => i.showcase?.includes(view))
}

/** Formatted survey coordinate, e.g. "SEC 14". */
export function sectionLabel(img: PortfolioImage): string {
  return `SEC ${String(img.sec).padStart(2, "0")}`
}
