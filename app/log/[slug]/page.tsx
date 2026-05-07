import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getLogBySlug } from "@/lib/data";
import { getT } from "@/lib/i18n";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { locale } = await getT();
  const entry = await getLogBySlug(slug, locale);
  if (!entry) return { title: "Log entry" };
  return {
    title: entry.title,
    description: entry.excerpt ?? entry.title,
    openGraph: { title: entry.title, description: entry.excerpt ?? entry.title }
  };
}

export default async function LogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { locale, t } = await getT();
  const entry = await getLogBySlug(slug, locale);
  if (!entry) notFound();

  marked.setOptions({ gfm: true, breaks: false });
  const html = await marked.parse(entry.body_md);

  const date = entry.published_at ? new Date(entry.published_at) : null;

  return (
    <article className="container-prose py-12 sm:py-16 max-w-3xl">
      <Link href="/log" className="text-sm muted hover:text-forest">{t.log.back}</Link>

      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 num text-xs muted mb-3">
          {date && <time dateTime={date.toISOString()}>{date.toISOString().slice(0, 10)}</time>}
          {entry.week_number != null && <span>· {t.log.week(entry.week_number)}</span>}
          {entry.locale !== locale && <span className="tag tag-eval">{entry.locale.toUpperCase()}</span>}
        </div>
        <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">{entry.title}</h1>
        {entry.excerpt && <p className="muted mt-4 text-lg leading-relaxed">{entry.excerpt}</p>}
      </header>

      <div className="hr-soft my-8" />

      <div className="prose-pineslog" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="hr-soft my-12" />

      <div className="flex items-center justify-between text-sm muted">
        <Link href="/log" className="hover:text-forest">{t.log.backShort}</Link>
        <span className="dim">pineslog</span>
      </div>
    </article>
  );
}
