import type { MetadataRoute } from "next";
import { ar } from "@/content/ar";

// Web app manifest: uses the new logo mark and the live host (via metadataBase-relative paths).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ar.ui.brand,
    short_name: ar.ui.brand,
    description: ar.home.seo.description,
    start_url: "/",
    display: "browser",
    lang: "ar",
    dir: "rtl",
    background_color: "#fbf6ec",
    theme_color: "#c4942e",
    icons: [
      { src: "/icon.png", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/media/images/site-icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
