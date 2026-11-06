import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { completeSections, formatCost, settingName, SECTIONS, type Blueprint } from "@/lib/blueprints";
import { MediumTag } from "./MediumTag";

export function BlueprintCard({ b }: { b: Blueprint }) {
  const done = completeSections(b);
  return (
    <li className="card flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <MediumTag medium={b.medium} />
        <span className="text-sm text-ink-soft">{b.setting.map(settingName).join(", ")}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">
        <Link href={`/blueprints/${b.slug}`} className="hover:underline">
          {b.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-ink-soft">{b.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-rule pt-4 text-sm">
        <div>
          <dt className="text-ink-soft">Cost</dt>
          <dd className="font-semibold">{formatCost(b.costTry)}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Written</dt>
          <dd className="font-semibold">
            {done} of {SECTIONS.length} sections
          </dd>
        </div>
      </dl>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mint" aria-hidden="true">
        <div className="h-full rounded-full bg-leaf" style={{ width: `${(done / SECTIONS.length) * 100}%` }} />
      </div>
      <Link
        href={`/blueprints/${b.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-leaf hover:underline"
        aria-label={`Open ${b.title}`}
      >
        Open blueprint
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </li>
  );
}
