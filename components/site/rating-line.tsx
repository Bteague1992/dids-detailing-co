import { Star } from "lucide-react";
import { business } from "@/config/business";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="inline-block h-5 w-5 fill-orange text-orange"
        />
      ))}
    </span>
  );
}

/** Five stars + "5.0 · 15 Google reviews · Family-owned & local", from config. */
export function RatingLine() {
  const text = `${business.GOOGLE_RATING} · ${business.GOOGLE_REVIEW_COUNT} Google reviews · Family-owned & local`;
  const content = (
    <>
      <Stars className="shrink-0" />
      <span className="text-sm font-medium">{text}</span>
    </>
  );
  const classes = "inline-flex flex-wrap items-center gap-x-3 gap-y-1";
  // Links to Google once GOOGLE_REVIEWS_URL is set in config/business.ts.
  return business.GOOGLE_REVIEWS_URL ? (
    <a
      href={business.GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} underline-offset-4 hover:underline`}
    >
      {content}
    </a>
  ) : (
    <p className={classes}>{content}</p>
  );
}
