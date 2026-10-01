import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Nav from "@/components/Nav"
import { gothic, stencil, typewriter } from "./fonts"

export const metadata: Metadata = {
  title: "Zodd — Art Portfolio",
  description: "The art of Zodd. Murals, commissions and original works.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full ${gothic.variable} ${stencil.variable} ${typewriter.variable}`}
    >
      <head>
        {/*
          Sets data-theme before the browser paints, which is the only way to avoid a
          frame of the wrong ground. It has to be inline and blocking: a React effect
          runs after the first paint, so a night viewer would get a flash of paper.

          Reads the stored choice, falls back to the system preference, and wraps the
          storage access because private mode throws on it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');" +
              "if(!t)t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';" +
              "if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})()",
          }}
        />
      </head>
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
