"use client"
import Link from "next/link"
import { track } from "@vercel/analytics"
import type { ReactNode } from "react"

type TrackedLinkProps = {
  href: string
  /** Vercel Analytics custom event name fired on click (the conversion signal). */
  event: string
  className?: string
  children: ReactNode
  /** true for outbound/mailto links rendered as a plain <a>; false for internal next/link routes. */
  external?: boolean
}

export default function TrackedLink({ href, event, className, children, external }: TrackedLinkProps) {
  const handleClick = () => track(event)

  if (external) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
