import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import type { NormalizedTier } from "@/lib/service-tiers";
import { Check } from "lucide-react";

const frequencyLabels: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
};

interface TierCardProps {
  tier: NormalizedTier;
  city?: string;
}

export function TierCard({ tier, city }: TierCardProps) {
  return (
    <div className="border-2 border-border/60 rounded-xl p-6 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <h3 className="text-2xl font-heading font-bold">{tier.name}</h3>
          {tier.frequency && (
            <Badge variant="secondary" className="mt-1 shrink-0">
              {frequencyLabels[tier.frequency] ?? tier.frequency}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mb-6">{tier.description}</p>

        <div className="mb-6 space-y-2">
          {tier.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="border-t-2 border-muted pt-6 mb-6 space-y-2">
          {tier.priceLines.map((line) => (
            <div key={line.label} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{line.label}:</span>
              <span className="text-2xl font-heading font-bold">{line.value}</span>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <a
            href={getSmsHref({ packageName: tier.name, city })}
            aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${tier.name}`}
            data-cta-location="pricing-card"
          >
            Text to Book
          </a>
        </Button>
      </div>
    </div>
  );
}
