import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLUEPRINTS, MEDIA, SECTIONS } from "@/lib/blueprints";
import { DeviceIllustration } from "@/components/DeviceIllustration";
import { BlueprintCard } from "@/components/BlueprintRow";
import { CtaBand } from "@/components/CtaBand";
import { mediumColor } from "@/components/MediumTag";
import { MEDIUM_ICONS, SECTION_ICONS } from "@/components/icons";

const sectionLines: Record<string, string> = {
  health_risk: "What the pollutant is, who is exposed and why it matters.",
  application_code: "Electronics, wiring and code, with a simulation where possible.",
  mechanical_design: "Parts, enclosure, drawings and CAD files.",
  spatial_placement: "Where and how to install it in a real room or garden.",
  cost_adoption: "Bill of materials in lira and what it takes to adopt it.",
  limitations_safety: "What it cannot do, and how to use it safely.",
};

export default function Home() {
  return (
    <>
      <section className="hero-bg text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="display text-4xl font-bold sm:text-5xl lg:text-6xl">
              Low-cost fixes for the air, water and soil around you
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg text-white/85">
              Open blueprints for schools and homes. Each one explains the health risk, how to build
              it, what it costs and what it cannot do.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blueprints"
                className="inline-flex items-center gap-2 rounded-full bg-mint-strong px-6 py-3 font-semibold text-forest hover:bg-white"
              >
                Browse blueprints
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contribute"
                className="rounded-full px-6 py-3 font-semibold ring-1 ring-white/40 hover:bg-white/10"
              >
                Share a blueprint
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DeviceIllustration />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <h2 className="display text-2xl font-bold sm:text-3xl">Four kinds of exposure</h2>
        <p className="mt-2 max-w-[60ch] text-ink-soft">
          The library follows the four parts of UN Target 3.9: hazardous chemicals, and air, water and
          soil pollution.
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEDIA.map((m) => {
            const Icon = MEDIUM_ICONS[m.id];
            const count = BLUEPRINTS.filter((b) => b.medium === m.id).length;
            return (
              <li key={m.id} className="card">
                <Link href={`/blueprints?medium=${m.id}`} className="group block h-full p-6">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-mint"
                    style={{ color: mediumColor(m.id) }}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold group-hover:underline">{m.name}</h3>
                  <p className="mt-2 text-ink-soft">{m.line}</p>
                  <p className="mt-4 text-sm font-semibold text-leaf">
                    {count === 0 ? "No blueprints yet" : count === 1 ? "1 blueprint" : `${count} blueprints`}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h2 className="display text-2xl font-bold sm:text-3xl">Every blueprint, the same six parts</h2>
        <p className="mt-2 max-w-[60ch] text-ink-soft">
          Health, engineering, architecture and cost are written by people from each field, so you
          can compare solutions and see what each one leaves out.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => {
            const Icon = SECTION_ICONS[s.type];
            const isSafety = s.type === "limitations_safety";
            return (
              <li key={s.type} className="card flex gap-4 p-5">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    isSafety ? "bg-safety-tint text-safety" : "bg-mint text-leaf"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-ink-soft">{sectionLines[s.type]}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="display text-2xl font-bold sm:text-3xl">In the works this semester</h2>
          <Link href="/blueprints" className="font-semibold text-leaf hover:underline">
            See all blueprints
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLUEPRINTS.map((b) => (
            <BlueprintCard key={b.slug} b={b} />
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
