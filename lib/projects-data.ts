export type ProjectPlate = {
  file: string
  label: string
  kind: "artwork" | "in-situ" | "detail"
  w: number
  h: number
}

export type ProjectSwatch = {
  hex: string
  name: string
}

export type ProjectRow = {
  key: string
  value: string
}

export type Project = {
  slug: string
  /** Sequence number printed on the rail, e.g. "01". */
  no: string
  title: string
  eyebrow: string
  /** Neutral one-liner beside the headline. Facts, not voice. */
  descriptor: string
  stamp: string
  /** Headline figure for the project panel. */
  figure: string
  figureUnit: string
  figureCaption: string
  plates: ProjectPlate[]
  palette: ProjectSwatch[]
  rows: ProjectRow[]
  /**
   * Neutral facts about how the commission was won. Deliberately NOT a quote
   * from the client's brief: that came through internal comms and their
   * creative language is not ours to publish. The facts carry the credential.
   */
  callFacts: string
  /** The artist's own statement. His voice only, never written for him. */
  note: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "jack-on-the-rockies",
    no: "01",
    title: "Jack on the Rockies",
    eyebrow: "Brown-Forman × Colorado Rockies",
    descriptor: "Panoramic mural · 3M vinyl · Jack Daniel's Terrace, Coors Field · Denver",
    stamp: "Installed",
    figure: "215",
    figureUnit: "SQ FT",
    figureCaption: "printed, panelled and hung — one wall",
    plates: [
      {
        file: "jack-on-the-rockies.jpg",
        label: "The artwork — as delivered",
        kind: "artwork",
        w: 2400,
        h: 1350,
      },
      {
        file: "jack-on-the-rockies-insitu.jpg",
        label: "In situ — Jack Daniel's Terrace, Coors Field",
        kind: "in-situ",
        w: 1134,
        h: 774,
      },
    ],
    // Assayed from the delivered artwork by area.
    palette: [
      { hex: "#D5882E", name: "amber" },
      { hex: "#AB4D1A", name: "ember" },
      { hex: "#912B24", name: "oxblood" },
      { hex: "#54241C", name: "rust" },
      { hex: "#380F28", name: "dusk" },
      { hex: "#0F0407", name: "ink" },
    ],
    rows: [
      { key: "dimensions", value: "235 × 132 in" },
      { key: "installed size", value: "19′ 7″ × 11′ 0″" },
      { key: "aspect", value: "1.78 : 1" },
      { key: "medium", value: "digital illustration" },
      { key: "output", value: "3M vinyl, panoramic" },
      { key: "venue", value: "Jack Daniel's Terrace, Coors Field" },
      { key: "city", value: "Denver, Colorado" },
      { key: "client", value: "Brown-Forman × Colorado Rockies" },
      { key: "selection", value: "open call, limited entries" },
      { key: "year", value: "2026" },
    ],
    callFacts: "Open call for artists · 1–3 concepts · limited entries · selected",
    note:
      "I've spent countless hours staring at the sun set over the Colorado Rockies. I knew that both the purple of the Rockies baseball team and the golden amber of Jack Daniel's were already reflected in those sunsets. The rivers and crowds act to balance and reflect each other, and to me, reflect the overall Colorado experience.",
    featured: true,
  },
]

/** The single project shown on the homepage. Exactly one, by design. */
export function featuredProject(): Project | undefined {
  return projects.find((p) => p.featured)
}
