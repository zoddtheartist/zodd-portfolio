"use client"
import { useEffect, useState } from "react"

/**
 * Day / night switch for the paper side of the site.
 *
 * The theme lives as `data-theme` on <html>, which is what the token swap in
 * globals.css keys off. An inline script in the layout sets that attribute before
 * first paint, so this component never has to apply the theme on mount — it only
 * reads what is already there and lets the viewer change it.
 *
 * That split is deliberate. Applying the theme from a React effect would paint the
 * wrong ground for one frame, which on a dark-mode phone at night is exactly the
 * flash this feature is meant to prevent.
 *
 * Choice is remembered per browser. With nothing stored the system preference wins,
 * and following the system is the state we return to when the viewer picks the
 * theme that matches it.
 */

type Theme = "light" | "dark"

function systemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function ThemeToggle() {
  // Start as null so the first render matches what the server sent, whatever the
  // stored theme turns out to be. Reading localStorage during render would differ
  // between server and client and trip hydration.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const current = root.getAttribute("data-theme")
    setTheme(current === "dark" ? "dark" : "light")

    // Follow the system while the viewer has made no explicit choice.
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)")
    if (!mq) return
    const onChange = () => {
      if (localStorage.getItem("theme")) return
      const next = systemTheme()
      root.setAttribute("data-theme", next)
      setTheme(next)
    }
    // Safari below 14 has no addEventListener here. The survey plat was dead on
    // Zodd's phone for exactly this reason, so keep the fallback.
    if (mq.addEventListener) mq.addEventListener("change", onChange)
    else mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    setTheme(next)
    try {
      // Picking the theme the system already wants means "stop overriding".
      if (next === systemTheme()) localStorage.removeItem("theme")
      else localStorage.setItem("theme", next)
    } catch {
      // Private mode and blocked storage both throw. The theme still applies for
      // this page view; it just will not be remembered.
    }
  }

  const dark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      // Labelled rather than icon-only, and the label says what pressing it does.
      aria-label={dark ? "Switch to day" : "Switch to night"}
      title={dark ? "Switch to day" : "Switch to night"}
      className="flex items-center gap-2 py-2.5 font-[family-name:var(--font-typewriter)] text-[13.5px] tracking-[0.18em] uppercase text-[var(--ink)]/55 transition-colors duration-200 hover:text-[var(--oxblood)]"
    >
      <span
        aria-hidden="true"
        className="inline-block w-3 h-3 border border-current rounded-full"
        // A half-filled disc: the fill is the ink itself, so it inverts with the
        // theme rather than needing a second colour.
        style={{
          background: dark
            ? "linear-gradient(to right, currentColor 50%, transparent 50%)"
            : "transparent",
        }}
      />
      {/* Render nothing until the theme is known, so the button does not flip
          labels on hydration. The disc keeps the row from reflowing. */}
      <span className="min-w-[2.6em] text-left">{theme === null ? "" : dark ? "Night" : "Day"}</span>
    </button>
  )
}
