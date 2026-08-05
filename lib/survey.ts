import type { Category } from "./portfolio-data"

export type SurveyPoint = {
  id: string
  x: number
  y: number
  category: Category
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

/**
 * Connect parcels of the same category into a nearest-neighbour chain (a survey
 * traverse), NOT a complete graph.
 *
 * A complete graph is O(n^2) and turns the plat into a spiderweb that buries the
 * artwork: 20 same-category pieces would draw 190 lines. A traverse draws n-1
 * per category, so the whole plat stays around one line per piece. It is also
 * what a real survey produces: a chain of stations, not an all-pairs mesh.
 */
export function buildTraverse(points: SurveyPoint[]): SurveyEdge[] {
  const byCategory = new Map<Category, SurveyPoint[]>()
  for (const p of points) {
    const list = byCategory.get(p.category)
    if (list) list.push(p)
    else byCategory.set(p.category, [p])
  }

  const edges: SurveyEdge[] = []

  for (const [category, group] of byCategory) {
    if (group.length < 2) continue

    // Start at the top-left-most station so the chain reads down the page.
    const remaining = [...group].sort((a, b) => a.y - b.y || a.x - b.x)
    let current = remaining.shift() as SurveyPoint

    while (remaining.length) {
      let bestIndex = 0
      let bestDistance = Infinity
      for (let i = 0; i < remaining.length; i++) {
        const d = (remaining[i].x - current.x) ** 2 + (remaining[i].y - current.y) ** 2
        if (d < bestDistance) {
          bestDistance = d
          bestIndex = i
        }
      }
      const next = remaining.splice(bestIndex, 1)[0]
      edges.push({
        id: `${current.id}->${next.id}`,
        from: current.id,
        to: next.id,
        x1: current.x,
        y1: current.y,
        x2: next.x,
        y2: next.y,
        category,
      })
      current = next
    }
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
