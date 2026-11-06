import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed, Clock, Coins, Leaf, School } from "lucide-react";
import {
  BLUEPRINTS,
  SECTIONS,
  completeSections,
  formatCost,
  getBlueprint,
  settingName,
} from "@/lib/blueprints";
import { MediumBadge } from "@/components/MediumTag";
import { DeviceIllustration } from "@/components/DeviceIllustration";
import { CtaBand } from "@/components/CtaBand";
import { MEDIUM_ICONS, SECTION_ICONS } from "@/components/icons";

export function generateStaticParams() {
  return BLUEPRINTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blueprints/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBlueprint(slug);
  return { title: b?.title ?? "Blueprint not found" };
}

export default async function BlueprintPage({ params }: PageProps<"/blueprints/[slug]">) {
  const { slug } = await params;
  const b = getBlueprint(slug);
  if (!b) notFound();

  const done = completeSections(b);
  const MediumIcon = MEDIUM_ICONS[b.medium];

  return (
    <article>
      {/* Hero */}
      <header className="hero-bg text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/blueprints" className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All blueprints
              </Link>
              <MediumBadge medium={b.medium} />
            </div>
            <h1 className="display mt-6 max-w-[18ch] text-4xl font-bold sm:text-5xl lg:text-6xl">{b.title}</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-white/85">{b.summary}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              <HeroStat icon={<Coins className="h-5 w-5" />} value={formatCost(b.costTry)} label="Parts cost" />
              <HeroStat icon={<School className="h-5 w-5" />} value={b.setting.map(settingName).join(", ")} label="Setting" />
              <HeroStat
                icon={<Clock className="h-5 w-5" />}
                value={`${done} of ${SECTIONS.length} sections`}
                label={b.status === "published" ? "Published" : `Due ${b.due}`}
              />
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            {b.slug === "classroom-ventilation-indicator" ? (
              <DeviceIllustration />
            ) : (
              <div className="grid aspect-square w-56 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 sm:w-72">
                <MediumIcon className="h-28 w-28 text-leaf-bright" aria-hidden="true" strokeWidth={1.25} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Section tabs */}
      <nav aria-label="Sections" className="sticky top-0 z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
        <ul className="card flex gap-1 overflow-x-auto p-2">
          {SECTIONS.map((s) => {
            const Icon = SECTION_ICONS[s.type];
            return (
              <li key={s.type} className="shrink-0">
                <a
                  href={`#${s.type}`}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-mint hover:text-forest"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {s.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_22rem]">
        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map((s) => {
            const Icon = SECTION_ICONS[s.type];
            const body = b.sections[s.type];
            const isSafety = s.type === "limitations_safety";
            return (
              <section key={s.type} id={s.type} className="card scroll-mt-24 p-6 sm:p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl ${
                      isSafety ? "bg-safety-tint text-safety" : "bg-mint text-leaf"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {s.title}
                </h2>
                {body && body.length > 0 ? (
                  <div
                    className={`mt-5 max-w-[68ch] space-y-4 ${
                      isSafety ? "rounded-xl border-l-4 border-safety bg-safety-tint p-5" : ""
                    }`}
                  >
                    {body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-rule bg-bg p-5 text-ink-soft">
                    <CircleDashed className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>
                      Being written by {s.owner}. Target date: {b.due}.
                      {s.type === "application_code" && b.medium === "air" &&
                        " An online Wokwi simulation will be linked here."}
                      {s.type === "mechanical_design" && " Drawings and a 3D CAD model will be added here."}
                    </span>
                  </p>
                )}
              </section>
            );
          })}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Leaf className="h-5 w-5 text-leaf" aria-hidden="true" />
              Overview
            </h2>
            <ul className="mt-4 space-y-2.5">
              {b.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[15px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Progress</h2>
              <ProgressRing value={done} total={SECTIONS.length} />
            </div>
            <ul className="mt-4 space-y-2">
              {SECTIONS.map((s) => {
                const written = (b.sections[s.type]?.length ?? 0) > 0;
                return (
                  <li key={s.type} className="flex items-center gap-2.5 text-[15px]">
                    {written ? (
                      <CheckCircle2 className="h-5 w-5 text-leaf" aria-label="Written" />
                    ) : (
                      <CircleDashed className="h-5 w-5 text-ink-soft/60" aria-label="Not written yet" />
                    )}
                    <span className={written ? "" : "text-ink-soft"}>{s.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card bg-safety-tint p-6">
            <h2 className="text-lg font-bold">Before you build</h2>
            <p className="mt-2 text-[15px] text-ink-soft">
              DIY readings are indicators that prompt action, not measurements for health decisions.
            </p>
            <Link
              href="/safety"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest hover:bg-mint"
            >
              Read the safety guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      <CtaBand />
    </article>
  );
}

function HeroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <li className="flex items-center gap-3 rounded-full bg-white/10 py-2 pl-3 pr-5 ring-1 ring-white/15">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10" aria-hidden="true">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block font-semibold">{value}</span>
        <span className="block text-sm text-white/70">{label}</span>
      </span>
    </li>
  );
}

function ProgressRing({ value, total }: { value: number; total: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" role="img" aria-label={`${value} of ${total} sections written`}>
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--mint)" strokeWidth="6" />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="var(--leaf)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(value / total) * c} ${c}`}
        transform="rotate(-90 28 28)"
      />
      <text x="28" y="33" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">
        {value}/{total}
      </text>
    </svg>
  );
}
