// Blueprint types, fixed lists and display helpers. Safe to import in client components.
// Data access (Supabase) lives in lib/data.ts, which is server-only.

export type Medium = "air" | "water" | "soil" | "chemicals";
export type Setting = "school" | "home" | "workshop" | "outdoors";
export type Status = "draft" | "in_review" | "published";

export type SectionType =
  | "health_risk"
  | "application_code"
  | "mechanical_design"
  | "spatial_placement"
  | "cost_adoption"
  | "limitations_safety";

export const SECTIONS: { type: SectionType; title: string; owner: string }[] = [
  { type: "health_risk", title: "Health risk", owner: "Fatma Killik" },
  { type: "application_code", title: "Application and code", owner: "Mahmut Sami Başkal" },
  { type: "mechanical_design", title: "Mechanical design", owner: "Berat Kınık" },
  { type: "spatial_placement", title: "Spatial placement", owner: "Duygu Karabıyık" },
  { type: "cost_adoption", title: "Cost and adoption", owner: "Fatma Elif Özkan" },
  { type: "limitations_safety", title: "Limitations and safety", owner: "Fatma Killik" },
];

export const MEDIA: { id: Medium; name: string; line: string }[] = [
  { id: "air", name: "Air", line: "Indoor and outdoor air: ventilation, smoke, dust, carbon monoxide." },
  { id: "water", name: "Water", line: "Drinking and household water: storage, simple checks, treatment." },
  { id: "soil", name: "Soil", line: "Garden and school soil: screening tests before growing food." },
  { id: "chemicals", name: "Chemicals", line: "Everyday products: safe storage, mixing and labelling." },
];

export const SETTINGS: { id: Setting; name: string }[] = [
  { id: "school", name: "School" },
  { id: "home", name: "Home" },
  { id: "workshop", name: "Workshop" },
  { id: "outdoors", name: "Outdoors" },
];

export type Blueprint = {
  slug: string;
  title: string;
  summary: string;
  medium: Medium;
  setting: Setting[];
  /** Total cost in Turkish lira, or null when not yet calculated. */
  costTry: number | null;
  status: Status;
  due: string;
  /** Short, factual points shown in the overview card. */
  highlights: string[];
  /** Section text as plain paragraphs; missing sections are still being written. Empty on list pages. */
  sections: Partial<Record<SectionType, string[]>>;
  /** How many of the six sections are written (counted in the database). */
  sectionsDone: number;
};

export function mediumName(id: Medium) {
  return MEDIA.find((m) => m.id === id)?.name ?? id;
}

export function settingName(id: Setting) {
  return SETTINGS.find((s) => s.id === id)?.name ?? id;
}

export function formatCost(cost: number | null) {
  return cost === null ? "Not yet costed" : `≈ ${cost.toLocaleString("en-US")} TL`;
}

export function completeSections(b: Blueprint) {
  return b.sectionsDone;
}
