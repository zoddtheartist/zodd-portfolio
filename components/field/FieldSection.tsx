import Image from "next/image"
import TrackedLink from "@/components/TrackedLink"
import { featuredProject } from "@/lib/projects-data"

/** The Lazy Z Bar mark, matching the reference files. */
/**
 * Label colour for a swatch, chosen from the swatch's own luminance.
 *
 * Every chip label used to be bone with a drop shadow, which works on the dark end
 * of a palette and fails on the light end: against this artwork's "sun" the label
 * was 1.31:1 and amber 2.25:1. Picking per chip puts the worst case at 4.90:1.
 *
 * Relative luminance per WCAG; 0.18 is where dark type overtakes light.
 */
function labelOn(hex: string): { color: string; shadow: string } {
  const c = [0, 2, 4]
    .map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  const l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  return l > 0.18
    ? { color: "#15100C", shadow: "0 1px 2px rgba(255,255,255,0.45)" }
    : { color: "#F7F1E4", shadow: "0 1px 3px rgba(0,0,0,0.7)" }
}

/**
 * Columns for the phone palette strip.
 *
 * A flat 33% basis leaves a single chip stretched across the whole width whenever
 * the palette length is 1 mod 3 — a 7-colour palette gave rows of 3/3/1 and "ink"
 * sat alone as a full-width bar. Walk 3, 4, 2 and take the first that does not end
 * on a lone chip. At 390px even 4 columns give ~95px, and the widest name
 * ("oxblood", 9px bold) needs about 58px.
 */
function chipColumns(n: number): number {
  for (const c of [3, 4, 2]) if (n <= c || n % c !== 1) return c
  return 3
}

function Mark({ color = "#EDE4D0", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className="block">
      <g stroke={color} fill="none" strokeWidth="7" strokeLinecap="round">
        <text
          x="50"
          y="46"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Georgia, serif"
          fontSize="54"
          fontWeight="700"
          fill={color}
          stroke="none"
          transform="rotate(90 50 50)"
        >
          Z
        </text>
        <line x1="26" y1="82" x2="74" y2="82" />
      </g>
    </svg>
  )
}

/**
 * Featured project, in the Viridian field-study format: one plate, the colours
 * assayed from it, and a data panel. Renders exactly one project by design, so
 * the section can never grow into a second gallery.
 */
export default function FieldSection() {
  const project = featuredProject()
  if (!project) return null

  const chipCols = chipColumns(project.palette.length)
  const artwork = project.plates.find((p) => p.kind === "artwork")
  const inSitu = project.plates.find((p) => p.kind === "in-situ")

  return (
    <section className="max-w-screen-xl mx-auto px-6 pt-8 pb-20" aria-labelledby="field-heading">
      {/* Rail */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[1.5px] border-[var(--ink)] pb-2">
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
          In the field — project {project.no}
        </span>
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--ink)]/50">
          recent commissions / MMXXVI
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pt-6 pb-6">
        <div>
          <p className="font-[family-name:var(--font-typewriter)] text-[11px] tracking-[0.24em] uppercase text-[var(--ink)]/60">
            {project.eyebrow}
          </p>
          <h2
            id="field-heading"
            className="font-[family-name:var(--font-gothic)] text-[clamp(40px,7vw,78px)] font-black uppercase leading-[0.88] tracking-wide text-[var(--ink)]"
          >
            {project.title}
          </h2>
        </div>
        <p className="font-[family-name:var(--font-typewriter)] text-[10.5px] tracking-[0.2em] uppercase leading-relaxed text-[var(--ink)]/60 max-w-xs">
          {project.descriptor}
        </p>
      </div>

      {/* The plate */}
      {artwork && (
        <figure className="relative border-[1.5px] border-[var(--ink)] overflow-hidden bg-[var(--window)]">
          <Image
            src={`/projects/${artwork.file}`}
            alt={`${project.title} — the delivered artwork`}
            width={artwork.w}
            height={artwork.h}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="block w-full h-auto"
            priority={false}
          />

          <span
            aria-hidden="true"
            className="absolute right-[2.4%] top-[5%] font-[family-name:var(--font-stencil)] text-[clamp(12px,1.7vw,21px)] font-extrabold uppercase tracking-[0.18em] text-[#EDE4D0] border-2 border-[#EDE4D0] px-3 py-0.5 -rotate-6 opacity-80"
          >
            {project.stamp}
          </span>

        </figure>
      )}

      {/* EXIF strip. Sits below the plate rather than over it: the artwork carries
          its own lockup and legal line along the bottom, and covering those would
          both damage the composition and hide required copy. */}
      <div className="plate flex flex-wrap items-center justify-between gap-x-5 gap-y-2 px-4 py-2.5 border-x-[1.5px]">
        <span className="flex flex-wrap gap-x-5 gap-y-1 font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.16em] uppercase">
          <span>
            <span className="text-[var(--brass)] mr-1.5">venue</span>Coors Field
          </span>
          <span>
            <span className="text-[var(--brass)] mr-1.5">city</span>Denver, Colorado
          </span>
          <span>
            <span className="text-[var(--brass)] mr-1.5">state</span>installed 2026
          </span>
        </span>
        <Mark />
      </div>

      {/* Colours assayed from the artwork */}
      {/* On a narrow screen the label stacks above the chips; side by side it
          squeezes the label into a column and clips the swatch names. */}
      <div
        className="flex flex-col sm:flex-row items-stretch border-x-[1.5px] border-b-[1.5px] border-[var(--ink)]"
        aria-label="Colours assayed from the artwork"
      >
        <p className="sm:flex-1 px-4 py-2.5 border-b sm:border-b-0 border-[var(--ink)]/40 font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.22em] uppercase text-[var(--ink)]/70">
          assayed from this artwork — the claim office
        </p>
        {/* Phone: a fixed-height wrapped grid. `chipCols` is picked so the last
            row is never a single chip stretched across the full width, which is what
            a flat 33% basis did to a 7-colour palette (3/3/1). Desktop keeps the
            single nowrap row of 76px cells, untouched. */}
        <div
          className="flex flex-wrap content-start sm:content-normal sm:flex-nowrap"
          style={{ ["--chip-cols" as string]: chipCols }}
        >
          {project.palette.map((s) => {
            const label = labelOn(s.hex)
            return (
              <div
                key={s.hex}
                className="relative basis-[calc(100%/var(--chip-cols))] grow h-[58px] sm:basis-auto sm:grow-0 sm:flex-none sm:w-[76px] sm:h-auto sm:min-h-[44px] border-l border-t sm:border-t-0 border-[var(--rule)] sm:first:border-l"
                style={{ background: s.hex }}
              >
                {/* 9px and bold rather than 8px regular: at this size the weight is
                    doing as much of the legibility work as the colour. */}
                <span
                  className="absolute bottom-1 left-1.5 font-[family-name:var(--font-typewriter)] font-bold text-[9px] tracking-[0.1em] uppercase"
                  style={{ color: label.color, textShadow: label.shadow }}
                >
                  {s.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Panel: the wall, and the numbers */}
      <div className="border-x-[1.5px] border-b-[1.5px] border-[var(--ink)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-2.5 border-b-[1.5px] border-[var(--ink)]">
          <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--oxblood)]">
            The wall — as built
          </span>
          <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--ink)]/50">
            documentation · not the artwork
          </span>
        </div>

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {inSitu && (
            <figure className="p-5 md:border-r-[1.5px] border-[var(--ink)] flex flex-col gap-3">
              <Image
                src={`/projects/${inSitu.file}`}
                alt={`${project.title} installed at Jack Daniel's Terrace, Coors Field`}
                width={inSitu.w}
                height={inSitu.h}
                sizes="(max-width: 768px) 90vw, 480px"
                className="block w-full h-auto border-[1.5px] border-[var(--ink)]"
              />
              <figcaption className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.16em] uppercase text-[var(--ink)]/60">
                {inSitu.label}
              </figcaption>
            </figure>
          )}

          <div className="p-5 flex flex-col border-t-[1.5px] md:border-t-0 border-[var(--ink)]">
            <div className="font-[family-name:var(--font-gothic)] font-black uppercase leading-[0.82] text-[clamp(52px,7vw,90px)] text-[var(--ink)]">
              {project.figure}
              <span className="text-[var(--oxblood)] ml-3">{project.figureUnit}</span>
            </div>
            <p className="mt-2 font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.22em] uppercase text-[var(--oxblood)]">
              {project.figureCaption}
            </p>

            <dl className="mt-5">
              {project.rows.map((r) => (
                <div
                  key={r.key}
                  className="flex justify-between gap-5 border-t border-[var(--ink)]/20 py-1.5 font-[family-name:var(--font-typewriter)] text-[10.5px] tracking-[0.12em] uppercase"
                >
                  <dt className="text-[var(--ink)]/55">{r.key}</dt>
                  <dd className="text-right text-[var(--ink)]">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* The artist's statement. The client's brief is deliberately not quoted. */}
      <div className="border-x-[1.5px] border-b-[1.5px] border-[var(--ink)] px-5 py-5">
        <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--oxblood)] mb-3">
          What I put into it
        </p>
        <blockquote className="font-[family-name:var(--font-serif)] text-[17px] leading-8 text-[var(--ink)]/85 max-w-3xl">
          {project.note}
        </blockquote>
        <p className="mt-4 font-[family-name:var(--font-typewriter)] text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink)]/45">
          {project.callFacts}
        </p>
      </div>

      {/* Enquiry, tracked separately from the general contact click */}
      <TrackedLink
        href="/contact"
        event="field_enquiry_click"
        className="plate plate-action group flex flex-wrap items-center justify-between gap-3 border-x-[1.5px] border-b-[1.5px] px-5 py-4 transition-colors duration-300"
      >
        <span className="font-[family-name:var(--font-gothic)] text-[clamp(22px,3vw,30px)] font-extrabold uppercase leading-none tracking-wide">
          Public work &amp; commissions
        </span>
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase opacity-75 group-hover:opacity-100">
          Enquire &#8594;
        </span>
      </TrackedLink>
    </section>
  )
}
