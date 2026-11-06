import type { Metadata } from "next";
import { SECTIONS } from "@/lib/blueprints";

export const metadata: Metadata = { title: "Contribute" };

const steps = [
  {
    title: "Check what already exists",
    body: "Browse the library first. Improving an existing blueprint is often more useful than starting a new one.",
  },
  {
    title: "Describe your blueprint",
    body: "Open an issue on our GitHub page with the problem it addresses, the medium and setting, and which of the six sections you can write. A submission form on this site is coming in December.",
  },
  {
    title: "Write in English or your own language",
    body: "You can write in English, Turkish or another language. We add machine translation, and you can write or correct the translation of any section yourself, especially health and safety text.",
  },
  {
    title: "We review before publishing",
    body: "The team checks every blueprint, may ask for changes, and publishes it only when all six sections are complete.",
  },
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="display text-3xl font-bold sm:text-4xl">Share a blueprint</h1>
      <p className="mt-2 max-w-[60ch] text-ink-soft">
        PreventPrint is open. If you have built a low-cost way to reduce exposure to polluted air,
        water, soil or chemicals, we would like to publish it.
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_20rem]">
        <ol className="space-y-8">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="display text-2xl font-bold text-leaf">{i + 1}</span>
              <div>
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-1 max-w-[60ch] text-ink-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="card self-start p-6">
          <h2 className="font-semibold">Every blueprint needs</h2>
          <ul className="mt-3 space-y-1.5 text-ink-soft">
            {SECTIONS.map((s) => (
              <li key={s.type}>{s.title}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            A section that does not apply, such as code for a soil test, says why in one line.
          </p>
          <a
            href="https://github.com/Bashkal/preventprint/issues/new"
            className="mt-5 inline-block rounded-full bg-forest px-5 py-2.5 font-semibold text-white hover:bg-forest-2"
          >
            Open an issue on GitHub
          </a>
        </aside>
      </div>
    </div>
  );
}
