import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

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
    default: "Mobile Car Detailing in Hickory, NC",
  },
  description:
    "Mobile car detailing in Hickory, NC starting at $70 | We come to you — no drop-off needed | Exterior, interior & full detail. Text to book.",
  metadataBase: new URL("https://www.dadsdetailco.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Mobile Car Detailing in Hickory, NC — We Come to You | Dad's Mobile Detailing Co.",
    description:
      "Mobile car detailing in Hickory, NC starting at $70 | We come to you — no drop-off needed | Exterior, interior & full detail. Text to book.",
    url: "/",
    siteName: "Dad's Mobile Detailing Co.",
    type: "website",
    images: [
      {
        url: "/images/dmd-logo.png",
        alt: "Dad's Mobile Detailing Co. logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mobile Car Detailing in Hickory, NC | We Come to You | Starting At $70 | Dad's Mobile Detailing Co.",
    description:
      "Mobile car detailing in Hickory, NC starting at $70 | We come to you — no drop-off needed | Exterior, interior & full detail. Text to book.",
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
