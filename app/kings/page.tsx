import KingsVideo from "@/components/KingsVideo"
import KingsGallery from "@/components/KingsGallery"
import { kings } from "@/lib/kings-data"

export const metadata = {
  title: "The Kings — Zodd",
  description: "100 hand-drawn kings of a decentralised realm.",
}

export default function KingsPage() {
  return (
    <>
      {/* The one route deliberately left on the night ground. */}
      <style>{"body{background:var(--night);color:var(--bone)}"}</style>

      <div className="night-grain bg-[var(--night)] text-[var(--bone)] pt-16 pb-24">
        <section className="w-full bg-black border-y-[1.5px] border-[var(--bone)]/25">
          <KingsVideo />
        </section>

        <section className="max-w-4xl mx-auto px-6 pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[1.5px] border-[var(--bone)]/40 pb-2">
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--brass)]">
              The registry — livestock &amp; marks
            </span>
            <span className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.26em] uppercase text-[var(--bone)]/45">
              {kings.length} sealed / MMXXVI
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-gothic)] text-[clamp(48px,10vw,104px)] font-black uppercase leading-[0.86] tracking-wide text-[var(--bone)] pt-6">
            The Kings
          </h1>

          <p className="font-[family-name:var(--font-serif)] text-[17px] leading-8 text-[var(--bone)]/80 mt-6">
            The Kings is a collection of 100 hand-drawn characters, each one conceived and created
            specifically for an individual collector. Every piece was a personal commission in its
            own right: a ruler built for the person who would hold it. The characters range across
            the mythological, the absurd, and the cinematic, bound together by a shared world and
            Zodd&apos;s unmistakable line. Originally inscribed on Bitcoin as permanent, on-chain
            artefacts, each King belongs, in every sense, to its holder.
          </p>

          <p className="font-[family-name:var(--font-typewriter)] text-[10px] tracking-[0.18em] uppercase leading-relaxed text-[var(--bone)]/40 mt-6 border-t border-[var(--bone)]/20 pt-4">
            Original pieces connected to Zodd&apos;s practice have appeared through Christie&apos;s
            and Sotheby&apos;s.
          </p>
        </section>

        <section className="px-4 sm:px-6 pt-14">
          <KingsGallery />
        </section>
      </div>
    </>
  )
}
