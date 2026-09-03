import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  /** Scroll-reveal stagger delay in ms, set by TierGrid based on card index. */
  revealDelayMs?: number;
}

export function TierCard({ tier, city, revealDelayMs = 0 }: TierCardProps) {
  // A range price line (e.g. "$60-$110") is the signal that final pricing
  // varies — currently only the car detailing packages are priced this way.
  const hasPriceRange = tier.priceLines.some((line) => line.value.includes("-"));

  return (
    <div
      className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 flex flex-col justify-between"
      style={{ transitionDelay: `${revealDelayMs}ms` }}
    >
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary to-secondary" />

      <div className="p-6 flex flex-col justify-between grow">
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

          {/* Collapsed by default to keep pages shorter — trying this out per
              request; easy to flip back to always-expanded if it doesn't stick.
              Uses the same Radix accordion primitive as the FAQ sections for a
              real height-animated expand/collapse (native <details> can't
              animate smoothly without relying on very new, spottily-supported
              CSS). */}
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value={`features-${tier.id}`} className="border-none">
              <AccordionTrigger className="py-1 text-sm font-semibold hover:no-underline hover:text-primary">
                What&apos;s included
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                <div className="space-y-2.5">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <div className="border-t-2 border-muted pt-6 mb-6 space-y-2">
            {tier.priceLines.map((line) => (
              <div key={line.label} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{line.label}:</span>
                <span className="text-2xl font-heading font-bold text-secondary">
                  {line.value}
                </span>
              </div>
            ))}
          </div>
          {hasPriceRange && (
            <p className="text-xs text-muted-foreground mb-4 -mt-2">
              Exact pricing depends on vehicle size and condition.
            </p>
          )}
          <Button asChild className="w-full">
            <a
              href={getSmsHref({
                packageName: tier.name,
                categoryLabel: tier.categoryLabel,
                city,
              })}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${tier.name} (${tier.categoryLabel})`}
              data-cta-location="pricing-card"
            >
              Text to Book
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
