import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { SiteShell } from "@/components/SiteShell";
import { metadataBase } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase,
  applicationName: "معلم جبس بورد مكة",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#c4942e" };

export default function ARLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="ar">{children}</SiteShell>;
}
