"use client"
import { CATEGORIES } from "@/lib/portfolio-data"
import type { ShowcaseView } from "@/lib/portfolio-data"

type RegisterProps = {
  view: ShowcaseView
  counts: Record<string, number>
  onSelect: (view: ShowcaseView) => void
}

const ROWS: { id: ShowcaseView; label: string; abbr: string }[] = [
  { id: "all", label: "All Filed", abbr: "ALL" },
  ...CATEGORIES.map((c) => ({ id: c.id as ShowcaseView, label: c.label, abbr: c.abbr })),
]

/**
 * The land-office register. Doubles as the gallery filter: selecting a row
 * re-surveys the plat from the full archive rather than hiding tiles.
 */
export default function Register({ view, counts, onSelect }: RegisterProps) {
  return (
    <div className="border-[1.5px] border-[var(--ink)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-[1.5px] border-[var(--ink)] px-3 py-2">
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--oxblood)]">
          The register — surveyed parcels
        </span>
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--ink)]/50">
          select to re-survey
        </span>
      </div>

      {/* The gap is the rule: one pixel of ink showing between cells, which
          survives any wrap without per-cell border bookkeeping. */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-[var(--ink)]/45"
        role="group"
        aria-label="Filter the plat by category"
      >
        {ROWS.map((row, i) => {
          const active = view === row.id
          const last = i === ROWS.length - 1
          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onSelect(row.id)}
              aria-pressed={active}
              // Five cells never divide evenly into two or three columns, so the
              // last one spans the remainder rather than leaving a hole where the
              // container's rule colour would show through.
              className={`${last ? "col-span-2 md:col-span-1" : ""} flex items-baseline justify-between gap-2 px-3 py-3 text-left transition-colors duration-200 ${
                active
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--window)]"
              }`}
            >
              <span className="min-w-0">
                <span
                  className={`block font-[family-name:var(--font-typewriter)] text-[9.5px] tracking-[0.22em] uppercase ${
                    active ? "text-[var(--brass)]" : "text-[var(--oxblood)]"
                  }`}
                >
                  {row.abbr}
                </span>
                <span className="block font-[family-name:var(--font-gothic)] text-[17px] font-extrabold uppercase leading-none tracking-wide">
                  {row.label}
                </span>
              </span>
              <span
                className={`font-[family-name:var(--font-typewriter)] text-[11px] tabular-nums ${
                  active ? "text-[var(--paper)]/80" : "text-[var(--ink)]/50"
                }`}
              >
                {String(counts[row.id] ?? 0).padStart(2, "0")}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
