import PortfolioGallery from "@/components/PortfolioGallery"

export const metadata = {
  title: "Portfolio — Zodd",
  description: "Commissions, studies, and original works by Zodd.",
}

const images = [
  "IMG_1674.PNG",
  "IMG_1675.PNG",
  "IMG_1676.PNG",
  "IMG_1677.PNG",
  "IMG_1678.PNG",
  "IMG_1679.PNG",
  "IMG_1680.PNG",
  "IMG_1681.PNG",
  "IMG_1682.PNG",
  "IMG_1683.PNG",
  "IMG_1684.PNG",
  "IMG_1685.PNG",
  "IMG_1688.PNG",
  "IMG_1689.PNG",
  "IMG_1690.PNG",
  "astroboy-sunglasses-1.png",
  "tyson-sunglasses-1.png",
]

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-24">
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Works</h1>
        <p className="text-4xl font-light text-white">Portfolio</p>
        <p className="text-white/40 mt-4 text-sm leading-7">
          Commissions, studies, and original works.
        </p>
      </section>

      <section className="px-4 max-w-screen-2xl mx-auto">
        <PortfolioGallery images={images} />
      </section>
    </div>
  )
}
