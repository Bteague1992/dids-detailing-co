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
          className="border-2 border-border/60 rounded-lg px-4 bg-card shadow-sm hover:shadow-md transition-shadow"
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
