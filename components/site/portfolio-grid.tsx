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

function Photo({ url, alt, label }: { url: string | null; alt: string; label: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-warm-gray">
      {url && (
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}
      <span className="absolute bottom-2 left-2 rounded-full bg-charcoal/85 px-3 py-1 text-sm font-semibold text-white">
        {label}
      </span>
    </div>
  );
}

/** Before/after cards for real jobs, managed in Sanity. */
export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mx-auto max-w-xl rounded-card bg-white p-8 text-center text-lg shadow-card ring-1 ring-line">
        Photos are on the way. Dad&apos;s been busy cleaning cars instead of
        uploading pictures. Check back soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item._id}
          className="rounded-card bg-white p-3 shadow-card ring-1 ring-line"
        >
          <div className="grid grid-cols-2 gap-2">
            <Photo
              url={sanityImageUrl(item.beforeImage)}
              alt={`${item.title}, before`}
              label="Before"
            />
            <Photo
              url={sanityImageUrl(item.afterImage)}
              alt={`${item.title}, after`}
              label="After"
            />
          </div>
          <div className="px-2 py-3">
            <h3 className="text-lg">{item.title}</h3>
            {item.location && (
              <p className="text-sm font-semibold text-muted-text">
                {item.location}
              </p>
            )}
            {item.description && (
              <p className="mt-1 text-[0.95rem] text-muted-text">
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
