import { getSettings } from "@/lib/data";
import { getT } from "@/lib/i18n";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const [s, { t }] = await Promise.all([getSettings(), getT()]);
  return (
    <div className="container-prose py-12 sm:py-16 max-w-3xl">
      <div className="section-eyebrow mb-3">{t.about.eyebrow}</div>
      <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">{t.about.titlePrefix}{s.founder_name}.</h1>
      <div className="muted mt-6 space-y-4 text-lg leading-relaxed">
        <p>
          {t.about.p1A}<span className="text-forest font-medium">pineslog</span>{t.about.p1B}<span className="text-amber-700 font-semibold num">$1M</span>{t.about.p1C}
        </p>
        <p>{t.about.p2}</p>
        <p>
          {t.about.p3A}<a href="/log" className="underline decoration-forest/40 hover:text-forest">{t.about.p3B}</a>{t.about.p3C}
        </p>
      </div>
      <div className="hr-soft my-10" />
      <div className="text-sm muted">
        {t.about.reachOut} <a href="mailto:hi@pineslog.com" className="text-amber-700 font-medium">hi@pineslog.com</a>
      </div>
    </div>
  );
}
