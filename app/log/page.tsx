import Link from "next/link";
import { getPublishedLogs } from "@/lib/data";
import { getT } from "@/lib/i18n";

export const metadata = { title: "Log" };

export default async function LogIndex() {
  const { locale, t } = await getT();
  const entries = await getPublishedLogs(locale);
  return (
    <div className="container-prose py-12 sm:py-16 max-w-3xl">
      <div className="section-eyebrow mb-3">{t.log.eyebrow}</div>
      <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">{t.log.title}</h1>
      <p className="muted mt-4">{t.log.sub}</p>

      <div className="mt-10 space-y-6">
        {entries.length === 0 && (
          <div className="card p-6 muted">{t.log.empty}</div>
        )}
        {entries.map((e) => (
          <Link key={e.id} href={`/log/${e.slug}`} className="block card card-hover p-6">
            <div className="dim text-xs num mb-2 flex items-center gap-2">
              {e.published_at ? <span>{new Date(e.published_at).toISOString().slice(0, 10)}</span> : <span className="tag tag-trial">draft</span>}
              {e.week_number != null && <span>· {t.log.week(e.week_number)}</span>}
            </div>
            <h2 className="h-serif text-2xl mb-2">{e.title}</h2>
            {e.excerpt && <p className="muted text-sm">{e.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
