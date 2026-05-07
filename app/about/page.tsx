import { getSettings } from "@/lib/data";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <div className="container-prose py-12 sm:py-16 max-w-3xl">
      <div className="section-eyebrow mb-3">About</div>
      <h1 className="h-serif text-4xl sm:text-5xl tracking-tightest leading-tight">Hi — I&rsquo;m {s.founder_name}.</h1>
      <div className="muted mt-6 space-y-4 text-lg leading-relaxed">
        <p>
          I&rsquo;m a tech / AI builder. <span className="text-forest font-medium">pineslog</span> is my public log on the way to <span className="text-amber-700 font-semibold num">$1M</span> —
          starting from a tight budget, no audience, no funding.
        </p>
        <p>
          I write down the tools, the numbers, what worked and what didn&rsquo;t. The plan is simple:
          sell expertise, build an audience, productize, scale, diversify.
        </p>
        <p>
          If you build in AI or want to follow the journey, the <a href="/log" className="underline decoration-forest/40 hover:text-forest">log</a> is the place.
        </p>
      </div>
      <div className="hr-soft my-10" />
      <div className="text-sm muted">
        Reach out: <a href="mailto:hi@pineslog.com" className="text-amber-700 font-medium">hi@pineslog.com</a>
      </div>
    </div>
  );
}
