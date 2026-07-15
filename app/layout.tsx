import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Nav from "@/components/Nav"

export const metadata: Metadata = {
  title: "Zodd — Art Portfolio",
  description: "The art of Zodd. Kings collection and portfolio.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#080808] text-[#f0f0f0] antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
