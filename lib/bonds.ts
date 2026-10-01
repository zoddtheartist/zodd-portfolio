/**
 * What a line between two parcels asserts.
 *
 * The plat already drew wires, but they only ever meant "these two landed near each
 * other inside the same register". That is a fact about the grid, not about the work,
 * which is why the bearing read as decoration. A bond is the opposite: it is declared
 * about the pieces, so it survives the layout and can cross registers.
 *
 * Bonds are deliberately sparse. Every piece does not need one. A bond that includes
 * half the catalogue says nothing, and the plat's whole readability depends on the
 * wires staying thin — see buildTraverse, which chains rather than drawing a complete
 * graph.
 */

export type BondKind =
  /** Works conceived as one body, made to sit together. */
  | "series"
  /** Same creature or subject recurring across media and years. */
  | "subject"
  /** Tied to one place, whatever the medium. */
  | "place"

export type Bond = {
  id: string
  kind: BondKind
  /** Shown on the line's readout. Short — it sits in a 10px typewriter row. */
  label: string
  /** One line saying what the bond claims. Shown when a parcel is held. */
  note: string
  /**
   * Portfolio file keys, in the order the chain should run. Order matters: the
   * traverse links neighbour to neighbour, so a piece placed last sits at the end of
   * the thread rather than in its middle.
   */
  members: string[]
}

export const BONDS: Bond[] = [
  {
    id: "tall-city",
    kind: "series",
    label: "The Tall City",
    note: "One series. Soyer and Daughter sits at the far end of it rather than inside it.",
    // Zodd: "the lighthouse, skyscraper and aquarium are from the same series and
    // this loosely connects to the soyer piece." Soyer is last so the chain reaches
    // out to it instead of threading through it.
    members: [
      "the-lighthouse.webp",
      "the-skyscraper.webp",
      "the-aquarium.webp",
      "soyer-and-daughter.webp",
    ],
  },
  {
    id: "amsterdam",
    kind: "place",
    label: "Amsterdam",
    note: "The same city, painted twice and then put on a wall there.",
    // Zodd: "the amsterdam mural and the amsterdam painting and the hockey skater
    // image all actually connect." The third piece is not identified yet — see the
    // note in the session; add it here once he names it.
    members: ["amsterdam.webp", "cyclist-mural-amsterdam.webp"],
  },
  {
    id: "eyewear",
    kind: "series",
    label: "Eyewear",
    note: "Two commissions for the same client, made as a pair.",
    members: ["astroboy-sunglasses-1.webp", "tyson-sunglasses-1.webp"],
  },
  {
    id: "maps",
    kind: "series",
    label: "Illustrated maps",
    note: "Two commissions that solve the same problem: a place drawn flat.",
    members: ["mfyc.webp", "wedding.webp"],
  },

  // --- proposed, not yet confirmed by Zodd -------------------------------------
  // These are inferred from titles and subject, not stated. They are the cheapest
  // part of this file to change: reorder, split or delete the lists.
  {
    id: "the-creatures",
    kind: "subject",
    label: "The creatures",
    note: "Animals drawn across every medium, years apart.",
    members: [
      "eagle.webp",
      "eagle-coloured.webp",
      "big-cat.webp",
      "moon-cat.webp",
      "goblin-and-cat.webp",
      "ice-wolf.webp",
      "imagination-fish.webp",
    ],
  },
  {
    id: "high-country",
    kind: "subject",
    label: "High country",
    note: "Landscape without a figure in it. Mountains, valleys, weather.",
    members: ["chisel-peak.webp", "the-valley.webp", "snowy-craque.webp"],
  },
  {
    id: "the-seasons",
    kind: "series",
    label: "The seasons",
    note: "Painted as a set, one for each turn of the year.",
    members: ["spring.webp", "fall.webp", "yule.webp"],
  },
]

const BY_FILE = new Map<string, Bond[]>()
for (const b of BONDS) {
  for (const file of b.members) {
    const list = BY_FILE.get(file)
    if (list) list.push(b)
    else BY_FILE.set(file, [b])
  }
}

export function bondsFor(file: string): Bond[] {
  return BY_FILE.get(file) ?? []
}

export function bondById(id: string): Bond | undefined {
  return BONDS.find((b) => b.id === id)
}

/**
 * The bond a piece leads with when it has several.
 *
 * A piece in two bonds would otherwise chain into both and double the wire count.
 * Earlier entries in BONDS win, so the declared series beat the broad subject
 * groupings and the plat stays sparse.
 */
export function primaryBond(file: string): Bond | undefined {
  return bondsFor(file)[0]
}

export type OffRegister = {
  bond: Bond
  /** A member of the bond that is not in the current view. */
  file: string
  title: string
  /**
   * Register the target is filed under. Needed because titles are not unique: the
   * ink Eagle and the digital Eagle are two different birds, and a lead reading
   * "Eagle -> Eagle" tells a viewer nothing.
   */
  abbr?: string
}

/**
 * Bonds that lead out of whatever is on screen.
 *
 * This is the point of the whole file. Filtered to ink, a viewer sees only the ink
 * register and has no reason to suspect the rest exists. A piece that is tied to work
 * in another register can say so and offer the jump, which turns a filter into a
 * route rather than a dead end.
 */
export function offRegister(
  file: string,
  visibleFiles: Set<string>,
  describe: (file: string) => { title?: string; abbr?: string } | undefined,
): OffRegister[] {
  const out: OffRegister[] = []
  for (const bond of bondsFor(file)) {
    for (const member of bond.members) {
      if (member === file || visibleFiles.has(member)) continue
      const d = describe(member)
      out.push({ bond, file: member, title: d?.title ?? member, abbr: d?.abbr })
    }
  }
  return out
}
