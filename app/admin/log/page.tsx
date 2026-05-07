export const metadata = { title: "Admin · Log" };

export default function LogAdmin() {
  return (
    <div className="space-y-6">
      <div className="section-eyebrow mb-2">Admin · Log</div>
      <h1 className="h-serif text-3xl tracking-tightest">Log entries</h1>
      <div className="card p-8 text-center muted">
        <div className="h-serif text-xl text-forest mb-2">Coming next session.</div>
        <p className="text-sm">Editor markdown con preview, draft/published, slug auto.</p>
      </div>
    </div>
  );
}
