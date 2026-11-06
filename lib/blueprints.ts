// Sample data for site v0. Replaced by Supabase queries once the database is connected.

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
  /** Section text in markdown-free plain paragraphs; missing sections are still being written. */
  sections: Partial<Record<SectionType, string[]>>;
};

export const BLUEPRINTS: Blueprint[] = [
  {
    slug: "classroom-ventilation-indicator",
    title: "Classroom ventilation indicator",
    summary:
      "A small device that shows when classroom air is getting stale, so the class knows when to open the windows.",
    medium: "air",
    setting: ["school"],
    costTry: 1500,
    status: "draft",
    due: "27 Nov 2026",
    highlights: [
      "Lights up when it is time to open the windows",
      "Parts cost about 1,500 TL",
      "Runs on 5 V USB power",
      "Online Wokwi simulation, no hardware needed to try it",
    ],
    sections: {
      cost_adoption: [
        "Basic set: ESP32-S3 board, gas sensor, temperature sensor, two ultrasonic sensors and LEDs, about 1,500 TL including VAT (prices checked 2 Nov 2026). The enclosure is designed for printing on a school or shared 3D printer.",
        "For comparison, a commercial CO₂ monitor such as the Aranet4 Home costs about US$250. The commercial device measures more accurately; this build gives a much cheaper prompt to ventilate.",
      ],
      limitations_safety: [
        "Low-cost gas sensors are not calibrated instruments. The indicator shows that air quality is getting worse and prompts action, such as opening a window. It does not give an exact CO₂ value and must not be used on its own for health decisions.",
      ],
    },
  },
  {
    slug: "cleaning-products-storage-guide",
    title: "Safe storage and mixing of cleaning products",
    summary:
      "A home guide for storing, labelling and using cleaning products so that no one mixes or swallows them by mistake.",
    medium: "chemicals",
    setting: ["home"],
    costTry: null,
    status: "draft",
    due: "4 Dec 2026",
    highlights: [
      "No equipment needed",
      "Which products must never be mixed",
      "A storage layout that keeps products away from children",
    ],
    sections: {},
  },
  {
    slug: "seed-germination-soil-test",
    title: "Seed-germination soil test",
    summary:
      "A step-by-step test that compares how seeds sprout in garden soil and in clean soil, as a first screen before growing food.",
    medium: "soil",
    setting: ["home", "school"],
    costTry: null,
    status: "draft",
    due: "11 Dec 2026",
    highlights: [
      "Uses seeds, cups and water",
      "Compares garden soil with clean soil",
      "A first screen, not a laboratory test",
    ],
    sections: {},
  },
];

export function getBlueprint(slug: string) {
  return BLUEPRINTS.find((b) => b.slug === slug);
}

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
  return SECTIONS.filter((s) => (b.sections[s.type]?.length ?? 0) > 0).length;
}
