import TrackedLink from "./TrackedLink"

type StampedPlateProps = {
  href: string
  /** Vercel Analytics event name. Kept identical to the old CTAs so history is continuous. */
  event: string
  /** Small mono label above the heading. */
  label: string
  title: string
  blurb: string
  cta: string
  stamp: string
}

/**
 * The one place the brutalist frame runs heavy: a stamped land-office plate.
 * Hard corners, ink rules, gothic heading, typewriter metadata.
 */
export default function StampedPlate({
  href,
  event,
  label,
  title,
  blurb,
  cta,
  stamp,
}: StampedPlateProps) {
  return (
    <TrackedLink
      href={href}
      event={event}
      className="group relative flex flex-col justify-between gap-8 border-[1.5px] border-[var(--ink)] bg-[var(--paper)] p-8 transition-colors duration-300 hover:bg-[var(--window)] min-h-56"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-stencil)] text-[13px] font-extrabold tracking-[0.2em] uppercase text-[var(--oxblood)] border-2 border-[var(--oxblood)] px-2.5 py-0.5 -rotate-6 opacity-85"
        >
          {stamp}
        </span>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-gothic)] text-[clamp(34px,5vw,52px)] font-black uppercase leading-[0.88] tracking-wide text-[var(--ink)]">
          {title}
        </h3>
        <p className="mt-3 font-[family-name:var(--font-serif)] text-[15px] leading-relaxed text-[var(--ink)]/75">
          {blurb}
        </p>
      </div>

      <span className="flex items-center justify-between border-t-[1.5px] border-[var(--ink)] pt-3 font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--ink)]/60 transition-colors group-hover:text-[var(--oxblood)]">
        {cta}
        <span aria-hidden="true">&#8594;</span>
      </span>
    </TrackedLink>
  )
}
