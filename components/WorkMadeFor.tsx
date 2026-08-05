import { workMadeFor } from "@/lib/projects-data"

/**
 * Confirmed engagements, set as a ledger rather than a row of headlines. Large
 * gothic names on their own line read as navigation, which is exactly wrong for
 * a credential list. Ruled cells read as a record.
 *
 * The gap is the rule: one pixel of ink between cells, which survives any wrap
 * without per-cell border bookkeeping.
 */
export default function WorkMadeFor() {
  return (
    <section className="max-w-screen-xl mx-auto px-6 pb-16" aria-labelledby="made-for">
      <div className="border-[1.5px] border-[var(--ink)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-[1.5px] border-[var(--ink)] px-4 py-2.5">
          <h2
            id="made-for"
            className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]"
          >
            Work made for
          </h2>
          <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--ink)]/50">
            selected engagements
          </span>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--ink)]/45">
          {workMadeFor.map((name, i) => (
            <li
              key={name}
              className="flex items-baseline gap-2.5 bg-[var(--paper)] px-4 py-4"
            >
              <span
                aria-hidden="true"
                className="font-[family-name:var(--font-typewriter)] text-[9.5px] tabular-nums text-[var(--ink)]/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-[family-name:var(--font-gothic)] text-[clamp(15px,1.7vw,20px)] font-extrabold uppercase leading-tight tracking-wide text-[var(--ink)]">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
