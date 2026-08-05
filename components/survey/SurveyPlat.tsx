"use client"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { CATEGORIES, viewImages } from "@/lib/portfolio-data"
import type { PortfolioImage, ShowcaseView } from "@/lib/portfolio-data"
import { bearing, buildTraverse, chains } from "@/lib/survey"
import type { SurveyEdge, SurveyPoint } from "@/lib/survey"
import Parcel from "./Parcel"
import SurveyLines from "./SurveyLines"
import Register from "./Register"

/** Frame aspect is 4/5, so the frame's centre sits this far below the parcel top. */
const FRAME_RATIO = 1.25

export default function SurveyPlat() {
  const [view, setView] = useState<ShowcaseView>("all")
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<PortfolioImage | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [edges, setEdges] = useState<SurveyEdge[]>([])
  const [drawKey, setDrawKey] = useState(0)
  const [canHover, setCanHover] = useState(false)
  const [reduce, setReduce] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLDivElement>())
  const prevRects = useRef(new Map<string, DOMRect>())

  const items = useMemo(() => viewImages(view), [view])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: viewImages("all").length }
    for (const cat of CATEGORIES) c[cat.id] = viewImages(cat.id).length
    return c
  }, [])

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setCanHover(hoverQuery.matches)
      setReduce(motionQuery.matches)
    }
    sync()
    hoverQuery.addEventListener("change", sync)
    motionQuery.addEventListener("change", sync)
    return () => {
      hoverQuery.removeEventListener("change", sync)
      motionQuery.removeEventListener("change", sync)
    }
  }, [])

  /** Read parcel geometry and rebuild the traverse. Does not animate anything. */
  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid) return null
    const gr = grid.getBoundingClientRect()
    const points: SurveyPoint[] = []
    const rects = new Map<string, DOMRect>()

    for (const item of items) {
      const node = nodeRefs.current.get(item.file)
      if (!node) continue
      const r = node.getBoundingClientRect()
      rects.set(item.file, r)
      points.push({
        id: item.file,
        x: r.left - gr.left + r.width / 2,
        y: r.top - gr.top + (r.width * FRAME_RATIO) / 2,
        category: item.categories[0],
      })
    }

    setSize({ w: gr.width, h: gr.height })
    setEdges(buildTraverse(points))
    return rects
  }, [items])

  // Re-survey when the view changes, and slide any parcel that survived the
  // change from where it used to be to where it now is (FLIP).
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const rects = measure()
    if (!rects) return

    if (!reduce) {
      for (const [file, next] of rects) {
        const prev = prevRects.current.get(file)
        const node = nodeRefs.current.get(file)
        if (!prev || !node) continue
        const dx = prev.left - next.left
        const dy = prev.top - next.top
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue
        node.style.transition = "none"
        node.style.transform = `translate(${dx}px, ${dy}px)`
        requestAnimationFrame(() => {
          node.style.transition = "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
          node.style.transform = ""
        })
      }
    }

    prevRects.current = rects
    setDrawKey((k) => k + 1)
  }, [items, reduce, measure])

  // Keep the wiring aligned when the grid reflows. No draw animation here, or
  // the lines would re-draw on every resize tick.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(() => {
      const rects = measure()
      if (rects) prevRects.current = rects
    })
    ro.observe(grid)
    return () => ro.disconnect()
  }, [measure])

  const litEdgeIds = useMemo(() => {
    if (!hovered) return new Set<string>()
    return new Set(edges.filter((e) => e.from === hovered || e.to === hovered).map((e) => e.id))
  }, [edges, hovered])

  /** Stations chained directly to the hovered one. */
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

  // Lightbox
  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((current) => {
        if (!current) return current
        const i = items.findIndex((it) => it.file === current.file)
        if (i === -1) return current
        return items[(i + dir + items.length) % items.length]
      })
    },
    [items],
  )

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, close, step])

  const setNodeRef = useCallback((file: string) => {
    return (el: HTMLDivElement | null) => {
      if (el) nodeRefs.current.set(file, el)
      else nodeRefs.current.delete(file)
    }
  }, [])

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-20" aria-labelledby="plat-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] border-[var(--ink)] pb-3 mb-6">
        <div>
          <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
            Plat of the works — township 4 NW
          </p>
          <h2
            id="plat-heading"
            className="font-[family-name:var(--font-gothic)] text-[clamp(38px,6vw,64px)] font-black uppercase leading-[0.9] tracking-wide text-[var(--ink)]"
          >
            Selected Works
          </h2>
        </div>
        <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.22em] uppercase text-[var(--ink)]/55 max-w-xs">
          Parcels of the same hand are chained together. Hover a parcel to read its marker.
        </p>
      </div>

      <Register view={view} counts={counts} onSelect={setView} />

      <div ref={gridRef} className="relative mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        <SurveyLines
          width={size.w}
          height={size.h}
          edges={edges}
          litEdgeIds={litEdgeIds}
          hovering={hovered !== null}
          drawKey={drawKey}
          animate={!reduce}
        />

        {items.map((item, i) => (
          <Parcel
            key={item.file}
            ref={setNodeRef(item.file)}
            img={item}
            index={i}
            lit={hovered === item.file}
            connected={connectedIds.has(item.file)}
            dimmed={
              hovered !== null && hovered !== item.file && !connectedIds.has(item.file)
            }
            readout={hovered === item.file ? readout : null}
            canHover={canHover}
            onOpen={() => setActive(item)}
            onHover={setHovered}
          />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
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

          <div
            className="relative flex flex-col items-center gap-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/portfolio/${active.file}`}
              alt={active.title ?? ""}
              width={active.w}
              height={active.h}
              sizes="85vw"
              priority
              // Narrower on phones so the prev/next controls sit beside the plate
              // instead of on top of it.
              className="max-h-[76vh] sm:max-h-[80vh] max-w-[72vw] sm:max-w-[86vw] w-auto h-auto object-contain border-[1.5px] border-[var(--paper)]/25"
            />
            <p className="font-[family-name:var(--font-typewriter)] text-[11px] tracking-[0.22em] uppercase text-[var(--paper)]/70">
              {active.title}
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
    </section>
  )
}
