import type { Metadata } from "next";
import { Suspense } from "react";
import { BlueprintFilters } from "@/components/BlueprintFilters";

export const metadata: Metadata = { title: "Blueprints" };

export default function BlueprintsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="display text-3xl font-bold sm:text-4xl">Blueprints</h1>
      <p className="mt-2 max-w-[60ch] text-ink-soft">
        Filter by what you want to protect against, where you will use it and how much you can spend.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-ink-soft">Loading blueprints…</p>}>
          <BlueprintFilters />
        </Suspense>
      </div>
    </div>
  );
}
