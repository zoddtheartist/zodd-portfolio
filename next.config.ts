import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 768, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
