import Image from "next/image"
import Link from "next/link"

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
          <Image
            src="/logo.png"
            alt="Zodd"
            width={520}
            height={172}
            className="w-[min(520px,78vw)] h-auto drop-shadow-2xl"
            priority
          />
          <p className="text-white/40 tracking-[0.3em] uppercase text-xs">Art &amp; Illustration</p>
          <div className="flex gap-5 mt-2">
            <Link
              href="/portfolio"
              className="px-7 py-3 border border-white/25 text-white/75 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Portfolio
            </Link>
            <Link
              href="/kings"
              className="px-7 py-3 border border-white/25 text-white/75 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              The Kings
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-35">
          <span className="text-[10px] tracking-widest uppercase text-white">Scroll</span>
          <div className="w-px h-10 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* Bio */}
      <section className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">About</h2>
        <p className="text-white/65 leading-8 text-lg">
          Zodd is an unschooled artist who trained with masters and has spent years studying the craft across
          every medium he could touch: tattooing, murals, digital illustration, and character design.
          His work has driven visual campaigns for major musical artists and mayoral races, and his original
          pieces have been auctioned at Christie&apos;s and Sotheby&apos;s. From the streets to the auction house,
          Zodd&apos;s practice moves freely between the raw and the refined, always anchored by a relentless
          commitment to character.
        </p>
      </section>

      {/* Section links */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5">
        <Link
          href="/portfolio"
          className="group bg-[#080808] p-16 flex flex-col justify-end min-h-64 hover:bg-[#0e0e0e] transition-colors border-r border-white/5"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 mb-3">Works</span>
          <h3 className="text-3xl font-light text-white">Portfolio</h3>
          <p className="text-white/35 text-sm mt-2">Commissions &amp; original works.</p>
          <span className="mt-6 text-xs tracking-widest uppercase text-white/25 group-hover:text-white/55 transition-colors">
            View Work →
          </span>
        </Link>
        <Link
          href="/kings"
          className="group bg-[#080808] p-16 flex flex-col justify-end min-h-64 hover:bg-[#0e0e0e] transition-colors"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 mb-3">Collection</span>
          <h3 className="text-3xl font-light text-white">The Kings</h3>
          <p className="text-white/35 text-sm mt-2">100 characters. One realm.</p>
          <span className="mt-6 text-xs tracking-widest uppercase text-white/25 group-hover:text-white/55 transition-colors">
            View Collection →
          </span>
        </Link>
      </section>
    </>
  )
}
