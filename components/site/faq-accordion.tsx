import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional anchor id on the item. */
  id?: string;
}

/** Accessible accordion built on native <details> — keyboard and screen
 * reader support come for free, with no JavaScript. */
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          id={faq.id}
          className="group rounded-card bg-white shadow-card ring-1 ring-line"
        >
          <summary className="flex items-center justify-between gap-4 rounded-card px-5 py-4 font-heading text-lg font-bold">
            {faq.question}
            <ChevronDown
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-orange-dark transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="px-5 pb-5 text-muted-text">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
