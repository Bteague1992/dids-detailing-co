import { Section } from "@/components/ui/section";
import { Stars } from "@/components/site/rating-line";
import { business } from "@/config/business";
import { getReviews, type Review } from "@/config/reviews";

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-card ring-1 ring-line">
      <Stars />
      <blockquote className="mt-3 grow">“{review.quote}”</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-muted-text">
        — {review.firstName}
        {review.town ? `, ${review.town}` : ""}
      </figcaption>
    </figure>
  );
}

/**
 * "Don't just take Dad's word for it." Real Google reviews from
 * config/reviews.ts.
 */
export function Reviews({
  tone = "warm",
  count = 3,
}: {
  tone?: "white" | "warm";
  count?: number;
}) {
  const items = getReviews(count);
  if (items.length === 0) return null;

  return (
    <Section tone={tone} title="Don't just take Dad's word for it.">
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map((review) => (
          <li key={review.firstName + review.quote.slice(0, 20)}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
      {business.GOOGLE_REVIEWS_URL && (
        <p className="mt-8 text-center">
          <a
            href={business.GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-orange-dark underline underline-offset-4 hover:text-charcoal"
          >
            Read all our reviews on Google →
          </a>
        </p>
      )}
    </Section>
  );
}
