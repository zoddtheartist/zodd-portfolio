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
  { file: "Amsterdam.PNG", title: "Amsterdam" },
  { file: "Chisel Peak.jpeg", title: "Chisel Peak" },
  { file: "Eagle Coloured.png", title: "Eagle" },
  { file: "Fall.PNG", title: "Fall" },
  { file: "Frame 3.png", title: "Frame 3" },
  { file: "Gaucho.png", title: "Gaucho" },
  { file: "King Graff.PNG", title: "King Graff" },
  { file: "NYC.PNG", title: "NYC" },
  { file: "Night Market Stand.PNG", title: "Night Market Stand" },
  { file: "Renegade.PNG", title: "Renegade" },
  { file: "Sourboy.PNG", title: "Sourboy" },
  { file: "Soyer and Daughter.PNG", title: "Soyer and Daughter" },
  { file: "Twins.PNG", title: "Twins" },
  { file: "MFYC.PNG", title: "MFYC" },
  { file: "Money Land.PNG", title: "Money Land" },
  { file: "Mycellium Tech Render.png", title: "Mycelium Tech" },
  { file: "New Year Grandma.png", title: "New Year Grandma" },
  { file: "Night Market.PNG", title: "Night Market" },
  { file: "Plane Sketch.png", title: "Plane Sketch" },
  { file: "Self Portrait.png", title: "Self Portrait" },
  { file: "Spooky Bois.PNG", title: "Spooky Bois" },
  { file: "Spring.PNG", title: "Spring" },
  { file: "The Aquariam.PNG", title: "The Aquarium" },
  { file: "Third Eye IPA.png", title: "Third Eye IPA" },
  { file: "Veritai Headquarters Render.png", title: "Veritai HQ" },
  { file: "Wedding.PNG", title: "Wedding" },
  { file: "Yule.PNG", title: "Yule" },
  { file: "brain pattern.png", title: "Brain Pattern" },
  { file: "tech_barn_bright_v2.png", title: "Tech Barn" },
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
