import PortfolioGallery from "@/components/PortfolioGallery"
import { images } from "@/lib/portfolio-data"
export type { PortfolioImage } from "@/lib/portfolio-data"
export { images }

export const metadata = {
  title: "Portfolio — Zodd",
  description: "Commissions, Designs, Products, Projects, Studies and Original Works by Zodd.",
}

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-24">
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Works</h1>
        <p className="text-4xl font-light text-white">Portfolio</p>
        <p className="text-white/40 mt-4 text-sm leading-7">
          Commissions, Designs, Products, Projects, Studies and Original Works.
        </p>
      </section>

      <section className="px-4 max-w-screen-2xl mx-auto">
        <PortfolioGallery images={images} />
      </section>
    </div>
  )
}
