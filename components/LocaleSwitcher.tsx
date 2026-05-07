"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/messages";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  function setLocale(loc: Locale) {
    if (loc === current) return;
    document.cookie = `locale=${loc}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-forest/15 bg-paper p-0.5 text-[11px] font-semibold num">
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={current === "en"}
        className={
          "px-2 py-1 rounded-full transition " +
          (current === "en" ? "bg-forest text-cream" : "text-ink-dim hover:text-forest")
        }
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("it")}
        aria-pressed={current === "it"}
        className={
          "px-2 py-1 rounded-full transition " +
          (current === "it" ? "bg-forest text-cream" : "text-ink-dim hover:text-forest")
        }
      >
        IT
      </button>
    </div>
  );
}
