# SEO Location Landing Pages - Quick Reference

## ✅ Implementation Complete

SEO-oriented location landing pages have been created at:
- `/mobile-car-detailing-[citySlug]-nc`

Example URLs:
- `/mobile-car-detailing-hickory-nc`
- `/mobile-car-detailing-newton-nc`
- `/mobile-car-detailing-conover-nc`
- ... (all cities from config)

## 📝 How to Edit the Intro Copy Template

**File**: `src/lib/seo-content.ts`

**Function**: `generateCitySeoIntro()`

**Current template**:
```typescript
export function generateCitySeoIntro(city: ServiceCity): string {
  return `Looking for professional mobile car detailing in ${city.name}, NC? ${city.description} We provide convenient mobile auto detailing services for cars, trucks, and SUVs throughout ${city.name}. Our mobile service means we come to your home or workplace - no need to leave your location. Simply text us to book your detail today.`;
}
```

**Available variables**:
- `city.name` - City name (e.g., "Hickory")
- `city.slug` - URL slug (e.g., "hickory")
- `city.description` - Description from config

**To customize**: Edit the return string in `generateCitySeoIntro()` function.

## 🏙️ How to Add New Cities

**File**: `src/config/business.ts`

**Location**: `serviceAreaCities` array

**Steps**:
1. Add a new city object to the array:
```typescript
{
  slug: "new-city",           // lowercase, hyphens only
  name: "New City",           // display name
  description: "Brief description of service in this city.",
}
```

2. Save the file
3. Rebuild: `npm run build`

**Automatic creation**:
- ✅ `/service-area/new-city` page
- ✅ `/mobile-car-detailing-new-city-nc` SEO page
- ✅ Added to sitemap
- ✅ Footer links (if within first 4-6 cities)

**Example**:
```typescript
serviceAreaCities: [
  // ... existing cities
  {
    slug: "maiden",
    name: "Maiden",
    description: "Professional mobile car detailing in Maiden. Quality service at your location.",
  },
]
```

## 🔄 How to Toggle Between Rendering vs Redirecting SEO Pages

### Current Behavior
SEO pages render full content (default).

### Option 1: Redirect to Human-Friendly Page

**File**: `app/mobile-car-detailing-[citySlug]-nc/page.tsx`

Replace the entire `CitySeoPage` component with:

```typescript
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { businessConfig } from "@/src/config/business";

export async function generateStaticParams() {
  return businessConfig.serviceAreaCities.map((city) => ({
    citySlug: city.slug,
  }));
}

export default async function CitySeoPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = businessConfig.serviceAreaCities.find(
    (c) => c.slug === citySlug
  );

  if (!city) {
    notFound();
  }

  redirect(`/service-area/${citySlug}`);
}
```

### Option 2: Environment Variable Toggle

1. **Add to `src/config/site.ts`**:
```typescript
export const siteConfig = {
  // ... existing config
  seoPagesEnabled: process.env.NEXT_PUBLIC_SEO_PAGES_ENABLED !== "false",
} as const;
```

2. **Update `app/mobile-car-detailing-[citySlug]-nc/page.tsx`**:
Add at the start of the component:
```typescript
if (!siteConfig.seoPagesEnabled) {
  redirect(`/service-area/${citySlug}`);
}
```

3. **Set environment variable**:
   - Enable (default): `NEXT_PUBLIC_SEO_PAGES_ENABLED=true` or omit
   - Disable: `NEXT_PUBLIC_SEO_PAGES_ENABLED=false`

### Option 3: Simple Config Flag

1. **Add to `src/config/site.ts`**:
```typescript
export const siteConfig = {
  // ... existing config
  redirectSeoPages: false, // Set to true to redirect
} as const;
```

2. **Update page component** to check this flag before rendering.

## 📊 Features Implemented

✅ **Static generation** - All cities from config  
✅ **Component reuse** - Same components as `/service-area/[citySlug]` pages  
✅ **SEO content** - Unique intro text per city  
✅ **Metadata** - Title, description (140-160 chars), canonical URLs  
✅ **Internal linking** - Links to `/service-area/[citySlug]`, `/packages`, `/service-area`  
✅ **Sitemap** - Auto-included in `app/sitemap.ts`  
✅ **Footer links** - First 4 cities shown in footer  
✅ **Service area links** - Linked from `/service-area` page  
✅ **TypeScript strict** - All types validated  
✅ **No nav links** - Not in main navigation (SEO pages only)

## 🔍 Verification

**Check build output**:
```bash
npm run build
```

Look for:
```
├ ○ /mobile-car-detailing-[citySlug]-nc
└ ○ /sitemap.xml
```

**Test a page**:
- Visit: `http://localhost:3000/mobile-car-detailing-hickory-nc`
- Verify: H1, intro text, packages, CTAs, internal links

**Check sitemap**:
- Visit: `http://localhost:3000/sitemap.xml`
- Verify: All SEO pages listed with priority 0.9

## 📚 Full Documentation

See `SEO_PAGES_GUIDE.md` for comprehensive documentation including:
- Detailed customization options
- Best practices
- Troubleshooting
- Architecture overview
