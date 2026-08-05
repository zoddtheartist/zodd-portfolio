"use client"
import type { CSSProperties } from "react"
import type { SurveyEdge } from "@/lib/survey"

type SurveyLinesProps = {
  width: number
  height: number
  edges: SurveyEdge[]
  /** Edge ids incident to the hovered parcel. */
  litEdgeIds: Set<string>
  hovering: boolean
  /** Bumped on every re-thread so the draw-in animation restarts. */
  drawKey: number
  animate: boolean
}

/**
 * The wiring between parcels. Absolutely positioned over the grid and never
 * interactive, so it can never intercept a click meant for the artwork.
 */
export default function SurveyLines({
  width,
  height,
  edges,
  litEdgeIds,
  hovering,
  drawKey,
  animate,
}: SurveyLinesProps) {
  if (!width || !height) return null

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      {edges.map((e) => {
        const lit = litEdgeIds.has(e.id)
        const len = Math.hypot(e.x2 - e.x1, e.y2 - e.y1)
        const classes = ["survey-line"]
        if (lit) classes.push("is-lit")
        else if (hovering) classes.push("is-dimmed")
        if (animate && !hovering) classes.push("is-drawing")

        return (
          <line
            key={`${drawKey}-${e.id}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            className={classes.join(" ")}
            style={{ "--len": len } as CSSProperties}
          />
        )
      })}
    </svg>
  )
}
