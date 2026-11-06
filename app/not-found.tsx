import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <h1 className="display text-3xl font-bold">This page does not exist</h1>
      <p className="mt-2 text-ink-soft">The link may be old, or the blueprint may have moved.</p>
      <Link href="/blueprints" className="mt-6 inline-block text-leaf underline">
        Go to all blueprints
      </Link>
    </div>
  );
}
