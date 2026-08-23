import Link from "next/link";
import { TierGrid } from "@/components/marketing/tier-grid";
import { getCategoryTierGroups } from "@/lib/service-tiers";
import { serviceCategories } from "@/config/service-categories";

const carCategory = serviceCategories.find((c) => c.slug === "car-detailing")!;
const motoCategory = serviceCategories.find(
  (c) => c.slug === "motorcycle-detailing",
)!;

export function PackagesGrid() {
  const carGroups = getCategoryTierGroups(carCategory);
  const motoGroups = getCategoryTierGroups(motoCategory);

  return (
    <>
      <TierGrid groups={carGroups} />

      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">
            Motorcycle Detailing
          </h2>
          <p className="text-muted-foreground">
            Professional mobile detailing for your bike — we come to you.{" "}
            <Link
              href="/motorcycle-detailing"
              className="text-primary hover:underline"
            >
              See all service cities →
            </Link>
          </p>
        </div>
        <TierGrid groups={motoGroups} />
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Also available: Camper &amp; RV detailing and recurring maintenance
          plans.{" "}
          <Link href="/packages" className="text-primary hover:underline">
            View full pricing →
          </Link>
        </p>
      </div>
    </>
  );
}
