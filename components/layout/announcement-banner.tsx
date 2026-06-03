import { getSmsHref } from "@/src/lib/cta";

export function AnnouncementBanner() {
  return (
    <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4">
      <span>Beach season? We get the sand &amp; salt out. </span>
      <a
        href={getSmsHref()}
        className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
      >
        Text to book your summer detail
      </a>
    </div>
  );
}
