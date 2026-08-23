import { Section } from "@/components/ui/section";
import { MessageSquare, Camera, Calendar, Car } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Text Us",
    description:
      "Send us a text with your vehicle type, preferred package, and location.",
  },
  {
    icon: Camera,
    title: "Send Photos (Optional)",
    description:
      "Share photos of your vehicle if you'd like us to see the current condition.",
  },
  {
    icon: Calendar,
    title: "Pick a Time",
    description:
      "We'll coordinate a convenient time that works for your schedule.",
  },
  {
    icon: Car,
    title: "We Come to You",
    description:
      "Our mobile detailer arrives at your location with all equipment and supplies.",
  },
];

export function HowItWorks() {
  return (
    <Section
      variant="default"
      title="How It Works"
      description="Booking a detail is simple and convenient. No forms, no hassle."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="reveal relative text-center p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="absolute top-3 right-4 text-3xl font-heading font-bold text-primary/10">
                {idx + 1}
              </span>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary/20 to-secondary/10 text-primary mb-4 ring-2 ring-primary/20">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
