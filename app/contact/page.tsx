import TrackedLink from "@/components/TrackedLink"

export const metadata = {
  title: "Contact — Zodd",
  description:
    "Enquiries for public work, murals and environmental graphics, commissions, brand collaborations and press.",
}

const enquiries = [
  { label: "Public work & murals", note: "walls, environments, installations" },
  { label: "Commissions", note: "original and digital work" },
  { label: "Brand & commercial", note: "campaigns, packaging, identity" },
  { label: "Press & general", note: "everything else" },
]

export default function ContactPage() {
  return (
    <>
      {/* Server-rendered so the paper ground is there on first paint. */}
      <style>{"body{background:var(--paper);color:var(--ink)}"}</style>

      <div className="paper-grain bg-[var(--paper)] text-[var(--ink)] pt-28 pb-24">
        <section className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[1.5px] border-[var(--ink)] pb-2">
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
              The land office — enquiries
            </span>
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--ink)]/50">
              open / MMXXVI
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-gothic)] text-[clamp(48px,10vw,96px)] font-black uppercase leading-[0.86] tracking-wide text-[var(--ink)] pt-6">
            Contact
          </h1>

          <p className="font-[family-name:var(--font-serif)] text-[17px] leading-8 text-[var(--ink)]/85 max-w-xl mt-5">
            Currently taking public work: murals, environmental graphics and painted or printed work
            at architectural scale, alongside commissions, brand projects and original work.
          </p>

          {/* What the office files. The gap is the rule between cells. */}
          <div className="border-[1.5px] border-[var(--ink)] mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-[1.5px] border-[var(--ink)] px-4 py-2.5">
              <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--oxblood)]">
                What the office files
              </span>
              <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--ink)]/50">
                all welcome
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-px bg-[var(--ink)]/45">
              {enquiries.map((e, i) => (
                <li key={e.label} className="flex items-baseline gap-2.5 bg-[var(--paper)] px-4 py-3.5">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-typewriter)] text-[9.5px] tabular-nums text-[var(--ink)]/35"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-gothic)] text-[19px] font-extrabold uppercase leading-none tracking-wide text-[var(--ink)]">
                      {e.label}
                    </span>
                    <span className="block font-[family-name:var(--font-typewriter)] text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink)]/50 mt-1.5">
                      {e.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The plate. Event name unchanged so the conversion history stays continuous. */}
          <TrackedLink
            href="mailto:contact@zodd.gallery"
            event="contact_email_click"
            external
            className="group mt-6 flex flex-wrap items-center justify-between gap-4 border-[1.5px] border-[var(--ink)] bg-[var(--ink)] px-6 py-6 text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--oxblood)] active:bg-[var(--oxblood)]"
          >
            <span>
              <span className="block font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.3em] uppercase text-[var(--brass)] mb-2">
                Write to the office
              </span>
              <span className="font-[family-name:var(--font-gothic)] text-[clamp(24px,4.5vw,40px)] font-black uppercase leading-none tracking-wide break-all">
                contact@zodd.gallery
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-stencil)] text-[14px] font-extrabold uppercase tracking-[0.2em] border-2 border-[var(--paper)]/70 px-3 py-1 -rotate-6 text-[var(--paper)]/80"
            >
              Open
            </span>
          </TrackedLink>

          <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/45 mt-4">
            Based in Edmonton · working anywhere the wall is
          </p>
        </section>
      </div>
    </>
  )
}
