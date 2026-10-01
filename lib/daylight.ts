/**
 * When it is night where the viewer is.
 *
 * Deliberately not sunrise/sunset maths. That needs a latitude, which means either
 * asking for location permission on a portfolio site or shipping a geo lookup, and
 * both cost more than the result is worth. The viewer's own clock is a good enough
 * proxy and needs no permission, no network, and no library.
 *
 * The boundary hours are the compromise: 07:00 to 19:00 is daylight across most of
 * the inhabited year at Edmonton's latitude without being wrong enough to annoy
 * anyone further south. A viewer who disagrees has the manual switch.
 */

export const DAY_STARTS = 7
export const NIGHT_STARTS = 19

export type Theme = "light" | "dark"

/** Theme the clock alone would pick, for a given moment. */
export function themeForHour(hour: number): Theme {
  return hour >= DAY_STARTS && hour < NIGHT_STARTS ? "light" : "dark"
}

export function themeNow(d: Date = new Date()): Theme {
  return themeForHour(d.getHours())
}

/**
 * Milliseconds until the theme actually changes.
 *
 * Note the evening case lands on tomorrow's DAY_STARTS, not on midnight. Midnight is
 * still night, so waking there would fire a timer that changes nothing and then
 * reschedule — harmless but pointless, and it made the intent of the function read
 * as "next calendar boundary" rather than "next flip".
 */
export function msUntilNextSwitch(d: Date = new Date()): number {
  const next = new Date(d)
  next.setMinutes(0, 0, 0)
  const h = d.getHours()
  if (h < DAY_STARTS) next.setHours(DAY_STARTS)
  else if (h < NIGHT_STARTS) next.setHours(NIGHT_STARTS)
  else next.setHours(24 + DAY_STARTS)
  // A little past the boundary, so a clock that is a second slow does not fire early
  // and then sit on the old value until the next tick.
  return Math.max(1000, next.getTime() - d.getTime() + 1000)
}

/** "9:42 PM" in the viewer's own locale and clock convention. */
export function formatClock(d: Date = new Date()): string {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
}
