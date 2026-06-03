import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AnnouncementBanner } from "./announcement-banner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
