import Link from "next/link";
import { getPublishedLogs } from "@/lib/data";

export const metadata = { title: "Log" };

export default async function LogIndex() {
  const entries = await getPublishedLogs();
  return (
    <div className="container-prose py-12 sm:py-16 max-w-3xl">
      <div className="section-eyebrow mb-3">Captain&rsquo;s log</div>
      <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">Field notes.</h1>
      <p className="muted mt-4">Weekly write-ups: numbers, decisions, lessons, what&rsquo;s next.</p>

      <div className="mt-10 space-y-6">
        {entries.length === 0 && (
          <div className="card p-6 muted">
            Nessun log pubblicato ancora. La prima entry arriva a fine settimana.
          </div>
        )}
        {entries.map((e) => (
          <Link key={e.id} href={`/log/${e.slug}`} className="block card card-hover p-6">
            <div className="dim text-xs num mb-2">
              {e.published_at ? new Date(e.published_at).toISOString().slice(0, 10) : ""}
              {e.week_number != null && ` · week ${e.week_number}`}
            </div>
            <h2 className="h-serif text-2xl mb-2">{e.title}</h2>
            {e.excerpt && <p className="muted text-sm">{e.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
