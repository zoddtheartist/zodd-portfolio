import KingsVideo from "@/components/KingsVideo"
import KingsGallery from "@/components/KingsGallery"

export const metadata = {
  title: "The Kings — Zodd",
  description: "100 hand-drawn kings of a decentralised realm.",
}

export default function KingsPage() {
  return (
    <div className="pt-16">
      {/* Video */}
      <section className="w-full bg-black">
        <KingsVideo />
      </section>

      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Collection</h1>
        <p className="text-4xl font-light text-white mb-8">The Kings</p>
        <p className="text-white/60 leading-8 text-base">
          The Kings is a collection of 100 hand-drawn characters, each one conceived and created specifically
          for an individual collector. Every piece was a personal commission in its own right: a ruler built
          for the person who would hold it. The characters range across the mythological, the absurd, and the
          cinematic, bound together by a shared world and Zodd&apos;s unmistakable line. Originally inscribed
          on Bitcoin as permanent, on-chain artefacts, each King belongs, in every sense, to its holder.
        </p>
      </section>

      {/* Grid */}
      <section className="px-4 pb-24">
        <KingsGallery />
      </section>
    </div>
  )
}
