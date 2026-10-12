import Image from "next/image";
import { cn } from "@/lib/utils";

// Optimized copies of the originals in public/images/branding (see
// scripts/generate-brand-assets.mjs). Never stretch, recolor, or crop these.
const files = {
  /** Dark "Dad's" lettering — light backgrounds only. */
  dark: { src: "/images/brand/logo-dark.png", width: 672, height: 224 },
  /** White "Dad's" lettering — dark backgrounds only. */
  light: { src: "/images/brand/logo-light.png", width: 672, height: 224 },
  shield: { src: "/images/brand/shield.png", width: 800, height: 800 },
  avatar: { src: "/images/brand/avatar.png", width: 512, height: 512 },
} as const;

export function Logo({
  variant,
  className,
  decorative = false,
  priority = false,
  sizes,
}: {
  variant: keyof typeof files;
  className?: string;
  /** Repeat uses on a page get an empty alt. */
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const file = files[variant];
  return (
    <Image
      src={file.src}
      width={file.width}
      height={file.height}
      alt={decorative ? "" : "Dad's Mobile Detailing Co."}
      priority={priority}
      sizes={sizes}
      className={cn("w-auto", className)}
    />
  );
}
