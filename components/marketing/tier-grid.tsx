import { TierCard } from "@/components/marketing/tier-card";
import type { TierGroup } from "@/lib/service-tiers";

interface TierGridProps {
  groups: TierGroup[];
  city?: string;
}

export function TierGrid({ groups, city }: TierGridProps) {
  return (
    <div className="space-y-16">
      {groups.map((group, idx) => (
        <div key={group.groupLabel ?? idx}>
          {group.groupLabel && (
            <h3 className="text-2xl font-heading font-bold mb-6 text-center">
              {group.groupLabel}
            </h3>
          )}
          {/* items-start: without it, CSS Grid stretches every card in a row
              to match the tallest sibling — so expanding one card's "What's
              included" accordion would visually stretch the other cards in
              that row too, even though only one card's content actually
              grew. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {group.tiers.map((tier, tierIdx) => (
              <TierCard
                key={tier.id}
                tier={tier}
                city={city}
                revealDelayMs={(tierIdx % 3) * 100}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
