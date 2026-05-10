"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

export default function PortfolioGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null)

  const close = useCallback(() => setActive(null), [])

  const go = useCallback((dir: 1 | -1) => {
    if (!active) return
    const idx = images.indexOf(active)
    const next = (idx + dir + images.length) % images.length
    setActive(images[next])
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
        {images.map((file) => (
          <div
            key={file}
            className="masonry-item group relative overflow-hidden bg-[#111] cursor-zoom-in"
            onClick={() => setActive(file)}
          >
            <Image
              src={`/portfolio/${file}`}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl px-4 py-2 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Previous"
          >
            &#8592;
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/portfolio/${active}`}
              alt=""
              width={2000}
              height={2000}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
              sizes="90vw"
              priority
            />
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
