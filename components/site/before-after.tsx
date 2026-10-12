import { Section } from "@/components/ui/section";
import { SiteImage } from "@/components/site/site-image";
import { siteImages, type SiteImage as SiteImageData } from "@/lib/site-images";

// Each card uses one combined photo with the "Before" and "After" labels
// already in the image.
const cards: { title: string; image: SiteImageData }[] = [
  { title: "The snack-bar backseat", image: siteImages.beforeAfterCarseat },
  { title: "The dog-hair situation", image: siteImages.beforeAfterDogHair },
  { title: "The work truck", image: siteImages.beforeAfterWorkTruck },
];

/** "Sound familiar?" — three before/after cards. */
export function BeforeAfter({
  tone = "white",
  title = "Sound familiar?",
  subtitle = "No judgment here. We've seen it all, and we can fix it.",
}: {
  tone?: "white" | "warm";
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section tone={tone} title={title} subtitle={subtitle}>
      <ul className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.title}
            className="rounded-card bg-white p-3 shadow-card ring-1 ring-line"
          >
            <SiteImage
              image={card.image}
              sizes="(min-width: 768px) 360px, 100vw"
              className="rounded-xl"
            />
            <h3 className="py-3 text-center text-lg">{card.title}</h3>
          </li>
        ))}
      </ul>
    </Section>
  );
}
