import Script from "next/script";

// Use environment variable if available, otherwise use the hardcoded ID
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-Y3JH21CPZJ";

export function GoogleAnalytics() {
  // Don't render if no measurement ID is provided
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* The tiny gtag() stub runs right away, so a click tracked before the
          Google library has loaded (see lib/analytics.ts) is queued in
          dataLayer instead of being lost. Keep this one afterInteractive. */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Don't send local testing to the real property.
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
              window['ga-disable-${GA_MEASUREMENT_ID}'] = true;
            }
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* The heavy Google library waits until the page has finished loading,
          so it never competes with the content people came for. It sends
          everything already queued above as soon as it arrives. */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
