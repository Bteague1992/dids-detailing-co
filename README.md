# Dad's Mobile Detailing Co. website

Marketing site for Dad's Mobile Detailing Co. (dadsdetailco.com). Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where to change things

| To change… | Edit |
|---|---|
| Phone, email, hours, booking link, Google reviews link, rating and review count, the Dad Promise wording, travel note | `config/business.ts` |
| Any price, package, add-on, Dad's Club plan, or pricing policy | `config/services.ts` (the only place prices live) |
| Reviews shown on the site | `config/reviews.ts` (real Google reviews, word for word) |
| Town list and each town's short blurb | `config/business.ts` (sentences that list the towns are built from it) |
| Each town's longer page copy and the shared FAQs | `lib/city-content.ts` |
| Photos | Replace files in `public/images/site/` (keep the names). Photos and alt text are listed in `lib/site-images.ts`. Use JPEG or WebP around 1500px wide, not multi-megabyte PNGs |
| Colors, fonts, radii, shadows | Design tokens at the top of `app/globals.css` |

### Booking link

Every "Book Now" / "Book" button (header, heroes, closing call to action, phone sticky bar, and the car and motorcycle package cards) uses `BOOKING_URL` in `config/business.ts`. It points at `/book`, which shows the Square Appointments booking widget. The Square links live in `SQUARE` in the same file, and the payment and cancellation wording shown on `/book` and the packages page is in `BOOKING_TERMS`. Set `SHOW_BOOKING` to `false` to hide every Book button (package cards then fall back to "Text to Book").

RV package cards say "Text for a Quote" (RVs are priced per foot), and Dad's Club buttons say "Text to Join". Both open a prefilled text.

### Logo and icons

Original logo files live in `branding/` (outside `public/`, so they are never served) and are never edited. Optimized copies, the favicon and app icons, and the social share image are generated from them:

```bash
node scripts/generate-brand-assets.mjs
```

The font for the share image tagline is in `scripts/fonts/`.

## Structure

```
app/                  Pages (routes). URLs must not change — see SEO-URL-MAP.md
components/site/      Design-system components (Header, Footer, PageHero, PackageCard,
                      SizeToggle, AddOnGrid, BeforeAfter, Reviews, TrustBar, HowItWorks,
                      FinalCta, FaqAccordion, StickyMobileBar, …)
components/pages/     Page bodies for /motorcycle-detailing, /rv-detailing, /dads-club
components/ui/        Button, Section, Container
components/seo/       JSON-LD (LocalBusiness, FAQPage)
config/               Business details, pricing, reviews, towns
lib/                  CTA links, metadata helper, town copy, photo slots
```

## Things to keep

- Every page gets the header, closing call to action, footer, and phone-only Book / Text / Call bar from `components/site/site-shell.tsx`.
- Alternate `tone="white"` and `tone="warm"` sections down each page.
- White text only goes on `--orange-strong` at 19px bold or larger, or on `--orange-dark`. The plain brand orange is for icons and accents.
- JSON-LD stays minimal: name, phone, area served, hours. No rating or review markup.
- Voice: laid-back and plain. Never "showroom", "luxury", "elevate", "premium experience", or "Basic".
