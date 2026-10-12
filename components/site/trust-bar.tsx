import Link from "next/link";
import { MapPin, ShieldCheck, Truck, Users } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: Truck, label: "We Come to You" },
  { icon: Users, label: "Family-Owned" },
  // Links to the full promise on the About page.
  { icon: ShieldCheck, label: "The Dad Promise", href: "/about#dad-promise" },
  { icon: MapPin, label: "Local to Connelly Springs" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Why families pick Dad's"
      className="bg-warm-gray py-7 md:py-9"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-line">
          {items.map(({ icon: Icon, label, href }) => {
            const inner = (
              <>
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-9 w-9 text-orange"
                />
                <span className="font-heading text-[0.95rem] font-bold leading-tight">
                  {label}
                </span>
              </>
            );
            const classes = "flex flex-col items-center gap-2 px-3 text-center";
            return (
              <li key={label}>
                {href ? (
                  <Link
                    href={href}
                    className={`${classes} underline decoration-orange decoration-2 underline-offset-4`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={classes}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
