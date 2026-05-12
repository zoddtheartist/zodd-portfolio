import PortfolioGallery from "@/components/PortfolioGallery"

export const metadata = {
  title: "Portfolio — Zodd",
  description: "Commissions, studies, and original works by Zodd.",
}

export type PortfolioImage = {
  file: string
  title?: string
}

export const images: PortfolioImage[] = [
  { file: "amsterdam.png", title: "Amsterdam" },
  { file: "chisel-peak.jpeg", title: "Chisel Peak" },
  { file: "eagle-coloured.png", title: "Eagle" },
  { file: "fall.png", title: "Fall" },
  { file: "frame-3.png", title: "Frame 3" },
  { file: "gaucho.png", title: "Gaucho" },
  { file: "king-graff.png", title: "King Graff" },
  { file: "nyc.png", title: "NYC" },
  { file: "night-market-stand.png", title: "Night Market Stand" },
  { file: "night-market.png", title: "Night Market" },
  { file: "renegade.png", title: "Renegade" },
  { file: "sourboy.png", title: "Sourboy" },
  { file: "soyer-and-daughter.png", title: "Soyer and Daughter" },
  { file: "twins.png", title: "Twins" },
  { file: "mfyc.png", title: "MFYC" },
  { file: "money-land.png", title: "Money Land" },
  { file: "mycellium-tech-render.png", title: "Mycelium Tech" },
  { file: "new-year-grandma.png", title: "New Year Grandma" },
  { file: "plane-sketch.png", title: "Plane Sketch" },
  { file: "self-portrait.png", title: "Self Portrait" },
  { file: "spooky-bois.png", title: "Spooky Bois" },
  { file: "spring.png", title: "Spring" },
  { file: "the-aquarium.png", title: "The Aquarium" },
  { file: "third-eye-ipa.png", title: "Third Eye IPA" },
  { file: "veritai-hq.png", title: "Veritai HQ" },
  { file: "wedding.png", title: "Wedding" },
  { file: "yule.png", title: "Yule" },
  { file: "brain-pattern.png", title: "Brain Pattern" },
  { file: "tech-barn.png", title: "Tech Barn" },
  { file: "astroboy-sunglasses-1.png", title: "Astro Boy Glasses" },
  { file: "tyson-sunglasses-1.png", title: "Tyson Glasses" },
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
