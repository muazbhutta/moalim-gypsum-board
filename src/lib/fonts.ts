import { Tajawal } from "next/font/google";

// Self-hosted at build time by next/font (no request to Google from the visitor's browser).
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-tajawal",
});
