"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import type { PortfolioImage } from "@/app/portfolio/page"

export default function PortfolioGallery({ images }: { images: PortfolioImage[] }) {
  const [active, setActive] = useState<PortfolioImage | null>(null)

  const close = useCallback(() => setActive(null), [])

  const go = useCallback((dir: 1 | -1) => {
    if (!active) return
    const idx = images.findIndex((i) => i.file === active.file)
    setActive(images[(idx + dir + images.length) % images.length])
  }, [active, images])

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
      {/* Masonry grid */}
      <div className="masonry-grid">
        {images.map((item, i) => (
          <div
            key={item.file}
            className="masonry-item group relative overflow-hidden bg-[#111] cursor-zoom-in"
            onClick={() => setActive(item)}
          >
            <Image
              src={`/portfolio/${item.file}`}
              alt={item.title ?? ""}
              width={1000}
              height={1000}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              loading={i < 4 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl px-4 py-2 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div
            className="relative flex flex-col items-center gap-4 max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/portfolio/${active.file}`}
              alt={active.title ?? ""}
              width={2000}
              height={2000}
              className="max-h-[82vh] max-w-[85vw] w-auto h-auto object-contain"
              sizes="85vw"
              priority
            />
            {active.title && (
              <p className="text-white/60 text-sm tracking-widest uppercase">{active.title}</p>
            )}
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl px-4 py-2 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Next"
          >
            &#8594;
          </button>

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
