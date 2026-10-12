// Photos used on the site. Every file lives in public/images/site/. To swap a
// photo, replace the file (keep the name) and, if the new one has different
// proportions, update width/height here so the page doesn't shift. Update the
// alt text too if the new photo shows something different.
//
// Keep photos as JPEG (or WebP) at roughly 1500px wide — a few hundred KB,
// not multi-megabyte PNGs.

export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const slot = (
  file: string,
  width: number,
  height: number,
  alt: string,
): SiteImage => ({ src: `/images/site/${file}`, width, height, alt });

export const siteImages = {
  // Combined before/after photos — the "Before" and "After" labels are part
  // of the image itself.
  beforeAfterCarseat: slot(
    "before-and-after-carseat.jpg",
    1536,
    1024,
    "Before and after: a back seat and booster seat covered in snack crumbs, then the same seat clean",
  ),
  beforeAfterDogHair: slot(
    "before-and-after-dog-hair.jpg",
    1536,
    1024,
    "Before and after: a back seat covered in dog hair, then the same seat clean",
  ),
  beforeAfterWorkTruck: slot(
    "before-and-after-work-truck.jpg",
    1536,
    1024,
    "Before and after: a truck floor mat caked in mud, then the same mat clean",
  ),
  pkgExterior: slot("pkg-exterior.jpg", 1448, 1086, "Hand washing a soapy car fender with an orange wash mitt"),
  pkgInterior: slot("pkg-interior.jpg", 1448, 1086, "Brushing and vacuuming a center console cupholder"),
  pkgFullDad: slot("pkg-full-dad.jpg", 1448, 1086, "Wiping down the hood of a clean SUV with an orange towel"),
  pkgFamilyReset: slot("pkg-family-reset.jpg", 1448, 1086, "Extracting a stain from a cloth back seat"),
} as const;
