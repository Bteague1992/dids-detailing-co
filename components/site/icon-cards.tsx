import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconCardItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

/** Simple white cards: orange line icon, heading, a sentence or two. */
export function IconCards({
  items,
  columns = 3,
}: {
  items: IconCardItem[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "grid gap-5",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="rounded-card bg-white p-6 shadow-card ring-1 ring-line"
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-9 w-9 text-orange"
          />
          <h3 className="mt-3 text-xl">{title}</h3>
          <p className="mt-1 text-muted-text">{text}</p>
        </li>
      ))}
    </ul>
  );
}

export interface LinkCardItem extends IconCardItem {
  /** e.g. "From $85" */
  price: string;
  href: string;
}

/**
 * A whole-card link: icon, heading, a line of text, a price, and a
 * "See details" style label. Used on /services and the /packages teasers.
 */
export function LinkCard({
  item,
  linkLabel = "See details",
  linkClassName = "mt-2",
}: {
  item: LinkCardItem;
  linkLabel?: string;
  /** Spacing above the link label. */
  linkClassName?: string;
}) {
  const { icon: Icon, title, text, price, href } = item;
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-card bg-white p-6 shadow-card ring-1 ring-line hover:ring-2 hover:ring-orange"
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className="h-10 w-10 text-orange"
      />
      <h3 className="mt-3 text-xl">{title}</h3>
      <p className="mt-1 grow text-muted-text">{text}</p>
      <p className="mt-3 font-heading text-xl font-extrabold text-orange-strong">
        {price}
      </p>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-semibold underline decoration-orange decoration-2 underline-offset-4",
          linkClassName,
        )}
      >
        {linkLabel}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </span>
    </Link>
  );
}
