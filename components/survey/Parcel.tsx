"use client"
import Image from "next/image"
import { forwardRef } from "react"
import type { PortfolioImage } from "@/lib/portfolio-data"
import { CATEGORIES, sectionLabel } from "@/lib/portfolio-data"

type ParcelProps = {
  img: PortfolioImage
  index: number
  lit: boolean
  /** Chained to the hovered parcel. Gets a brass ring, never dimmed. */
  connected: boolean
  dimmed: boolean
  readout: string | null
  canHover: boolean
  onOpen: () => void
  onHover: (file: string | null) => void
}

/** Small brass survey marker sat on the frame corners. */
function Node({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-[5px] h-[5px] bg-[var(--brass)] border border-[var(--ink)] ${className}`}
    />
  )
}

const Parcel = forwardRef<HTMLDivElement, ParcelProps>(function Parcel(
  { img, index, lit, connected, dimmed, readout, canHover, onOpen, onHover },
  ref,
) {
  const category = CATEGORIES.find((c) => c.id === img.categories[0])

  return (
    <div
      ref={ref}
      className="parcel-enter relative"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
      onMouseEnter={canHover ? () => onHover(img.file) : undefined}
      onMouseLeave={canHover ? () => onHover(null) : undefined}
    >
      <button
        type="button"
        onClick={onOpen}
        onFocus={canHover ? () => onHover(img.file) : undefined}
        onBlur={canHover ? () => onHover(null) : undefined}
        aria-label={`Open ${img.title ?? img.file}`}
        className="group block w-full text-left cursor-zoom-in focus:outline-none"
      >
        <div
          className="relative w-full transition-opacity duration-300"
          // Only a light touch. Dimming the artwork hard would invert the whole
          // point of the page, which is that the work is the loudest thing on it.
          style={{ opacity: dimmed ? 0.78 : 1 }}
        >
          {/* The parcel itself */}
          <div
            className="relative w-full aspect-[4/5] overflow-hidden border-[1.5px] transition-all duration-300"
            style={{
              background: "var(--window)",
              borderColor: lit ? "var(--oxblood)" : "var(--ink)",
              boxShadow: connected ? "0 0 0 2px var(--brass)" : undefined,
            }}
          >
            <Image
              src={`/portfolio/${img.file}`}
              alt={img.title ?? ""}
              width={img.w}
              height={img.h}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={index < 4 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>

          <Node className="-top-[3px] -left-[3px]" />
          <Node className="-top-[3px] -right-[3px]" />
          <Node className="-bottom-[3px] -left-[3px] " />
          <Node className="-bottom-[3px] -right-[3px]" />

          {/* Specimen tag */}
          <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-[var(--ink)]/35 pt-1.5">
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--oxblood)]">
              {sectionLabel(img)}
            </span>
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase text-[var(--ink)]/55">
              {category?.abbr}
            </span>
          </div>
          <div className="font-[family-name:var(--font-gothic)] text-[15px] font-extrabold uppercase leading-tight tracking-wide text-[var(--ink)]">
            {img.title}
          </div>

          {/* Triangulation readout — a surveyor reading the marker */}
          <div
            aria-hidden={!readout}
            className="font-[family-name:var(--font-typewriter)] text-[9.5px] tracking-[0.16em] uppercase text-[var(--oxblood)] transition-opacity duration-200 min-h-[14px]"
            style={{ opacity: readout ? 1 : 0 }}
          >
            {readout ?? ""}
          </div>
        </div>
      </button>
    </div>
  )
})

export default Parcel
