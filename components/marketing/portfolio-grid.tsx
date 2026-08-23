import Image from "next/image";
import { sanityImageUrl, type SanityImageRef } from "@/lib/sanity-image";

export interface PortfolioItem {
  _id: string;
  title: string;
  serviceCategory?: string;
  location?: string;
  description?: string;
  date?: string;
  beforeImage?: SanityImageRef;
  afterImage?: SanityImageRef;
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Our portfolio is coming soon — check back for before/after photos of
        recent details.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, idx) => {
        const beforeUrl = sanityImageUrl(item.beforeImage);
        const afterUrl = sanityImageUrl(item.afterImage);

        return (
          <div
            key={item._id}
            className="reveal border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-lg hover:shadow-primary/10"
            style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
          >
            <div className="grid grid-cols-2">
              <div className="relative aspect-square bg-muted">
                {beforeUrl && (
                  <Image
                    src={beforeUrl}
                    alt={`${item.title} — before`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                  Before
                </span>
              </div>
              <div className="relative aspect-square bg-muted">
                {afterUrl && (
                  <Image
                    src={afterUrl}
                    alt={`${item.title} — after`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  After
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
              {item.location && (
                <p className="text-sm text-muted-foreground">{item.location}</p>
              )}
              {item.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
