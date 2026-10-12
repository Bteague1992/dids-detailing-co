import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage as SiteImageData } from "@/lib/site-images";

/** A photo slot from lib/site-images.ts, rounded, lazy-loaded unless priority. */
export function SiteImage({
  image,
  sizes,
  priority = false,
  className,
  alt,
}: {
  image: SiteImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Override the slot's alt text (pass "" for decorative use). */
  alt?: string;
}) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-auto w-full rounded-2xl object-cover", className)}
    />
  );
}
