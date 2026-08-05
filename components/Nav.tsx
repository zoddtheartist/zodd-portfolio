"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kings", label: "Kings" },
  { href: "/contact", label: "Contact" },
]

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  // The homepage sits on warm paper; every other route is still on the dark ground.
  const paper = path === "/"

  // Paper needs a heavier scrim than the dark ground did: dark content scrolling
  // under a light, mostly transparent bar stays legible and collides with the links.
  const scrim = paper
    ? "linear-gradient(to bottom, var(--paper) 0%, rgba(239,231,214,0.97) 55%, rgba(239,231,214,0.7) 80%, transparent 100%)"
    : "linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)"

  const linkClass = (active: boolean) => {
    if (paper) {
      return active
        ? "text-[#2b2018] border-b border-[#7a2018] pb-0.5"
        : "text-[#2b2018]/55 hover:text-[#7a2018]"
    }
    return active ? "text-white border-b border-white pb-0.5" : "text-white/50 hover:text-white"
  }

  const bar = paper ? "bg-[#2b2018]/70" : "bg-white/70"

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ background: scrim }}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src={paper ? "/logo-ink.png" : "/logo.png"}
            alt="Zodd"
            width={160}
            height={53}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div
          className={`hidden sm:flex gap-7 text-[13.5px] tracking-[0.18em] uppercase ${
            paper ? "font-[family-name:var(--font-typewriter)]" : ""
          }`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-200 ${linkClass(path === href)}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`block w-5 h-px ${bar} transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px ${bar} transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px ${bar} transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 sm:hidden ${
            paper ? "bg-[#efe7d6]/98" : "bg-[#080808]/98"
          }`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-2xl tracking-widest uppercase transition-colors duration-200 ${
                paper
                  ? path === href
                    ? "text-[#2b2018]"
                    : "text-[#2b2018]/45 hover:text-[#7a2018]"
                  : path === href
                    ? "text-white"
                    : "text-white/40 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
