# SEO URL Map

Documents how the new `/services` and `/service-areas` page structure was
reconciled with pre-existing, indexed URLs, so search ranking signal isn't
split across near-duplicate pages. See `config/service-categories.ts`
(`legacyPage` field + `getLegacyServicePath` / `getLegacyServiceAreaPath` /
`getServiceCategoryHref` / `getServiceAreaCategoryHref` helpers) and the
`redirects()` block in `next.config.ts` for the implementation.

## Decision summary

| Old URL | New equivalent | Decision | Why |
|---|---|---|---|
| `/car-detailing` | `/services/car-detailing` | **Keep old, redirect new** (308) | Already indexed/ranked; new page would be a near-duplicate category overview. |
| `/motorcycle-detailing` | `/services/motorcycle-detailing` | **Keep old, redirect new** (308) | Same reasoning. |
| `/mobile-car-detailing/[city]/nc` (8 cities) | `/service-areas/[city]/car-detailing` | **Keep old, redirect new** (308) | Already indexed per-city (e.g. Morganton has 400+ Search Console impressions). New combined page would duplicate it exactly. |
| `/mobile-motorcycle-detailing/[city]/nc` (8 cities) | `/service-areas/[city]/motorcycle-detailing` | **Keep old, redirect new** (308) | Same reasoning. |
| `/packages` | — | **Keep old, no new equivalent generated** | Still the single full-pricing reference page (all vehicle types + maintenance plans); nothing in the new structure replaces it. |
| *(none — new categories)* | `/services/rinsless-wash`, `/services/camper-rv-detailing`, `/services/maintenance-plans` | **New pages, generated & sitemapped** | No legacy equivalent exists; net-new coverage. |
| *(none — new categories × 8 cities = 24 pages)* | `/service-areas/[city]/rinsless-wash`, `/service-areas/[city]/camper-rv-detailing`, `/service-areas/[city]/maintenance-plans` | **New pages, generated & sitemapped** | Same — no legacy equivalent, no cannibalization risk. |
| *(none)* | `/service-areas/[city]` (city hub, 8 pages) | **New page, generated & sitemapped** | No old generic per-city hub existed; links out to the legacy car/moto pages plus the new RV/rinsless/maintenance pages for that city. |
| *(none)* | `/services` (category index) | **New page, generated & sitemapped** | No old equivalent; links to the legacy car/moto pages plus the new category pages. |

## How the redirect-vs-keep logic is enforced in code

- `config/service-categories.ts` marks `car-detailing` and `motorcycle-detailing`
  with `legacyPage: true`.
- `app/services/[serviceSlug]/page.tsx` and
  `app/service-areas/[citySlug]/[serviceSlug]/page.tsx` only call
  `generateStaticParams()` for non-legacy categories (via
  `getGeneratedServiceCategories()`), so `/services/car-detailing`,
  `/services/motorcycle-detailing`, and the car/moto combinations under
  `/service-areas/[city]/` are never built as pages.
- `next.config.ts` `redirects()` sends those exact paths (308, permanent) to
  their legacy equivalents.
- `app/sitemap.ts` only lists the legacy URLs and the non-legacy new pages —
  never a redirected-away URL.
- Internal links use `getServiceCategoryHref()` / `getServiceAreaCategoryHref()`
  (in `config/service-categories.ts`) rather than hardcoding `/services/...` or
  `/service-areas/.../...`, so every link sitewide (services index, service
  area hub pages, and the service category page's own city grid) automatically
  points at the legacy page for car/motorcycle detailing and the new page for
  everything else — no link anywhere points at a redirected URL.

## Canonical tags

Every generated page (legacy and new) sets its own self-canonical via
`createPageMetadata({ canonical: ... })`, matching its sitemap entry exactly.
Redirected paths (`/services/car-detailing`, etc.) never render, so they never
emit a canonical tag or metadata of their own — there's no loop risk since a
redirect target is never itself redirected elsewhere.

Separately, the homepage (`/`) and `/mobile-car-detailing/hickory/nc` were
differentiated by title/meta description (not canonicalized to each other) to
fix homepage/Hickory-page keyword cannibalization — see the code comments in
`app/page.tsx` and `app/mobile-car-detailing/[...slug]/page.tsx` for that
separate decision.
