import Image from "next/image"
import TrackedLink from "@/components/TrackedLink"
import StampedPlate from "@/components/StampedPlate"
import FieldSection from "@/components/field/FieldSection"
import SurveyPlat from "@/components/survey/SurveyPlat"
import WorkMadeFor from "@/components/WorkMadeFor"

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
            // A 1.78:1 photo covering a tall phone viewport needs roughly twice
            // the viewport width. Plain 100vw was fetching a 390px file and
            // stretching it over an 844px-tall box.
            sizes="(max-width: 768px) 200vw, 100vw"
          />

          {/* Wash that lifts the print and fades it out into clean paper */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgb(var(--ground-rgb) / 0.7) 0%, rgb(var(--ground-rgb) / 0.18) 32%, rgb(var(--ground-rgb) / 0.35) 62%, var(--paper) 100%)",
            }}
          />
          {/* Soft edge vignette in paper, not black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgb(var(--ground-rgb) / 0) 45%, rgb(var(--ground-rgb) / 0.55) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center">
            <div className="logo-reveal">
              <Image
                src="/logo-ink.png"
                alt="Zodd"
                width={520}
                height={172}
                className="logo-on-paper w-[min(520px,78vw)] h-auto"
                priority
              />
              <Image
                src="/logo.png"
                alt=""
                aria-hidden="true"
                width={520}
                height={172}
                className="logo-on-night w-[min(520px,78vw)] h-auto"
                priority
              />
            </div>
            {/* Sits on the photograph, so in both themes it is the same colour as the
                print underneath it and vanishes wherever the image is busy. Full
                strength now, with a halo in the ground colour: --paper swaps with the
                theme, so the glow is paper by day and night by night and the line
                separates from whatever is behind it either way. */}
            <p
              className="font-[family-name:var(--font-typewriter)] text-[13px] tracking-[0.28em] uppercase text-[var(--ink)]"
              style={{ textShadow: "0 0 10px var(--paper), 0 1px 3px var(--paper)" }}
            >
              Art &amp; Illustration
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-1">
              <TrackedLink
                href="/portfolio"
                event="hero_portfolio_click"
                className="border-[1.5px] border-[var(--ink)] px-8 py-3.5 font-[family-name:var(--font-typewriter)] font-bold text-[13px] tracking-[0.2em] uppercase text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)] active:bg-[var(--ink)] active:text-[var(--paper)]"
              >
                Portfolio
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
              Who I am
            </span>
          </div>

          <div className="font-[family-name:var(--font-serif)] text-[17px] leading-9 text-[var(--ink)]/85 space-y-7 text-pretty sm:text-wrap">
            <p>
              I got my start in graffiti and tattooing, which eventually led me into school,
              concept art, design, and the broader mix of work I do now: murals, commissions,
              illustration, character work, environmental graphics and commercial projects.
            </p>
            <p>
              What keeps me passionate is the problem in front of me. A wall, a product, a
              community, a staircase and a digital screen all ask for a different approach. I like
              figuring out what the opportunity is first. Then I pull from different styles,
              materials and inspirations to make the best thing I can. That might mean painting
              directly on a wall. Sometimes it means wrapping an image, building a character,
              designing an object, or creating artwork that ends up on a product. I like work that
              changes how something feels when you encounter it.
            </p>
            <p>
              I&rsquo;ve made work for Jack Daniel&rsquo;s and the Colorado Rockies at Coors Field,
              Live Nation, Foot Locker, Universal Music Group Canada, Indigo and Ticketmaster, with
              murals and projects in Denver, Amsterdam, Lisbon, Miami, Nashville and beyond.
            </p>
            <p>
              Everything starts with drawing for me. From there, the format is open. I work across
              physical and digital media, at whatever scale makes sense for the idea.
            </p>
          </div>
        </section>

        {/* The two plates, moved up directly under About */}
        <section className="max-w-screen-xl mx-auto px-6 pb-10">
          {/* One plate while Kings is pulled. Held to roughly the width it had as
              half of the old two-up so the frame does not stretch across the page. */}
          <div className="grid grid-cols-1 gap-6 md:max-w-xl md:mx-auto">
            <StampedPlate
              href="/portfolio"
              event="section_portfolio_click"
              label="Works"
              title="Portfolio"
              blurb="Commissions and original work, all of it."
              cta="View work"
              stamp="Filed"
            />
          </div>
        </section>

        {/* Featured project — one at a time, never a second gallery */}
        <FieldSection />

        {/* Sits below the field section: above it, the label read as a heading
            for the project rather than a list in its own right. */}
        <WorkMadeFor />

        {/* The plat */}
        <SurveyPlat />
      </div>
    </>
  )
}
