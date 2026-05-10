"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { kings, type King } from "@/lib/kings-data"

export default function KingsGallery() {
  const [active, setActive] = useState<King | null>(null)

  const close = useCallback(() => setActive(null), [])

  const go = useCallback((dir: 1 | -1) => {
    if (!active) return
    const idx = kings.findIndex((k) => k.edition === active.edition)
    setActive(kings[(idx + dir + kings.length) % kings.length])
  }, [active])

  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [active, close, go])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-w-screen-2xl mx-auto">
        {kings.map((king) => (
          <div
            key={king.edition}
            className="group relative aspect-square overflow-hidden bg-[#111] cursor-zoom-in"
            onClick={() => setActive(king)}
          >
            <Image
              src={`/kings/${king.file}`}
              alt={king.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-300 flex flex-col justify-end p-3">
              <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[10px] text-white/40 tracking-widest uppercase mb-0.5">#{king.edition}</p>
                <p className="text-white text-sm font-medium leading-tight">{king.name}</p>
                <p className="text-white/50 text-[11px] mt-1 leading-tight">{king.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl px-4 py-2 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          {/* Image + info */}
          <div
            className="relative flex flex-col items-center gap-4 max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/kings/${active.file}`}
              alt={active.name}
              width={1200}
              height={1200}
              className="max-h-[80vh] max-w-[85vw] w-auto h-auto object-contain"
              sizes="85vw"
              priority
            />
            <div className="text-center">
              <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">#{active.edition}</p>
              <p className="text-white text-base font-medium">{active.name}</p>
              <p className="text-white/45 text-xs mt-0.5">{active.title}</p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl px-4 py-2 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Next"
          >
            &#8594;
          </button>

          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/40 hover:text-white text-2xl z-10 transition-colors"
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
