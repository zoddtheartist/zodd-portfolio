"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Nav() {
  const path = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)" }}>
      <Link href="/">
        <Image src="/logo.png" alt="Zodd" width={160} height={53} className="h-10 w-auto object-contain" priority />
      </Link>
      <div className="flex gap-8 text-sm tracking-widest uppercase">
        {[
          { href: "/", label: "Home" },
          { href: "/kings", label: "The Kings" },
          { href: "/portfolio", label: "Portfolio" },
        ].map(({ href, label }) => (
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
    </nav>
  )
}
