import type { Category } from "./portfolio-data"

export type SurveyPoint = {
  id: string
  x: number
  y: number
  category: Category
  /**
   * Pieces sharing a key are chained to each other before geometry is
   * considered. Without this the traverse is purely spatial, so works that
   * obviously belong together (a pair of eyewear designs, two illustrated maps)
   * only connect if they happen to land near each other in the grid.
   */
  affinity?: string
}

export type SurveyEdge = {
  id: string
  from: string
  to: string
  x1: number
  y1: number
  x2: number
  y2: number
  category: Category
}

const edge = (a: SurveyPoint, b: SurveyPoint): SurveyEdge => ({
  id: `${a.id}->${b.id}`,
  from: a.id,
  to: b.id,
  x1: a.x,
  y1: a.y,
  x2: b.x,
  y2: b.y,
  category: a.category,
})

/** Reading order down the page. */
const byPosition = (a: SurveyPoint, b: SurveyPoint) => a.y - b.y || a.x - b.x

/** Greedy nearest-neighbour chain through a set of stations. */
function chain(stations: SurveyPoint[]): SurveyEdge[] {
  if (stations.length < 2) return []
  const out: SurveyEdge[] = []
  const remaining = [...stations].sort(byPosition)
  let current = remaining.shift() as SurveyPoint

  while (remaining.length) {
    let best = 0
    let bestDistance = Infinity
    for (let i = 0; i < remaining.length; i++) {
      const d = (remaining[i].x - current.x) ** 2 + (remaining[i].y - current.y) ** 2
      if (d < bestDistance) {
        bestDistance = d
        best = i
      }
    }
    const next = remaining.splice(best, 1)[0]
    out.push(edge(current, next))
    current = next
  }
  return out
}

/**
 * Connect parcels of the same category into a traverse, NOT a complete graph.
 *
 * A complete graph is O(n^2) and turns the plat into a spiderweb that buries the
 * artwork: 20 same-category pieces would draw 190 lines. A traverse draws about
 * n-1 per category, which is also what a real survey produces, a chain of
 * stations rather than an all-pairs mesh.
 *
 * Affinity clusters are chained internally first, then each cluster joins the
 * wider category chain through its topmost member, so a deliberate pairing
 * survives wherever the two pieces land in the grid.
 */
export function buildTraverse(points: SurveyPoint[]): SurveyEdge[] {
  const byCategory = new Map<Category, SurveyPoint[]>()
  for (const p of points) {
    const list = byCategory.get(p.category)
    if (list) list.push(p)
    else byCategory.set(p.category, [p])
  }

  const edges: SurveyEdge[] = []

  for (const group of byCategory.values()) {
    if (group.length < 2) continue

    const clusters = new Map<string, SurveyPoint[]>()
    for (const p of group) {
      const key = p.affinity ?? `solo:${p.id}`
      const list = clusters.get(key)
      if (list) list.push(p)
      else clusters.set(key, [p])
    }

    const representatives: SurveyPoint[] = []
    for (const members of clusters.values()) {
      const sorted = [...members].sort(byPosition)
      if (sorted.length > 1) {
        for (let i = 0; i < sorted.length - 1; i++) edges.push(edge(sorted[i], sorted[i + 1]))
      }
      representatives.push(sorted[0])
    }

    edges.push(...chain(representatives))
  }

  return edges
}

/** Surveyor's quadrant bearing, e.g. "N 34° E". */
export function bearing(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1
  // Screen y grows downward; flip so north is up.
  const dy = y1 - y2
  if (dx === 0 && dy === 0) return "—"
  const deg = Math.round((Math.atan2(Math.abs(dx), Math.abs(dy)) * 180) / Math.PI)
  const ns = dy >= 0 ? "N" : "S"
  const ew = dx >= 0 ? "E" : "W"
  return `${ns} ${deg}° ${ew}`
}

/** Straight-line distance between two stations, in whole parcel widths. */
export function chains(x1: number, y1: number, x2: number, y2: number, unit: number): string {
  const d = Math.hypot(x2 - x1, y2 - y1) / Math.max(unit, 1)
  return `${d.toFixed(1)} ch`
}
