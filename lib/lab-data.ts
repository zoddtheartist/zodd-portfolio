/**
 * The Lab index.
 *
 * Deliberately plain vocabulary. Earlier drafts of this section leaned on
 * land-office language for everything (parcels, claims, deeds, survey sections),
 * which put one narrow metaphor into the schema itself and made every future
 * entry inherit it. So the model says `item`, `kind`, `tags`, `no`. An individual
 * piece is free to speak however it wants — The Claim Office keeps its mining
 * voice because that is that entry's own register, not the section's.
 */

/**
 * Two unlike things live here and want different presentation.
 *
 * `tool`  — interactive, undated in spirit, no reading order. A workbench.
 * `entry` — a journal record. Dated, static, reads top to bottom.
 */
export type LabKind = "tool" | "entry"

/** `draft` items appear in the index but do not link anywhere yet. */
export type LabStatus = "live" | "draft"

export type LabItem = {
  /** URL segment. Also the stable identity; do not renumber or rename casually. */
  slug: string
  /** Printed as a zero-padded serial, e.g. "003". Stable, gaps are fine. */
  no: number
  title: string
  kind: LabKind
  status: LabStatus
  /** ISO date. Absolute, never "last week". */
  date: string
  /** One or two sentences. Shown in the index. */
  blurb: string
  /** Free-form subject keys. Used for grouping later; no fixed list yet. */
  tags?: string[]
  /**
   * Where the item currently lives. A self-contained HTML file served from
   * `public/` uses an absolute path with its extension. Once an item is ported
   * into the app this becomes a normal route and the extension goes away.
   */
  href?: string
}

export const items: LabItem[] = [
  {
    slug: "poster-grid-engine",
    no: 1,
    title: "Poster Grid Engine",
    kind: "tool",
    status: "live",
    date: "2026-09-30",
    blurb:
      "Builds a poster from any of the black and white sketches. Five presets and five grid modes, with dark presets knocking the line art to bone and paper presets printing it down, and the resulting CSS copyable.",
    tags: ["layout", "typography", "posters"],
    href: "/labs/poster-grid-engine.html",
  },
  {
    slug: "viridian-field-study",
    no: 2,
    title: "Viridian Field Study",
    kind: "entry",
    status: "draft",
    date: "2026-08-03",
    blurb:
      "A field-study presentation of one colour, carrying real cited research alongside the work. The format that entries about a single piece should follow.",
    tags: ["colour", "research", "format"],
  },
  {
    slug: "claim-office",
    no: 3,
    title: "The Claim Office",
    kind: "tool",
    status: "live",
    date: "2026-09-29",
    blurb:
      "Pulls a palette out of any image, names each colour, builds tint and shade ladders, checks contrast, and exports CSS, Tailwind, or JSON. Reserves slots for saturated colour so an accent is not buried by a dominant paper tone.",
    tags: ["colour", "palette", "accessibility"],
    href: "/labs/claim-office.html",
  },
]

/** Items of one kind, newest first. Drafts sort alongside live ones. */
export function itemsOfKind(kind: LabKind): LabItem[] {
  return items
    .filter((i) => i.kind === kind)
    .sort((a, b) => b.date.localeCompare(a.date) || b.no - a.no)
}

/** Zero-padded serial, e.g. "003". */
export function serial(item: LabItem): string {
  return String(item.no).padStart(3, "0")
}

/** "29 Sep 2026". Fixed locale and UTC so server and client agree. */
export function filedOn(item: LabItem): string {
  return new Date(item.date + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}
