import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CtaClickTracker } from "@/components/analytics/cta-click-tracker";
import { startingCarPrice } from "@/config/services";

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
    template: "%s | Dad's Mobile Detailing Co.",
    default: `Mobile Car Detailing in Hickory, NC — Starting at $${startingCarPrice}`,
  },
  description: `Mobile car detailing in Hickory, NC starting at $${startingCarPrice}. We come to you — no drop-off needed. Cars, trucks, SUVs & motorcycles. Text to book.`,
  metadataBase: new URL("https://www.dadsdetailco.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Mobile Car Detailing in Hickory, NC — We Come to You | Dad's Mobile Detailing Co.",
    description: `Mobile car detailing in Hickory, NC starting at $${startingCarPrice} | We come to you — no drop-off needed | Exterior, interior & full detail. Text to book.`,
    url: "/",
    siteName: "Dad's Mobile Detailing Co.",
    type: "website",
    images: [
      {
        url: "/images/dmd-logo.png",
        width: 512,
        height: 512,
        alt: "Dad's Mobile Detailing Co. logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Mobile Car Detailing in Hickory, NC | We Come to You | Starting At $${startingCarPrice} | Dad's Mobile Detailing Co.`,
    description: `Mobile car detailing in Hickory, NC starting at $${startingCarPrice} | We come to you — no drop-off needed | Exterior, interior & full detail. Text to book.`,
    images: ["/images/dmd-logo.png"],
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
        <GoogleAnalytics />
        <CtaClickTracker />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
