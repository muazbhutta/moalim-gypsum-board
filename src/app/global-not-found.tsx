import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { images } from "@/content/media";
import { tajawal } from "@/lib/fonts";

// 404 for URLs that match no route. Bilingual because it sits outside both language layouts.
export const metadata: Metadata = {
  title: "الصفحة غير موجودة | Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="grid min-h-dvh place-items-center bg-gold-50 px-4">
        <main className="max-w-lg text-center">
          <Image src={images.logo.src} alt="معلم جبس بورد مكة" width={108} height={96} className="mx-auto h-24 w-auto" />
          <h1 className="mt-6 text-3xl font-bold text-ink">الصفحة غير موجودة</h1>
          <p className="mt-3 text-lg text-ink-soft">عذرًا، لم نجد الصفحة التي تبحث عنها.</p>
          <p lang="en" dir="ltr" className="mt-2 text-ink-soft">
            Sorry, we couldn&apos;t find that page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-md bg-ink px-6 py-3 font-bold text-white hover:bg-ink-soft">
              العودة إلى الرئيسية
            </Link>
            <Link href="/en" lang="en" className="rounded-md border-2 border-ink px-6 py-3 font-bold text-ink hover:bg-ink hover:text-white">
              English home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
