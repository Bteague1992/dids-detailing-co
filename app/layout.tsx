import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Dad's Mobile Detailing Co. | %s",
    default: "Mobile Car Detailing in Hickory, NC",
  },
  description:
    "Mobile car detailing in Hickory, NC and surrounding areas. Honest pricing and dad-level care for cars, trucks, and SUVs. Text to book.",
  metadataBase: new URL("https://www.dadsdetailco.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased font-sans`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
