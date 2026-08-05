import Image from "next/image"
import TrackedLink from "@/components/TrackedLink"
import StampedPlate from "@/components/StampedPlate"
import FieldSection from "@/components/field/FieldSection"
import SurveyPlat from "@/components/survey/SurveyPlat"

export default function Home() {
  return (
    <>
      {/* Server-rendered so the paper ground is present on first paint. Other
          routes keep the dark ground from globals.css. */}
      <style>{"body{background:var(--paper);color:var(--ink)}"}</style>

      <div className="paper-grain bg-[var(--paper)] text-[var(--ink)]">
        {/* Hero — the photograph printed onto the paper, bleeding off into light */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--paper)]">
          <Image
            src="/background.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center ink-print"
            sizes="100vw"
          />

          {/* Wash that lifts the print and fades it out into clean paper */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(239,231,214,0.7) 0%, rgba(239,231,214,0.18) 32%, rgba(239,231,214,0.35) 62%, var(--paper) 100%)",
            }}
          />
          {/* Soft edge vignette in paper, not black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(239,231,214,0) 45%, rgba(239,231,214,0.55) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center">
            <div className="logo-reveal">
              <Image
                src="/logo-ink.png"
                alt="Zodd"
                width={520}
                height={172}
                className="w-[min(520px,78vw)] h-auto"
                priority
              />
            </div>
            <p className="font-[family-name:var(--font-typewriter)] text-[13px] tracking-[0.28em] uppercase text-[var(--ink)]/75">
              Art &amp; Illustration
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-1">
              <TrackedLink
                href="/portfolio"
                event="hero_portfolio_click"
                className="border-[1.5px] border-[var(--ink)] px-8 py-3.5 font-[family-name:var(--font-typewriter)] font-bold text-[13px] tracking-[0.2em] uppercase text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Portfolio
              </TrackedLink>
              <TrackedLink
                href="/kings"
                event="hero_kings_click"
                className="border-[1.5px] border-[var(--ink)] px-8 py-3.5 font-[family-name:var(--font-typewriter)] font-bold text-[13px] tracking-[0.2em] uppercase text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                The Kings
              </TrackedLink>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-45">
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.24em] uppercase text-[var(--ink)]">
              Scroll
            </span>
            <div className="w-px h-10 bg-[var(--ink)]/60" />
          </div>
        </section>

        {/* About */}
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <div className="flex items-baseline justify-between gap-4 border-b-[1.5px] border-[var(--ink)] pb-2 mb-10">
            <h2 className="font-[family-name:var(--font-gothic)] text-[clamp(30px,4.5vw,46px)] font-black uppercase leading-none tracking-wide text-[var(--ink)]">
              About
            </h2>
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
              The proprietor
            </span>
          </div>

          <div className="font-[family-name:var(--font-serif)] text-[17px] leading-9 text-[var(--ink)]/85 space-y-7">
            <p>
              ZODD is an artist of 1000 styles: a multidisciplinary artist, creative director, and
              visual strategist creating work across murals, illustration, character design, digital
              art, and brand/world development.
            </p>
            <p>
              Unschooled but trained with masters, he has spent years studying image-making through
              every medium he could reach: tattooing, graffiti, painting, murals, digital
              illustration, and commercial design. His work has supported visual campaigns for major
              musical artists, cultural projects, and mayoral races, with original pieces connected
              to his practice appearing through Christie&apos;s and Sotheby&apos;s.
            </p>
            <p>
              The range in ZODD&apos;s work is not random. It is built from discipline, study, and a
              deep respect for visual lineage. He draws from art history, street culture, design
              systems, and character-driven storytelling with equal fluency, moving between styles
              while keeping the work grounded in craft, atmosphere, and intent.
            </p>
            <p>
              His current practice focuses on creating custom visual environments for brands,
              communities, products, and cultural spaces, building imagery that can live on walls,
              packaging, campaigns, events, public spaces, and collectible worlds.
            </p>
          </div>
        </section>

        {/* The two plates, moved up directly under About */}
        <section className="max-w-screen-xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StampedPlate
              href="/portfolio"
              event="section_portfolio_click"
              label="Works"
              title="Portfolio"
              blurb="Commissions and original works, filed in full."
              cta="View work"
              stamp="Filed"
            />
            <StampedPlate
              href="/kings"
              event="section_kings_click"
              label="Collection"
              title="The Kings"
              blurb="One hundred characters. One realm."
              cta="View collection"
              stamp="Sealed"
            />
          </div>
        </section>

        {/* Featured project — one at a time, never a second gallery */}
        <FieldSection />

        {/* The plat */}
        <SurveyPlat />
      </div>
    </>
  )
}
