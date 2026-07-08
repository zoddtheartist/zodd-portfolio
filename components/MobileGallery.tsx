import NextImage from "next/image"
import { images as portfolioImages } from "@/lib/portfolio-data"

export default function MobileGallery() {
  return (
    <section className="relative" style={{ height: "58vh" }}>
      <div
        className="gallery-scroll h-full flex items-center gap-3"
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {portfolioImages.map((img) => (
          <div
            key={img.file}
            className="flex-shrink-0 overflow-hidden bg-[#111]"
            style={{ width: 280, height: "72%" }}
          >
            <NextImage
              src={`/portfolio/${img.file}`}
              alt={img.title ?? ""}
              width={560}
              height={420}
              className="w-full h-full object-cover"
              sizes="300px"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #080808 0%, transparent 6%, transparent 94%, #080808 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #080808 0%, transparent 14%, transparent 86%, #080808 100%)",
        }}
      />
    </section>
  )
}
