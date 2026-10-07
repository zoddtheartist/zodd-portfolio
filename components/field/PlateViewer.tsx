"use client"
import Image from "next/image"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ProjectPlate } from "@/lib/projects-data"

/**
 * Click-to-zoom for the In The Field plates.
 *
 * The section itself stays a server component. Only the trigger and the overlay are
 * client code, so the plates and their captions still render on the server and the
 * page ships the minimum JavaScript to make them openable.
 *
 * Behaviour is deliberately the same as the survey plat and the portfolio: escape
 * closes, left and right step, clicking the scrim closes, and the caption sits under
 * the plate. Two galleries on one site that dismiss differently is a worse problem
 * than a little duplication.
 */

type OpenFn = (index: number) => void
const PlateContext = createContext<OpenFn | null>(null)

export function PlateViewerProvider({
  plates,
  title,
  children,
}: {
  plates: ProjectPlate[]
  title: string
  children: React.ReactNode
}) {
  const [index, setIndex] = useState<number | null>(null)
  const close = useCallback(() => setIndex(null), [])
  const open = useCallback<OpenFn>((i) => setIndex(i), [])

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null) return current
        // Wraps, so the arrows never dead-end on a two-plate project.
        return (current + delta + plates.length) % plates.length
      })
    },
    [plates.length],
  )

  useEffect(() => {
    if (index === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowLeft") step(-1)
      else if (e.key === "ArrowRight") step(1)
    }
    window.addEventListener("keydown", onKey)
    // The page behind a modal should not scroll under it.
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [index, close, step])

  const active = index === null ? null : plates[index]

  return (
    <PlateContext.Provider value={open}>
      {children}

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          // Dark in both themes, which is why everything inside uses --bone rather
          // than --paper: --paper follows the theme and goes invisible at night.
          style={{ background: "rgba(43,32,24,0.94)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${active.label}`}
        >
          {plates.length > 1 && (
            <button
              type="button"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--bone)]/60 hover:text-[var(--bone)] transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Previous"
            >
              &#8592;
            </button>
          )}

          <div
            className="relative flex flex-col items-center gap-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/projects/${active.file}`}
              alt={`${title} — ${active.label}`}
              width={active.w}
              height={active.h}
              sizes="85vw"
              priority
              className="max-h-[76vh] sm:max-h-[80vh] max-w-[72vw] sm:max-w-[86vw] w-auto h-auto object-contain border-[1.5px] border-[var(--bone)]/25"
            />
            <p className="font-[family-name:var(--font-typewriter)] text-[11px] tracking-[0.22em] uppercase text-[var(--bone)]/70 text-center">
              {active.label}
            </p>
          </div>

          {plates.length > 1 && (
            <button
              type="button"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--bone)]/60 hover:text-[var(--bone)] transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Next"
            >
              &#8594;
            </button>
          )}

          <button
            type="button"
            className="absolute top-3 right-3 sm:top-5 sm:right-6 font-[family-name:var(--font-typewriter)] text-[11px] tracking-[0.2em] uppercase text-[var(--bone)]/60 hover:text-[var(--bone)] border border-[var(--bone)]/40 px-3 py-1.5 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Close"
          >
            Close
          </button>
        </div>
      )}
    </PlateContext.Provider>
  )
}

/**
 * Wraps a plate so it opens the viewer. Renders a button around server-rendered
 * children rather than re-declaring the image, so the markup and the loading
 * behaviour stay exactly as they were.
 */
export function PlateTrigger({
  index,
  label,
  className = "",
  children,
}: {
  index: number
  label: string
  className?: string
  children: React.ReactNode
}) {
  const open = useContext(PlateContext)
  if (!open) return <>{children}</>
  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={`Open ${label} full size`}
      className={`block w-full cursor-zoom-in focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oxblood)] ${className}`}
    >
      {children}
    </button>
  )
}
