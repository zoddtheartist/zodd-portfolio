import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Nav from "@/components/Nav"
import { gothic, stencil, typewriter } from "./fonts"

export const metadata: Metadata = {
  title: "Zodd — Art Portfolio",
  description: "The art of Zodd. Kings collection and portfolio.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full ${gothic.variable} ${stencil.variable} ${typewriter.variable}`}
    >
      {/* Ground colour comes from globals.css rather than a utility class, so a
          route can override it with a server-rendered style tag and the paper
          page never flashes the dark ground on first paint. */}
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
