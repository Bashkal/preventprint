import { mediumName, type Medium } from "@/lib/blueprints";
import { MEDIUM_ICONS } from "./icons";

const color: Record<Medium, string> = {
  air: "var(--air)",
  water: "var(--water)",
  soil: "var(--soil)",
  chemicals: "var(--chemicals)",
};

export function mediumColor(medium: Medium) {
  return color[medium];
}

/** Pill used on light backgrounds. */
export function MediumTag({ medium }: { medium: Medium }) {
  const Icon = MEDIUM_ICONS[medium];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-sm font-medium text-forest">
      <Icon className="h-4 w-4" style={{ color: color[medium] }} aria-hidden="true" />
      {mediumName(medium)}
    </span>
  );
}

/** Solid pill used on the dark hero. */
export function MediumBadge({ medium }: { medium: Medium }) {
  const Icon = MEDIUM_ICONS[medium];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf px-3 py-1 text-sm font-semibold text-white">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {mediumName(medium)}
    </span>
  );
}
