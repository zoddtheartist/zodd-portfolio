"use client"
import { useEffect, useRef, useState } from "react"
import { themeNow, msUntilNextSwitch, formatClock, type Theme } from "@/lib/daylight"

/**
 * The clock that drives the theme.
 *
 * Three states, not two. "Auto" follows the viewer's own clock and flips at the
 * day/night boundary while the page is open. Choosing Day or Night pins it and the
 * clock stops deciding. Pressing the pinned state again returns to auto, so there is
 * always a way back without clearing site data.
 *
 * The theme itself lives as `data-theme` on <html>; an inline script in the layout
 * sets it before first paint. This component never applies a theme on mount for a
 * viewer in auto — the script already did, and re-applying from an effect is what
 * causes a frame of the wrong ground.
 */

type Mode = Theme | "auto"

function readMode(): Mode {
  try {
    const v = localStorage.getItem("theme")
    return v === "light" || v === "dark" ? v : "auto"
  } catch {
    // Private mode and blocked storage both throw on read.
    return "auto"
  }
}

export default function ThemeClock() {
  // null until mounted so the first client render matches the server output. Reading
  // storage or the clock during render would differ between the two and trip hydration.
  const [mode, setMode] = useState<Mode | null>(null)
  const [now, setNow] = useState<Date | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Tick the displayed time. Aligned to the start of each minute rather than every
  // 60s from mount, so the readout changes when the viewer's clock does.
  useEffect(() => {
    let cancelled = false
    function tick() {
      if (cancelled) return
      const d = new Date()
      setNow(d)
      const msToMinute = 60000 - (d.getSeconds() * 1000 + d.getMilliseconds())
      timer.current = setTimeout(tick, msToMinute + 50)
    }
    tick()
    return () => {
      cancelled = true
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => setMode(readMode()), [])

  // While on auto, flip at the next boundary without needing a reload.
  useEffect(() => {
    if (mode !== "auto") return
    let cancelled = false
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        if (cancelled) return
        apply(themeNow())
        schedule()
      }, msUntilNextSwitch())
    }
    apply(themeNow())
    schedule()
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [mode])

  function apply(t: Theme) {
    const root = document.documentElement
    if (t === "dark") root.setAttribute("data-theme", "dark")
    else root.removeAttribute("data-theme")
  }

  function choose(next: Mode) {
    setMode(next)
    try {
      if (next === "auto") localStorage.removeItem("theme")
      else localStorage.setItem("theme", next)
    } catch {
      // Still applies for this page view; it just will not be remembered.
    }
    apply(next === "auto" ? themeNow() : next)
  }

  // The theme actually showing, which is the clock's choice while on auto.
  const shown: Theme = mode === "auto" || mode === null ? themeNow(now ?? new Date()) : mode
  const auto = mode === "auto"

  // Hold the row's width steady before mount so the nav does not reflow.
  if (mode === null || now === null) {
    return <span aria-hidden="true" className="inline-block w-[108px] h-[34px]" />
  }

  return (
    <div className="flex items-center gap-2.5">
      {/* The clock face. A disc that fills as the day turns: empty at night, full at
          midday, so it reads at a glance without needing the label. */}
      <span
        aria-hidden="true"
        className="relative inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border border-current transition-colors duration-500"
        style={{ color: shown === "dark" ? "var(--brass)" : "var(--oxblood)" }}
      >
        <span
          className="absolute inset-[3px] rounded-full transition-all duration-500"
          style={{
            background: "currentColor",
            clipPath: shown === "dark" ? "inset(0 0 0 50%)" : "inset(0)",
            opacity: shown === "dark" ? 0.55 : 1,
          }}
        />
      </span>

      <button
        type="button"
        onClick={() => choose(auto ? (shown === "dark" ? "light" : "dark") : "auto")}
        // The label says what pressing it does, not what state it is in.
        aria-label={
          auto
            ? `Following your clock, currently ${shown === "dark" ? "night" : "day"}. Press to pin ${shown === "dark" ? "day" : "night"}.`
            : `Pinned to ${mode}. Press to follow your clock again.`
        }
        title={auto ? "Following your clock — press to pin" : "Pinned — press to follow your clock"}
        className="group flex items-baseline gap-2 py-2 font-[family-name:var(--font-typewriter)] text-[13.5px] tracking-[0.18em] uppercase text-[var(--ink)]/55 transition-colors duration-200 hover:text-[var(--oxblood)]"
      >
        <span className="tabular-nums">{formatClock(now)}</span>
        <span
          className={`text-[9.5px] tracking-[0.22em] transition-opacity duration-200 ${
            auto ? "opacity-55" : "opacity-100 text-[var(--oxblood)]"
          }`}
        >
          {auto ? "auto" : shown === "dark" ? "night" : "day"}
        </span>
      </button>
    </div>
  )
}
