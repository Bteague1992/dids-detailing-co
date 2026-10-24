# SEO URL map

The site has **21 indexable pages**: the 20 from the October 2026 consolidation, plus the booking page at `/book` (Square Appointments) added afterwards. Everything else that was ever live redirects permanently to one of them. The redirects live in `redirects()` in `next.config.ts` and must never be removed.

## The pages

The list, with each page's last-modified date for the sitemap, is in `config/pages.ts`.

| Page | URL |
|---|---|
| Home | `/` |
| Packages & pricing | `/packages` |
| Car, truck & SUV detailing | `/car-detailing` |
| Motorcycle detailing | `/motorcycle-detailing` |
| RV & camper detailing | `/rv-detailing` |
| Dad's Club | `/dads-club` |
| Services hub | `/services` |
| Service areas hub | `/service-areas` |
| Portfolio | `/portfolio` |
| About, FAQ, Contact | `/about`, `/faq`, `/contact` |
| Booking page (Square) | `/book` |
| City pages (8) | `/mobile-car-detailing/[city]/nc` |

Towns: hickory, morganton, lenoir, valdese, conover, newton, granite-falls, long-view.

Each city page covers every service in that town: car detailing as the main focus, plus a short section each for motorcycles, RVs and Dad's Club that links to the main page for that service.

## October 2026 consolidation (53 pages → 20)

Most of the old pages were near-duplicate city × service pages that Google was partly ignoring. They were merged into the pages above and redirected.

| Old URL | Now redirects to |
|---|---|
| `/gallery` | `/portfolio` |
| `/services/camper-rv-detailing` | `/rv-detailing` |
| `/services/maintenance-plans` | `/dads-club` |
| `/service-areas/[city]` | `/mobile-car-detailing/[city]/nc` |
| `/service-areas/[city]/maintenance-plans` | `/mobile-car-detailing/[city]/nc` |
| `/service-areas/[city]/camper-rv-detailing` | `/rv-detailing` |
| `/mobile-motorcycle-detailing/[city]/nc` | `/motorcycle-detailing` |

Where the unique content went:

- Each town's motorcycle, RV, Dad's Club and service-area paragraphs now sit on that town's city page (`lib/city-content.ts`).
- The gallery's three before/after cards are on `/portfolio`.

## Older redirects (still required)

| Old URL | Redirects to |
|---|---|
| `/mobile-car-detailing-[city]-nc` | `/mobile-car-detailing/[city]/nc` |
| `/mobile-motorcycle-detailing-[city]-nc` | `/motorcycle-detailing` |
| `/services/car-detailing` | `/car-detailing` |
| `/services/motorcycle-detailing` | `/motorcycle-detailing` |
| `/service-areas/[city]/car-detailing` | `/mobile-car-detailing/[city]/nc` |
| `/service-areas/[city]/motorcycle-detailing` | `/motorcycle-detailing` |

## Rules

- Every redirect is permanent (308) and goes to its final URL in one hop, with or without a trailing slash on the old URL.
- Redirects only match the eight real towns. Unknown URLs return a real 404; there is no catch-all to the homepage.
- Next's built-in trailing-slash redirect is switched off (`skipTrailingSlashRedirect`) and re-added as the last rule in `redirects()`, so `/old-url/` doesn't take two hops. Keep that rule last.
- The sitemap lists only the 20 pages. `lastModified` is a hand-maintained date per page in `config/pages.ts`, never the build time.
- Every page has a self-referencing canonical on `https://www.dadsdetailco.com`, with no trailing slash.
- Don't add a page without adding it to `config/pages.ts`, and don't remove one without adding its redirect first.
