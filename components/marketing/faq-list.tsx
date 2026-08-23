"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs: FAQ[];
}

export function FAQList({ faqs }: FAQListProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="reveal border border-l-4 border-border/60 border-l-border/60 rounded-lg px-4 bg-card shadow-sm hover:shadow-md data-[state=open]:border-l-primary data-[state=open]:shadow-md"
          style={{ transitionDelay: `${(idx % 6) * 60}ms` }}
        >
          <AccordionTrigger className="text-left font-semibold hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pt-2 pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
