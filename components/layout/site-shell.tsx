import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AnnouncementBanner } from "./announcement-banner";
import { LeadCaptureModal } from "@/components/marketing/lead-capture-modal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LeadCaptureModal />
    </div>
  );
}
