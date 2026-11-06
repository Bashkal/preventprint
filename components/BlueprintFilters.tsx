"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BLUEPRINTS, MEDIA, SETTINGS, type Medium, type Setting } from "@/lib/blueprints";
import { BlueprintCard } from "./BlueprintRow";

const BUDGETS = [
  { value: "", label: "Any budget" },
  { value: "500", label: "Up to 500 TL" },
  { value: "1000", label: "Up to 1,000 TL" },
  { value: "2000", label: "Up to 2,000 TL" },
];

export function BlueprintFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const medium = (params.get("medium") ?? "") as Medium | "";
  const setting = (params.get("setting") ?? "") as Setting | "";
  const budget = params.get("budget") ?? "";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = BLUEPRINTS.filter(
    (b) =>
      (!medium || b.medium === medium) &&
      (!setting || b.setting.includes(setting)) &&
      (!budget || (b.costTry !== null && b.costTry <= Number(budget))),
  );

  const active = medium || setting || budget;

  return (
    <>
      <form className="card grid gap-4 p-5 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
        <Select label="Medium" value={medium} onChange={(v) => update("medium", v)}>
          <option value="">All media</option>
          {MEDIA.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </Select>
        <Select label="Setting" value={setting} onChange={(v) => update("setting", v)}>
          <option value="">All settings</option>
          {SETTINGS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
        <Select label="Budget" value={budget} onChange={(v) => update("budget", v)}>
          {BUDGETS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </Select>
      </form>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2 text-sm text-ink-soft">
        <p aria-live="polite">
          {results.length === 1 ? "1 blueprint" : `${results.length} blueprints`}
        </p>
        {active && (
          <button type="button" className="text-leaf underline" onClick={() => router.replace(pathname, { scroll: false })}>
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <BlueprintCard key={b.slug} b={b} />
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-rule bg-card p-8">
          <p className="font-semibold">No blueprints match these filters yet.</p>
          <p className="mt-1 text-ink-soft">
            Try another medium or budget, or{" "}
            <a href="/contribute" className="text-leaf underline">
              share a blueprint
            </a>{" "}
            that fills this gap. Blueprints without a cost are hidden when a budget is set.
          </p>
        </div>
      )}
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-lg border border-rule bg-bg px-3 py-2.5 text-base font-normal text-ink"
      >
        {children}
      </select>
    </label>
  );
}
