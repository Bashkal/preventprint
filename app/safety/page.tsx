import type { Metadata } from "next";

export const metadata: Metadata = { title: "Safety" };

const rules = [
  {
    title: "Treat DIY readings as a prompt, not a measurement",
    body: "Low-cost sensors are not calibrated instruments. Use a reading as a reason to act, such as opening a window, and never on its own to decide whether something is safe for health.",
  },
  {
    title: "Never mix cleaning products",
    body: "Some common products release toxic gas when mixed, for example bleach with acidic or ammonia-based cleaners. Keep products in their original, labelled containers and out of children's reach.",
  },
  {
    title: "Keep electronics low-voltage",
    body: "Our electronic blueprints run on 5 V from USB. Do not connect them to mains power, and keep them away from water.",
  },
  {
    title: "Build with an adult present",
    body: "Children and students should build and test blueprints with a teacher or adult nearby, especially when soil, chemicals or tools are involved.",
  },
  {
    title: "Read each blueprint's limitations first",
    body: "Every blueprint ends with a Limitations and safety section. Read it before you build, and stop if your situation is not covered.",
  },
];

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="display text-3xl font-bold sm:text-4xl">Safety</h1>
      <p className="mt-2 max-w-[60ch] text-ink-soft">
        PreventPrint blueprints help you notice and reduce everyday exposure. They do not replace
        professional testing, medical advice or emergency services.
      </p>

      <aside className="mt-8 max-w-3xl rounded-2xl border-l-4 border-safety bg-safety-tint p-5">
        <h2 className="font-semibold">In an emergency</h2>
        <p className="mt-1">
          If you suspect carbon monoxide or poisoning, get everyone into fresh air and call{" "}
          <strong>112</strong>. For poisoning advice in Türkiye, call the national poison helpline{" "}
          <strong>ALO 114</strong>.
        </p>
      </aside>

      <ol className="mt-10 max-w-3xl space-y-8">
        {rules.map((r, i) => (
          <li key={r.title} className="grid grid-cols-[2rem_1fr] gap-3">
            <span className="display text-2xl font-bold text-leaf">{i + 1}</span>
            <div>
              <h2 className="text-lg font-semibold">{r.title}</h2>
              <p className="mt-1 max-w-[65ch] text-ink-soft">{r.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-[65ch] text-sm text-ink-soft">
        This page is a first version and will be reviewed by faculty members before the project fair.
      </p>
    </div>
  );
}
