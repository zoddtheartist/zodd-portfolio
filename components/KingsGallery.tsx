"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { kings, type King } from "@/lib/kings-data"

/** Small brass marker, same as the parcels on the paper side. */
function Node({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-[5px] h-[5px] bg-[var(--brass)] border border-[var(--bone)]/60 ${className}`}
    />
  )
}

const CORNERS = [
  "-top-[3px] -left-[3px]",
  "-top-[3px] -right-[3px]",
  "-bottom-[3px] -left-[3px]",
  "-bottom-[3px] -right-[3px]",
]

export default function KingsGallery() {
  const [active, setActive] = useState<King | null>(null)
  const [zoomed, setZoomed] = useState(false)

  const close = useCallback(() => {
    setActive(null)
    setZoomed(false)
  }, [])

  const go = useCallback((dir: 1 | -1) => {
    setZoomed(false)
    setActive((current) => {
      if (!current) return current
      const idx = kings.findIndex((k) => k.edition === current.edition)
      return kings[(idx + dir + kings.length) % kings.length]
    })
  }, [])

  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", handler)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = prev
    }
  }, [active, close, go])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8 max-w-screen-2xl mx-auto">
        {kings.map((king) => (
          <div key={king.edition} className="relative">
            <button
              type="button"
              onClick={() => setActive(king)}
              aria-label={`Open ${king.name}`}
              className="block w-full text-left cursor-zoom-in focus:outline-none"
            >
              <div className="relative aspect-square overflow-hidden border-[1.5px] border-[var(--bone)]/35 bg-[var(--night-window)] transition-colors duration-300 hover:border-[var(--oxblood)]">
                <Image
                  src={`/kings/${king.file}`}
                  alt={king.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  loading={king.edition <= 10 ? "eager" : "lazy"}
                />
              </div>

              {CORNERS.map((pos) => (
                <Node key={pos} className={pos} />
              ))}

              {/* Specimen tag, always shown. A register does not hide its entries. */}
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-[var(--bone)]/25 pt-1.5">
                <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--brass)]">
                  Ed. {String(king.edition).padStart(3, "0")}
                </span>
                <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--bone)]/40">
                  Sealed
                </span>
              </div>
              <div className="font-[family-name:var(--font-gothic)] text-[16px] font-extrabold uppercase leading-tight tracking-wide text-[var(--bone)]">
                {king.name}
              </div>
              <div className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.12em] uppercase text-[var(--bone)]/45 leading-snug mt-0.5">
                {king.title}
              </div>
            </button>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: "rgba(13,12,10,0.96)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <button
            type="button"
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--bone)]/60 hover:text-[var(--bone)] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div
            className={`relative max-w-[92vw] max-h-[86vh] ${zoomed ? "overflow-auto" : "overflow-hidden"}`}
            style={{ touchAction: "pinch-zoom" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/kings/${active.file}`}
              alt={active.name}
              width={1600}
              height={1600}
              sizes="92vw"
              priority
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? "max-w-none w-[1400px] h-auto cursor-zoom-out border-[1.5px] border-[var(--bone)]/25"
                  : "max-h-[74vh] max-w-[72vw] sm:max-w-[84vw] w-auto h-auto object-contain cursor-zoom-in border-[1.5px] border-[var(--bone)]/25"
              }
            />
          </div>

          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 px-6 text-center pointer-events-none">
            <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--brass)]">
              Ed. {String(active.edition).padStart(3, "0")}
            </p>
            <p className="font-[family-name:var(--font-gothic)] text-[22px] font-extrabold uppercase leading-none tracking-wide text-[var(--bone)]">
              {active.name}
            </p>
            <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.16em] uppercase text-[var(--bone)]/55">
              {active.title}
            </p>
            <p className="font-[family-name:var(--font-serif)] italic text-[13px] text-[var(--bone)]/45 max-w-md mt-1">
              {active.description}
            </p>
          </div>

          <button
            type="button"
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-3xl text-[var(--bone)]/60 hover:text-[var(--bone)] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label="Next"
          >
            &#8594;
          </button>

          <button
            type="button"
            className="absolute top-2 right-2 sm:top-4 sm:right-5 z-10 flex items-center justify-center w-12 h-12 text-2xl text-[var(--bone)]/60 hover:text-[var(--bone)] transition-colors"
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
