import { Big_Shoulders, Big_Shoulders_Stencil, Courier_Prime } from "next/font/google"

/** Condensed gothic. Section headers and headlines. */
export const gothic = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-gothic",
  display: "swap",
})

/** Stencil cut of the same family. Stamps only. */
export const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-stencil",
  display: "swap",
})

/** Typewriter. Labels, IDs, metadata, register rows. */
export const typewriter = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-typewriter",
  display: "swap",
})
