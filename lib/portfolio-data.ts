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
  { file: "amsterdam.png", title: "Amsterdam", sec: 1, status: "sold", statusNote: "resale", categories: ["painted"], showcase: ["all", "painted"], w: 1500, h: 2000 },
  { file: "chisel-peak.jpeg", title: "Chisel Peak", sec: 2, status: "study", categories: ["ink"], showcase: ["all", "ink"], w: 2464, h: 1856 },
  { file: "eagle-coloured.png", title: "Eagle", sec: 3, categories: ["digital"], showcase: ["all", "digital"], w: 1024, h: 1024 },
  { file: "fall.png", title: "Fall", sec: 4, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "frame-3.png", title: "Frame 3", sec: 5, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 10012, h: 3941 },
  { file: "gaucho.png", title: "Gaucho", sec: 6, status: "study", categories: ["ink"], showcase: ["ink"], w: 1024, h: 1024 },
  { file: "king-graff.png", title: "King Graff", sec: 7, categories: ["digital"], w: 2000, h: 2000 },
  { file: "nyc.png", title: "NYC", sec: 8, status: "study", categories: ["painted"], showcase: ["all", "painted"], w: 1500, h: 2000 },
  { file: "night-market-stand.png", title: "Night Market Stand", sec: 9, categories: ["digital"], w: 2000, h: 2000 },
  { file: "night-market.png", title: "Night Market", sec: 10, status: "commissioned", categories: ["digital"], showcase: ["digital"], w: 2000, h: 2000 },
  { file: "renegade.png", title: "Renegade", sec: 11, categories: ["digital"], showcase: ["digital"], w: 1936, h: 2000 },
  { file: "sourboy.png", title: "Sourboy", sec: 12, categories: ["digital"], showcase: ["digital"], w: 2048, h: 2048 },
  { file: "soyer-and-daughter.png", title: "Soyer and Daughter", sec: 13, status: "commissioned", categories: ["digital"], showcase: ["all", "digital"], w: 1332, h: 2000 },
  { file: "twins.png", title: "Twins", sec: 14, status: "study", categories: ["ink"], showcase: ["ink"], w: 2048, h: 2048 },
  { file: "mfyc.png", title: "MFYC", sec: 15, status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 2000, h: 1407 },
  { file: "money-land.png", title: "Money Land", sec: 16, categories: ["digital"], w: 2000, h: 1333 },
  { file: "mycellium-tech-render.png", title: "Mycelium Tech", sec: 17, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 2000, h: 1121 },
  { file: "new-year-grandma.png", title: "New Year Grandma", sec: 18, categories: ["digital"], w: 7083, h: 4675 },
  { file: "plane-sketch.png", title: "Plane Sketch", sec: 19, status: "study", categories: ["ink"], showcase: ["ink"], w: 1024, h: 1024 },
  { file: "self-portrait.png", title: "Self Portrait", sec: 20, categories: ["digital"], w: 928, h: 1232 },
  { file: "spooky-bois.png", title: "Spooky Bois", sec: 21, categories: ["digital"], w: 2048, h: 2048 },
  { file: "spring.png", title: "Spring", sec: 22, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "the-aquarium.png", title: "The Aquarium", sec: 23, status: "sold", categories: ["digital"], showcase: ["all", "digital"], w: 1500, h: 2000 },
  { file: "third-eye-ipa.png", title: "Third Eye IPA", sec: 24, status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 2000, h: 1111 },
  { file: "veritai-hq.png", title: "Veritai HQ", sec: 25, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1024, h: 1024 },
  { file: "wedding.png", title: "Wedding", sec: 26, status: "commissioned", categories: ["commercial"], showcase: ["all", "commercial"], w: 1333, h: 2000 },
  { file: "yule.png", title: "Yule", sec: 27, status: "study", categories: ["painted"], showcase: ["painted"], w: 2000, h: 2000 },
  { file: "brain-pattern.png", title: "Brain Pattern", sec: 28, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1024, h: 1024 },
  { file: "tech-barn.png", title: "Tech Barn", sec: 29, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1536, h: 1024 },
  { file: "astroboy-sunglasses-1.png", title: "Astro Boy Glasses", sec: 30, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1000, h: 1000 },
  { file: "tyson-sunglasses-1.png", title: "Tyson Glasses", sec: 31, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 1000, h: 1000 },
  { file: "goblin-and-cat.png", title: "Goblin and Cat", sec: 32, categories: ["digital"], showcase: ["digital"], w: 2000, h: 2000 },
  { file: "snowy-craque.png", title: "Snowy Craque", sec: 33, status: "study", categories: ["painted"], showcase: ["painted"], w: 1535, h: 1024 },
  { file: "big-cat.jpeg", title: "Big Cat", sec: 34, categories: ["digital"], showcase: ["all", "digital"], w: 1024, h: 1024 },
  { file: "big-sword.png", title: "Big Sword", sec: 35, categories: ["digital"], w: 1900, h: 1900 },
  { file: "chicago.png", title: "Chicago", sec: 36, status: "edition", statusNote: "sold out · 100 prints", categories: ["digital"], showcase: ["digital"], w: 550, h: 733 },
  { file: "eagle.png", title: "Eagle", sec: 37, status: "study", categories: ["ink"], showcase: ["ink"], w: 1151, h: 1367 },
  { file: "ice-wolf.png", title: "Ice Wolf", sec: 38, status: "study", categories: ["painted"], showcase: ["painted"], w: 1344, h: 896 },
  { file: "lords-shield.png", title: "Lords Shield", sec: 39, categories: ["digital"], w: 1920, h: 1080 },
  { file: "supreme-savage.png", title: "Supreme Savage", sec: 40, status: "edition", statusNote: "sold out · 1000 prints", categories: ["digital"], showcase: ["digital"], w: 1000, h: 1299 },
  { file: "gaucho-digital.png", title: "Gaucho Digital", sec: 41, status: "study", categories: ["ink"], showcase: ["ink"], w: 1122, h: 1402 },
  { file: "imagination-fish.png", title: "Imagination Fish", sec: 42, status: "study", categories: ["ink"], showcase: ["all", "ink"], w: 928, h: 1232 },
  { file: "moon-cat.png", title: "Moon Cat", sec: 43, status: "study", categories: ["ink"], showcase: ["ink"], w: 2000, h: 2000 },
  { file: "submerge.png", title: "Submerge", sec: 44, status: "study", categories: ["ink"], showcase: ["ink"], w: 1402, h: 2000 },
  { file: "the-lighthouse.png", title: "The Lighthouse", sec: 45, categories: ["digital"], w: 1500, h: 2000 },
  { file: "the-skyscraper.png", title: "The Skyscraper", sec: 46, status: "sold", categories: ["digital"], showcase: ["digital"], w: 1500, h: 2000 },
  { file: "the-valley.png", title: "The Valley", sec: 47, status: "study", categories: ["ink"], showcase: ["ink"], w: 3000, h: 3200 },
  { file: "turtle-town.png", title: "Turtle Town", sec: 48, status: "commissioned", categories: ["digital"], showcase: ["digital"], w: 1280, h: 720 },
  { file: "boston-on-the-bed.png", title: "Boston on the Bed", sec: 49, status: "commissioned", categories: ["painted"], showcase: ["painted"], w: 1232, h: 928 },
  { file: "whiskey-glass-study.png", title: "Whiskey Glass Study", sec: 50, status: "study", categories: ["painted"], showcase: ["all", "painted"], w: 2544, h: 1904 },
  { file: "jack-on-the-rockies.jpg", title: "Jack on the Rockies", sec: 51, status: "commissioned", categories: ["commercial"], showcase: ["commercial"], w: 2400, h: 1350 },
]

/** Pieces shown in a given homepage gallery view. */
export function viewImages(view: ShowcaseView): PortfolioImage[] {
  return images.filter((i) => i.showcase?.includes(view))
}

/** Formatted survey coordinate, e.g. "SEC 14". */
export function sectionLabel(img: PortfolioImage): string {
  return `SEC ${String(img.sec).padStart(2, "0")}`
}
