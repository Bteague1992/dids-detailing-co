import { Container } from "@/components/ui/container";

interface GalleryImage {
  id: string;
  title: string;
  beforeAfter?: "before" | "after";
}

// Placeholder images - user will replace these
const placeholderImages: GalleryImage[] = [
  { id: "1", title: "Full Detail - Before", beforeAfter: "before" },
  { id: "2", title: "Full Detail - After", beforeAfter: "after" },
  { id: "3", title: "Interior Detail - Before", beforeAfter: "before" },
  { id: "4", title: "Interior Detail - After", beforeAfter: "after" },
  { id: "5", title: "Exterior Wash - Before", beforeAfter: "before" },
  { id: "6", title: "Exterior Wash - After", beforeAfter: "after" },
];

export function GalleryGrid() {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border-2 border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground">
                    <p className="font-medium">{image.title}</p>
                    <p className="text-sm mt-2">Placeholder Image</p>
                  </div>
                </div>
              </div>
            </div>
            {image.beforeAfter && (
              <div className="absolute top-2 right-2">
                <span className="bg-background/90 px-2 py-1 rounded text-xs font-medium">
                  {image.beforeAfter === "before" ? "Before" : "After"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
