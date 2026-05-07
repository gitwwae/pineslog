import { cookies } from "next/headers";
import { messages, type Locale, LOCALES, DEFAULT_LOCALE } from "./messages";

export type { Locale };
export { LOCALES, DEFAULT_LOCALE };

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const c = cookieStore.get("locale")?.value as Locale | undefined;
  return c && (LOCALES as readonly string[]).includes(c) ? (c as Locale) : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale) {
  return messages[locale];
}

export async function getT() {
  const locale = await getLocale();
  return { locale, t: messages[locale] };
}
