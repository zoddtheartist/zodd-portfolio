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

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)" }}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Zodd" width={160} height={53} className="h-8 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-6 text-xs tracking-widest uppercase">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-200 hover:text-white ${
                path === href ? "text-white border-b border-white pb-0.5" : "text-white/50"
              }`}
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
        >
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 flex flex-col items-center justify-center gap-10 sm:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-2xl tracking-widest uppercase transition-colors duration-200 ${
                path === href ? "text-white" : "text-white/40 hover:text-white"
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
