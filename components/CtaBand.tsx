import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function CtaBand() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="hero-bg flex flex-col gap-6 rounded-2xl px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-5">
          <Leaf className="hidden h-12 w-12 shrink-0 text-leaf-bright sm:block" aria-hidden="true" />
          <div>
            <h2 className="display text-2xl font-bold">Built something that cuts exposure?</h2>
            <p className="mt-1 text-white/80">Share it as a blueprint so others can build it too.</p>
          </div>
        </div>
        <Link
          href="/contribute"
          className="inline-flex items-center gap-2 self-start rounded-full bg-mint-strong px-5 py-2.5 font-semibold text-forest hover:bg-white sm:self-auto"
        >
          Share a blueprint
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
