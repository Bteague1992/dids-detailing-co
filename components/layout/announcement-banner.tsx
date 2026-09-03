import { getSmsHref } from "@/lib/cta";

export function AnnouncementBanner() {
  return (
    <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4">
      <span>Leaves and pollen season is here — keep your ride clean. </span>
      <a
        href={getSmsHref()}
        className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
        data-cta-location="announcement-banner"
      >
        Text to book your fall detail
      </a>
    </div>
  );
}
