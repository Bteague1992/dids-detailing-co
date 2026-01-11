# Dad's Mobile Detailing Co. - Marketing Website

A production-ready marketing website for Dad's Mobile Detailing Co., built with Next.js, TypeScript, TailwindCSS, and shadcn/ui.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **TailwindCSS v4**
- **shadcn/ui** components
- **Lucide React** icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── packages/          # Packages/pricing page
│   ├── service-area/      # Service area pages
│   ├── faq/               # FAQ page
│   ├── gallery/           # Gallery page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Site header, footer, shell
│   ├── marketing/         # Marketing components (hero, packages, etc.)
│   ├── ui/                # Reusable UI components
│   └── seo/               # SEO components (JSON-LD)
├── src/
│   ├── config/            # Centralized configuration
│   │   ├── site.ts        # Site metadata, contact info
│   │   ├── business.ts    # Business info, service areas
│   │   └── services.ts    # Service packages, pricing
│   └── lib/
│       └── cta.ts         # SMS CTA helper function
└── public/                # Static assets
```

## Customization Guide

### Updating Business Information

Edit `src/config/site.ts`:

- Domain
- Title
- Description
- Phone number
- Email
- Business hours
- Social media links

### Updating Pricing

Edit `src/config/services.ts`:

- Package names and descriptions
- Features for each package
- Sedan and SUV/Truck pricing
- Launch offer details

### Adding/Removing Service Cities

Edit `src/config/business.ts`:

- Add or remove cities from the `serviceAreaCities` array
- Each city needs:
  - `slug`: URL-friendly identifier (e.g., "hickory")
  - `name`: Display name (e.g., "Hickory")
  - `description`: Brief description for the city page

### Updating Launch Offer

Edit `src/config/services.ts`:

- Set `launchOffer.active` to `true` or `false`
- Update `launchOffer.title` and `description`
- Set `launchOffer.packageId` to the ID of the package (e.g., "full-detail")
- Update `launchOffer.sedanPrice` and `suvTruckPrice`

### Changing Brand Colors

Edit `app/globals.css`:

- Update CSS variables in the `:root` selector
- `--primary`: Orange (for CTAs and highlights)
- `--secondary`: Navy/Dark Blue (for headers/navigation)

### Changing Typography

Edit `app/layout.tsx`:

- Update the font imports (currently Poppins for headings, Inter for body)
- Adjust font variables in `globals.css`

## Features

- ✅ **Mobile-first responsive design**
- ✅ **Text-only booking** (SMS links, no forms)
- ✅ **SEO optimized** with metadata and JSON-LD structured data
- ✅ **Accessible** with semantic HTML and ARIA labels
- ✅ **Dynamic city pages** for each service area
- ✅ **Centralized configuration** for easy updates
- ✅ **Type-safe** with TypeScript strict mode

## Pages

- **Home** (`/`): Hero, packages overview, how it works, service areas, FAQ preview
- **Packages** (`/packages`): Detailed pricing and package information
- **City Pages** (`/mobile-car-detailing-[citySlug]-nc`): City-specific landing pages
- **FAQ** (`/faq`): Frequently asked questions
- **Gallery** (`/gallery`): Before/after photo gallery (placeholder images)
- **About** (`/about`): Company story and values
- **Contact** (`/contact`): Contact information and booking instructions

## SMS Booking

All "Text to Book" buttons use the `getSmsHref()` helper function from `src/lib/cta.ts`. This generates an `sms:` link that opens the user's SMS app with a prefilled message.

The function accepts optional parameters:

- `packageName`: Name of the package
- `vehicleType`: "sedan" or "suv-truck"
- `city`: City name

## SEO

- Metadata configured for each page
- JSON-LD structured data (LocalBusiness schema) on homepage
- Canonical URLs set for all pages
- Semantic HTML structure
- Proper heading hierarchy

## Accessibility

- Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- Proper heading hierarchy (h1 per page, then h2/h3)
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Screen reader friendly

## Deployment

This site can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting** that supports Next.js

For Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy (Vercel will auto-detect Next.js settings)

## License

Private - All rights reserved.
