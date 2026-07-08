"use client"
import dynamic from "next/dynamic"

const ThreeGallery = dynamic(() => import("./ThreeGallery"), {
  ssr: false,
  loading: () => <div style={{ height: "80vh" }} className="bg-[#080808]" />,
})

export default function ThreeGalleryClient() {
  return <ThreeGallery />
}
