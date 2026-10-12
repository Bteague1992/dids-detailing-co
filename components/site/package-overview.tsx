import { ButtonLink } from "@/components/ui/button";
import { MostPopularBadge } from "@/components/site/package-card";
import { SiteImage } from "@/components/site/site-image";
import { formatPrice, getFromPrice, servicesConfig } from "@/config/services";
import { siteImages, type SiteImage as SiteImageData } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const packageImages: Record<string, SiteImageData> = {
  "exterior-refresh": siteImages.pkgExterior,
  "interior-reset": siteImages.pkgInterior,
  "full-dad-treatment": siteImages.pkgFullDad,
  "family-reset": siteImages.pkgFamilyReset,
};

/**
 * Homepage package overview: "from $X" cards. Four columns on desktop;
 * stacked cards on phones (thumbnail beside name and price, description below).
 */
export function PackageOverview() {
  return (
    <>
      <ul className="grid gap-4 lg:grid-cols-4 lg:gap-5">
        {servicesConfig.packages.map((pkg) => {
          const image = packageImages[pkg.id];
          return (
            <li
              key={pkg.id}
              className={cn(
                // Phones: thumbnail beside name + price, description full width
                // underneath. Desktop: a centered column.
                "relative grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 rounded-card bg-white p-4 shadow-card lg:flex lg:flex-col lg:items-stretch lg:gap-y-1 lg:text-center",
                pkg.mostPopular ? "ring-2 ring-orange" : "ring-1 ring-line",
              )}
            >
              {pkg.mostPopular && (
                <MostPopularBadge className="absolute -top-3.5 left-4 lg:left-1/2 lg:-translate-x-1/2" />
              )}
              {image && (
                <SiteImage
                  image={image}
                  alt=""
                  sizes="(min-width: 1024px) 250px, 80px"
                  className="row-span-2 aspect-square rounded-xl lg:mb-2 lg:aspect-[4/3]"
                />
              )}
              <h3 className="self-end text-lg leading-tight lg:self-auto">{pkg.name}</h3>
              <p className="self-start font-heading font-extrabold text-orange-strong lg:self-auto">
                <span className="text-base font-bold text-orange-dark">
                  from{" "}
                </span>
                <span className="text-2xl lg:text-[1.75rem]">
                  {formatPrice(getFromPrice(pkg.prices))}
                </span>
              </p>
              <p className="col-span-2 mt-2 text-[0.95rem] leading-snug text-muted-text lg:mt-0">
                {pkg.description}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 text-center">
        <ButtonLink href="/packages">See all packages</ButtonLink>
      </div>
    </>
  );
}
