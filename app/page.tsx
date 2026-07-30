import Image from "next/image"
import ThreeGalleryClient from "@/components/ThreeGalleryClient"
import MobileGallery from "@/components/MobileGallery"
import TrackedLink from "@/components/TrackedLink"

export default function Home() {
  return (
    <>
      {/* Hero — full viewport with background and overlays */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/background.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Base dark tint */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Bottom fade to page bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.25) 0%, transparent 25%, transparent 55%, rgba(8,8,8,1) 100%)",
          }}
        />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <div className="logo-reveal">
            <Image
              src="/logo.png"
              alt="Zodd"
              width={520}
              height={172}
              className="w-[min(520px,78vw)] h-auto drop-shadow-2xl"
              priority
            />
          </div>
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs">Art &amp; Illustration</p>
          <div className="flex gap-5 mt-2">
            <TrackedLink
              href="/portfolio"
              event="hero_portfolio_click"
              className="px-7 py-3 border border-white/25 text-white/75 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Portfolio
            </TrackedLink>
            <TrackedLink
              href="/kings"
              event="hero_kings_click"
              className="px-7 py-3 border border-white/25 text-white/75 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              The Kings
            </TrackedLink>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-35">
          <span className="text-[10px] tracking-widest uppercase text-white">Scroll</span>
          <div className="w-px h-10 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* Bio */}
      <section className="max-w-4xl mx-auto px-6 py-28 text-center">
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">About</h2>
        <p className="text-white/65 leading-8 text-lg">
          ZODD is an artist of 1000 styles: a multidisciplinary artist, creative director, and visual strategist creating work across murals, illustration, character design, digital art, and brand/world development.
        </p>
        <p className="text-white/65 leading-8 text-lg mt-6">
          Unschooled but trained with masters, he has spent years studying image-making through every medium he could reach: tattooing, graffiti, painting, murals, digital illustration, and commercial design. His work has supported visual campaigns for major musical artists, cultural projects, and mayoral races, with original pieces connected to his practice appearing through Christie&apos;s and Sotheby&apos;s.
        </p>
        <p className="text-white/65 leading-8 text-lg mt-6">
          The range in ZODD&apos;s work is not random. It is built from discipline, study, and a deep respect for visual lineage. He draws from art history, street culture, design systems, and character-driven storytelling with equal fluency, moving between styles while keeping the work grounded in craft, atmosphere, and intent.
        </p>
        <p className="text-white/65 leading-8 text-lg mt-6">
          His current practice focuses on creating custom visual environments for brands, communities, products, and cultural spaces, building imagery that can live on walls, packaging, campaigns, events, public spaces, and collectible worlds.
        </p>
      </section>

      <div className="hidden xl:block"><ThreeGalleryClient /></div>
      <div className="xl:hidden"><MobileGallery /></div>

      {/* Section links */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5">
        <TrackedLink
          href="/portfolio"
          event="section_portfolio_click"
          className="group bg-[#080808] p-16 flex flex-col justify-end min-h-64 hover:bg-[#0e0e0e] transition-colors border-r border-white/5"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 mb-3">Works</span>
          <h3 className="text-3xl font-light text-white">Portfolio</h3>
          <p className="text-white/35 text-sm mt-2">Commissions &amp; original works.</p>
          <span className="mt-6 text-xs tracking-widest uppercase text-white/25 group-hover:text-white/55 transition-colors">
            View Work →
          </span>
        </TrackedLink>
        <TrackedLink
          href="/kings"
          event="section_kings_click"
          className="group bg-[#080808] p-16 flex flex-col justify-end min-h-64 hover:bg-[#0e0e0e] transition-colors"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 mb-3">Collection</span>
          <h3 className="text-3xl font-light text-white">The Kings</h3>
          <p className="text-white/35 text-sm mt-2">100 characters. One realm.</p>
          <span className="mt-6 text-xs tracking-widest uppercase text-white/25 group-hover:text-white/55 transition-colors">
            View Collection →
          </span>
        </TrackedLink>
      </section>
    </>
  )
}
