import { posterSources, paletteSources } from "@/lib/lab-sources"

/**
 * The lab tools are still self-contained HTML files in public/, so they cannot
 * import TypeScript. This serves them the same catalogue the app uses, which keeps
 * one source of truth instead of a generated file that has to be remembered.
 *
 * Static: nothing here reads a request, so it is prerendered at build time and
 * refreshes whenever the portfolio data changes.
 */
export const dynamic = "force-static"

export function GET() {
  return Response.json({
    poster: posterSources(),
    palette: paletteSources(),
  })
}
