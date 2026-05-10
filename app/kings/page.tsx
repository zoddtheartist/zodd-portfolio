import Image from "next/image"
import { kings } from "@/lib/kings-data"

export const metadata = {
  title: "The Kings — Zodd",
  description: "100 hand-drawn kings of a decentralised realm.",
}

export default function KingsPage() {
  return (
    <div className="pt-16">
      {/* Video */}
      <section className="w-full bg-black">
        <video
          className="w-full aspect-video"
          controls
          playsInline
          preload="metadata"
          poster=""
        >
          <source src="/video/kings.mp4" type="video/mp4" />
        </video>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-w-screen-2xl mx-auto">
          {kings.map((king) => (
            <div key={king.edition} className="group relative aspect-square overflow-hidden bg-[#111]">
              <Image
                src={`/kings/${king.file}`}
                alt={king.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-300 flex flex-col justify-end p-3">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[10px] text-white/40 tracking-widest uppercase mb-0.5">
                    #{king.edition}
                  </p>
                  <p className="text-white text-sm font-medium leading-tight">{king.name}</p>
                  <p className="text-white/50 text-[11px] mt-1 leading-tight">{king.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
