import Link from "next/link";
import { getContent } from "@/lib/content";
import { pageHref } from "@/lib/routes";

export default function NotFound() {
  const { ui } = getContent("en");
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">{ui.notFoundTitle}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">{ui.notFoundBody}</p>
      <Link href={pageHref("en", "home")} className="mt-8 inline-flex rounded-md bg-ink px-6 py-3 font-bold text-white hover:bg-ink-soft">
        {ui.backHome}
      </Link>
    </div>
  );
}
