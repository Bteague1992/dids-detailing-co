import type { Metadata, Viewport } from "next";
import { primaryTowns } from "@/config/business";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/site-shell";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CtaClickTracker } from "@/components/analytics/cta-click-tracker";
import { siteConfig } from "@/config/site";
import { SHARE_IMAGE } from "@/lib/metadata";

// next/font self-hosts both families and reserves their metrics up front, so
// there is no layout shift when they load.
const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = `${siteConfig.title} | Mobile Detailing in ${primaryTowns}, NC`;

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: defaultTitle,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
    ],
  },
  openGraph: {
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.title,
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#2B2B2B",
  // Lets the sticky mobile bar read the phone's safe-area insets.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <GoogleAnalytics />
        <CtaClickTracker />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
