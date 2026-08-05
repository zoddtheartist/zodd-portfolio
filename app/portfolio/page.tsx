import PortfolioPlat from "@/components/survey/PortfolioPlat"
import { images } from "@/lib/portfolio-data"
export type { PortfolioImage } from "@/lib/portfolio-data"
export { images }

export const metadata = {
  title: "Portfolio — Zodd",
  description: "Commissions, Designs, Products, Projects, Studies and Original Works by Zodd.",
}

export default function PortfolioPage() {
  return (
    <>
      {/* Server-rendered so the paper ground is there on first paint. */}
      <style>{"body{background:var(--paper);color:var(--ink)}"}</style>

      <div className="paper-grain bg-[var(--paper)] text-[var(--ink)] pt-24 pb-24">
        <section className="max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[1.5px] border-[var(--ink)] pb-2">
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--oxblood)]">
              The full register — all parcels filed
            </span>
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--ink)]/50">
              {images.length} works / MMXXVI
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 pt-6 pb-8">
            <h1 className="font-[family-name:var(--font-gothic)] text-[clamp(40px,7vw,78px)] font-black uppercase leading-[0.88] tracking-wide text-[var(--ink)]">
              Portfolio
            </h1>
            <p className="font-[family-name:var(--font-typewriter)] text-[10.5px] tracking-[0.2em] uppercase leading-relaxed text-[var(--ink)]/60 max-w-sm">
              Commissions, designs, products, projects, studies and original works. Hover a parcel
              to light the works it is chained to.
            </p>
          </div>
        </section>

        <section className="max-w-screen-2xl mx-auto px-6">
          <PortfolioPlat />
        </section>
      </div>
    </>
  )
}
