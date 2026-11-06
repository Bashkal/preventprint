import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PreventPrint – DIY blueprints against pollution",
    template: "%s – PreventPrint",
  },
  description:
    "An open library of low-cost DIY blueprints against air, water, soil and chemical contamination.",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/blueprints", label: "Blueprints" },
  { href: "/safety", label: "Safety" },
  { href: "/contribute", label: "Contribute" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="bg-forest text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="display text-xl font-bold">PreventPrint</span>
            </Link>
            <nav className="order-3 flex w-full gap-6 text-[15px] sm:order-none sm:w-auto">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-white/80 hover:text-white">
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/blueprints"
              className="hidden items-center gap-2 rounded-full bg-mint-strong px-4 py-2 text-sm font-semibold text-forest hover:bg-white sm:inline-flex"
            >
              Browse blueprints
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-rule">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-8 text-sm text-ink-soft sm:px-6 md:grid-cols-2">
            <p>
              PreventPrint supports UN Sustainable Development Goal 3, Target 3.9. A GLB 300 student
              project, Group 1, Fall 2026.
            </p>
            <p className="md:text-right">
              Open source on{" "}
              <a className="underline hover:text-ink" href="https://github.com/Bashkal/preventprint">
                GitHub
              </a>
              . Türkçe sürüm hazırlanıyor.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
