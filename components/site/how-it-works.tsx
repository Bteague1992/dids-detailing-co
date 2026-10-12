import { Section } from "@/components/ui/section";

const steps = [
  { title: "Book online or text Dad", text: "Pick a time that works for you." },
  { title: "Dad shows up", text: "At your home or work, right on time." },
  { title: "Come back to a clean car", text: "That's it. Go enjoy it." },
];

export function HowItWorks({ tone = "white" }: { tone?: "white" | "warm" }) {
  return (
    <Section tone={tone} title="Clean car. Zero hassle." width="5xl">
      <ol className="grid gap-5 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-strong font-heading text-xl font-extrabold text-white"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg">{step.title}</h3>
              <p className="text-muted-text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
