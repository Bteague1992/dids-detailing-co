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
              className="text-center p-6 rounded-xl bg-card border-2 border-border/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 text-primary mb-4 ring-2 ring-primary/20">
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
