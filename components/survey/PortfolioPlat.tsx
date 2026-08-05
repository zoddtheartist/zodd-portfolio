"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { CATEGORIES, images, sectionLabel } from "@/lib/portfolio-data"
import type { PortfolioImage } from "@/lib/portfolio-data"
import { bearing, buildTraverse, chains } from "@/lib/survey"
import type { SurveyEdge, SurveyPoint } from "@/lib/survey"
import SurveyLines from "./SurveyLines"

/**
 * The full archive, surveyed. Keeps the existing CSS-columns masonry exactly as
 * it was, because the staggered grid is the point. Nothing here re-flows on
 * interaction, so the layout never needs FLIP and the wiring can simply be
 * measured from wherever the columns put each piece.
 */
export default function PortfolioPlat() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<PortfolioImage | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [edges, setEdges] = useState<SurveyEdge[]>([])
  const [canHover, setCanHover] = useState(false)
  const [reduce, setReduce] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLDivElement>())

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setCanHover(hoverQuery.matches)
      setReduce(motionQuery.matches)
    }
    sync()
    // Safari < 14 has addListener only; calling addEventListener there throws
    // and would leave the whole grid mounted with no handlers.
    const attach = (q: MediaQueryList) => {
      if (typeof q.addEventListener === "function") {
        q.addEventListener("change", sync)
        return () => q.removeEventListener("change", sync)
      }
      const legacy = q as MediaQueryList & {
        addListener?: (cb: () => void) => void
        removeListener?: (cb: () => void) => void
      }
      legacy.addListener?.(sync)
      return () => legacy.removeListener?.(sync)
    }
    const a = attach(hoverQuery)
    const b = attach(motionQuery)
    return () => {
      a()
      b()
    }
  }, [])

  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid) return
    const gr = grid.getBoundingClientRect()
    const points: SurveyPoint[] = []
    for (const item of images) {
      const node = nodeRefs.current.get(item.file)
      if (!node) continue
      const r = node.getBoundingClientRect()
      if (!r.width) continue
      points.push({
        id: item.file,
        x: r.left - gr.left + r.width / 2,
        y: r.top - gr.top + r.height / 2,
        category: item.categories[0],
        affinity: item.affinity,
      })
    }
    setSize((prev) =>
      Math.abs(prev.w - gr.width) < 0.5 && Math.abs(prev.h - gr.height) < 0.5
        ? prev
        : { w: gr.width, h: gr.height },
    )
    setEdges(buildTraverse(points))
  }, [])

  // Column heights shift as images decode, so re-measure on grid resize and
  // again whenever a picture lands.
  useEffect(() => {
    measure()
    const grid = gridRef.current
    if (!grid || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(() => measure())
    ro.observe(grid)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  const litEdgeIds = useMemo(() => {
    if (!hovered) return new Set<string>()
    return new Set(edges.filter((e) => e.from === hovered || e.to === hovered).map((e) => e.id))
  }, [edges, hovered])

  const connectedIds = useMemo(() => {
    if (!hovered) return new Set<string>()
    const ids = new Set<string>()
    for (const e of edges) {
      if (e.from === hovered) ids.add(e.to)
      else if (e.to === hovered) ids.add(e.from)
    }
    return ids
  }, [edges, hovered])

  const readout = useMemo(() => {
    if (!hovered) return null
    const edge = edges.find((e) => e.from === hovered) ?? edges.find((e) => e.to === hovered)
    if (!edge) return "no adjacent station"
    const forward = edge.from === hovered
    const [x1, y1] = forward ? [edge.x1, edge.y1] : [edge.x2, edge.y2]
    const [x2, y2] = forward ? [edge.x2, edge.y2] : [edge.x1, edge.y1]
    const unit = (gridRef.current?.getBoundingClientRect().width ?? 1) / 4
    return `brg ${bearing(x1, y1, x2, y2)} · ${chains(x1, y1, x2, y2, unit)}`
  }, [edges, hovered])

  const close = useCallback(() => {
    setActive(null)
    setZoomed(false)
  }, [])

  const step = useCallback((dir: 1 | -1) => {
    setZoomed(false)
    setActive((current) => {
      if (!current) return current
      const i = images.findIndex((it) => it.file === current.file)
      if (i === -1) return current
      return images[(i + dir + images.length) % images.length]
    })
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [active, close, step])

  const setNodeRef = useCallback(
    (file: string) => (el: HTMLDivElement | null) => {
      if (el) nodeRefs.current.set(file, el)
      else nodeRefs.current.delete(file)
    },
    [],
  )

  return (
    <>
      <div ref={gridRef} className="relative">
        <SurveyLines
          width={size.w}
          height={size.h}
          edges={edges}
          litEdgeIds={litEdgeIds}
          hovering={hovered !== null}
          drawKey={0}
          animate={false}
        />

        <div className="masonry-grid">
          {images.map((item, i) => {
            const category = CATEGORIES.find((c) => c.id === item.categories[0])
            const status = item.status
              ? [item.status, item.statusNote].filter(Boolean).join(" · ")
              : null
            const commercial = item.status != null && item.status !== "study"
            const lit = hovered === item.file
            const connected = connectedIds.has(item.file)
            const dimmed = hovered !== null && !lit && !connected

            return (
              <div
                key={item.file}
                ref={setNodeRef(item.file)}
                className="masonry-item relative"
                onMouseEnter={canHover ? () => setHovered(item.file) : undefined}
                onMouseLeave={canHover ? () => setHovered(null) : undefined}
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  onFocus={canHover ? () => setHovered(item.file) : undefined}
                  onBlur={canHover ? () => setHovered(null) : undefined}
                  aria-label={`Open ${item.title ?? item.file}`}
                  className="block w-full text-left cursor-zoom-in focus:outline-none"
                >
                  <div
                    className="transition-opacity duration-300"
                    style={{ opacity: dimmed ? 0.5 : 1 }}
                  >
                    <div
                      className="relative overflow-hidden border-[1.5px] transition-all duration-300"
                      style={{
                        background: "var(--window)",
                        borderColor: lit ? "var(--oxblood)" : "var(--ink)",
                        boxShadow: connected ? "0 0 0 2px var(--brass)" : undefined,
                      }}
                    >
                      <Image
                        src={`/portfolio/${item.file}`}
                        alt={item.title ?? ""}
                        width={item.w}
                        height={item.h}
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        loading={i < 6 ? "eager" : "lazy"}
                        onLoad={measure}
                        className="block w-full h-auto"
                      />
                    </div>

                    {/* Corner markers */}
                    {[
                      "-top-[3px] -left-[3px]",
                      "-top-[3px] -right-[3px]",
                      "-bottom-[3px] -left-[3px]",
                      "-bottom-[3px] -right-[3px]",
                    ].map((pos) => (
                      <span
                        key={pos}
                        aria-hidden="true"
                        className={`absolute w-[5px] h-[5px] bg-[var(--brass)] border border-[var(--ink)] ${pos}`}
                      />
                    ))}

                    <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-[var(--ink)]/35 pt-1.5">
                      <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--oxblood)]">
                        {sectionLabel(item)}
                      </span>
                      <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--ink)]/55">
                        {category?.abbr}
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-gothic)] text-[15px] font-extrabold uppercase leading-tight tracking-wide text-[var(--ink)]">
                      {item.title}
                    </div>
                    <div className="font-[family-name:var(--font-typewriter)] text-[10.5px] tracking-[0.14em] uppercase min-h-[15px]">
                      {lit && readout ? (
                        <span className="text-[var(--oxblood)]">{readout}</span>
                      ) : status ? (
                        <span
                          className={
                            commercial ? "font-bold text-[var(--oxblood)]" : "text-[var(--ink)]/50"
                          }
                        >
                          {status}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: "rgba(43,32,24,0.94)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.title ?? "Artwork"}
        >
          <button
            type="button"
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          {/* Scroll container so a zoomed plate can be panned, and pinch-zoom is
              explicitly permitted on top of the click-to-zoom toggle. */}
          <div
            className={`relative max-w-[92vw] max-h-[88vh] ${zoomed ? "overflow-auto" : "overflow-hidden"}`}
            style={{ touchAction: "pinch-zoom" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/portfolio/${active.file}`}
              alt={active.title ?? ""}
              width={active.w}
              height={active.h}
              sizes="92vw"
              priority
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? "max-w-none w-auto h-auto cursor-zoom-out border-[1.5px] border-[var(--paper)]/25"
                  : "max-h-[80vh] max-w-[72vw] sm:max-w-[86vw] w-auto h-auto object-contain cursor-zoom-in border-[1.5px] border-[var(--paper)]/25"
              }
              style={zoomed ? { width: Math.min(active.w, 2400) } : undefined}
            />
          </div>

          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none">
            <p className="font-[family-name:var(--font-typewriter)] text-[11px] tracking-[0.22em] uppercase text-[var(--paper)]/75">
              {sectionLabel(active)} · {active.title}
            </p>
            <p className="font-[family-name:var(--font-typewriter)] text-[9.5px] tracking-[0.18em] uppercase text-[var(--paper)]/40">
              {zoomed ? "tap to fit" : "tap image to zoom · pinch to magnify"}
            </p>
          </div>

          <button
            type="button"
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next"
          >
            &#8594;
          </button>

          <button
            type="button"
            className="absolute top-2 right-2 sm:top-4 sm:right-5 z-10 flex items-center justify-center w-12 h-12 text-2xl text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors"
            onClick={close}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
      )}
    </>
  )
}
