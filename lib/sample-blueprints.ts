// v0 sample data. Used only when Supabase cannot be reached (for example if the
// free project is paused), so the site still renders something sensible.
import type { Blueprint } from "./blueprints";

export const SAMPLE_BLUEPRINTS: Blueprint[] = [
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
    sectionsDone: 2,
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
    sectionsDone: 0,
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
    sectionsDone: 0,
  },
];
