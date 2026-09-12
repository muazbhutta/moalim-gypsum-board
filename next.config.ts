import type { NextConfig } from "next";
import { mediaRedirects, pageRedirects } from "./redirects.config";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Next's own trailing-slash redirect would run before the rules below, turning
  // every legacy "/page/" URL into two hops. Handled explicitly instead.
  skipTrailingSlashRedirect: true,

  experimental: {
    // Needed for a single 404 page when the site has two root layouts (Arabic and English).
    globalNotFound: true,
  },

  images: {
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async redirects() {
    return [
      ...[...pageRedirects, ...mediaRedirects].map((r) => ({ ...r, statusCode: 301 as const })),
      // Anything else that arrives with a trailing slash loses it.
      { source: "/:path+/", destination: "/:path+", statusCode: 308 as const },
    ];
  },

  async headers() {
    const longCache = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/media/:path*", headers: longCache },
      { source: "/og/:path*", headers: longCache },
    ];
  },
};

export default nextConfig;
