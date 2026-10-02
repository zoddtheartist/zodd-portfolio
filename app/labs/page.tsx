import { itemsOfKind, serial, filedOn, type LabItem } from "@/lib/lab-data"

export const metadata = {
  title: "The Lab — Zodd",
  description:
    "Sketches, studies and work in progress, plus two tools you can use: a colour palette picker and a poster builder.",
}

/**
 * Tools and journal entries are unlike each other, so they are not two lists with
 * different headings. Entries sit on paper, the same ground as the rest of the site.
 * Tools sit on the night ground, inset into the page like a bench pulled into a
 * bright room. The distinction is carried by the material rather than a label.
 */

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase">
      {children}
    </span>
  )
}

function Tags({ tags, muted }: { tags?: string[]; muted: string }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
      {tags.map((t) => (
        <span
          key={t}
          className={`font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase ${muted}`}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/** A tool. Night ground, machine-like frame. */
function ToolCard({ item }: { item: LabItem }) {
  const live = item.status === "live" && item.href
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--bone)]/40 pb-2">
        <Meta>
          <span className="text-[var(--brass)]">No. {serial(item)}</span>
        </Meta>
        <Meta>
          <span className="text-[var(--bone)]/55">
            {live ? "tool" : "in progress"}
          </span>
        </Meta>
      </div>
      <h3 className="font-[family-name:var(--font-gothic)] font-black uppercase text-[26px] leading-none mt-4 text-[var(--bone)]">
        {item.title}
      </h3>
      <p className="font-[family-name:var(--font-serif)] text-[15px] leading-7 text-[var(--bone)]/80 mt-3">
        {item.blurb}
      </p>
      <Tags tags={item.tags} muted="text-[var(--bone)]/45" />
      <div className="flex items-baseline justify-between gap-4 mt-5 pt-3 border-t border-[var(--bone)]/25">
        <Meta>
          <span className="text-[var(--bone)]/50">{filedOn(item)}</span>
        </Meta>
        {live ? (
          <Meta>
            <span className="text-[var(--brass)] group-hover:text-[var(--bone)] transition-colors">
              Open →
            </span>
          </Meta>
        ) : null}
      </div>
    </>
  )

  const frame =
    "group block border-[1.5px] border-[var(--bone)]/45 bg-[var(--night)] p-6 h-full"

  // A plain anchor, not next/link: these tools are still self-contained HTML files
  // served from public/, so they need a real navigation rather than a client route.
  return live ? (
    <a
      href={item.href}
      className={`${frame} transition-colors duration-300 hover:border-[var(--brass)]`}
    >
      {body}
    </a>
  ) : (
    <div className={`${frame} opacity-70`}>{body}</div>
  )
}

/** A journal entry. Paper ground, reads as a record. */
function EntryRow({ item }: { item: LabItem }) {
  const live = item.status === "live" && item.href
  const body = (
    <>
      <div className="flex items-baseline gap-4 shrink-0 md:w-32">
        <Meta>
          <span className="text-[var(--oxblood)]">No. {serial(item)}</span>
        </Meta>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-[family-name:var(--font-gothic)] font-black uppercase text-[24px] leading-none text-[var(--ink)]">
            {item.title}
          </h3>
          {!live ? (
            <Meta>
              <span className="text-[var(--ink)]/45">in progress</span>
            </Meta>
          ) : null}
        </div>
        <p className="font-[family-name:var(--font-serif)] text-[16px] leading-8 text-[var(--ink)]/85 mt-2 max-w-2xl">
          {item.blurb}
        </p>
        <Tags tags={item.tags} muted="text-[var(--ink)]/50" />
      </div>
      <div className="shrink-0 md:text-right md:ml-auto">
        <Meta>
          <span className="text-[var(--ink)]/50">{filedOn(item)}</span>
        </Meta>
      </div>
    </>
  )

  const frame =
    "flex flex-col md:flex-row gap-3 md:gap-8 py-7 border-b border-[var(--ink)]/25"

  return live ? (
    <a
      href={item.href}
      className={`${frame} group transition-colors duration-300 hover:bg-[var(--window)]`}
    >
      {body}
    </a>
  ) : (
    <div className={frame}>{body}</div>
  )
}

export default function LabPage() {
  const tools = itemsOfKind("tool")
  const entries = itemsOfKind("entry")

  return (
    <>
      {/* Server-rendered so the paper ground is there on first paint. */}
      <style>{"body{background:var(--paper);color:var(--ink)}"}</style>

      <div className="paper-grain bg-[var(--paper)] text-[var(--ink)] pt-28 pb-24">
        <section className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[1.5px] border-[var(--ink)] pb-2">
            <Meta>
              <span className="text-[var(--oxblood)]">The lab</span>
            </Meta>
            <Meta>
              <span className="text-[var(--ink)]/50">
                {tools.length + entries.length} filed
              </span>
            </Meta>
          </div>

          <h1 className="font-[family-name:var(--font-gothic)] font-black uppercase leading-[0.88] mt-8 text-[clamp(44px,9vw,92px)]">
            The Lab
          </h1>
          <p className="font-[family-name:var(--font-serif)] text-[17px] leading-8 text-[var(--ink)]/85 max-w-2xl mt-5">
            Sketches, studies and work in progress. There are also two tools in here
            you can use: one pulls a colour palette out of a painting, mine or yours,
            and the other turns a drawing into a poster.
          </p>
        </section>

        {tools.length ? (
          <section className="max-w-screen-xl mx-auto px-6 mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--ink)]/35 pb-2 mb-8">
              <Meta>
                <span className="text-[var(--ink)]">Tools</span>
              </Meta>
              <Meta>
                <span className="text-[var(--ink)]/45">things you can use</span>
              </Meta>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((t) => (
                <ToolCard key={t.slug} item={t} />
              ))}
            </div>
          </section>
        ) : null}

        {entries.length ? (
          <section className="max-w-screen-xl mx-auto px-6 mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--ink)]/35 pb-2">
              <Meta>
                <span className="text-[var(--ink)]">Journal</span>
              </Meta>
              <Meta>
                <span className="text-[var(--ink)]/45">newest first</span>
              </Meta>
            </div>
            <div>
              {entries.map((e) => (
                <EntryRow key={e.slug} item={e} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  )
}
