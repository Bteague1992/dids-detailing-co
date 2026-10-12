import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const;

export function Container({
  width = "6xl",
  className,
  children,
}: {
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6", widths[width], className)}>
      {children}
    </div>
  );
}
