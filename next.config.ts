import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 768, 1080, 1280, 1920],
  },
}

export default nextConfig
