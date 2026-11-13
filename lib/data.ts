// Server-only data access for blueprints. Do not import this file in client components.

import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "./supabase/public";
import { SAMPLE_BLUEPRINTS } from "./sample-blueprints";
import type { Blueprint, Medium, SectionType, Setting, Status } from "./blueprints";

const LANG = "en"; // the site is English-first; Turkish comes with next-intl

type LocalizedText = Record<string, string | undefined>;
type LocalizedList = Record<string, string[] | undefined>;

type BlueprintRow = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  medium: Medium;
  setting: Setting[];
  cost_try: number | string | null;
  status: Status;
  original_lang: string;
  due: string | null;
  highlights: LocalizedList;
  sections_done: number;
};

type SectionRow = { section_type: SectionType; content: string };

const BLUEPRINT_COLUMNS =
  "slug, title, summary, medium, setting, cost_try, status, original_lang, due, highlights, sections_done";

function pick<T>(value: Record<string, T | undefined>, fallbackLang: string): T | undefined {
  return value?.[LANG] ?? value?.[fallbackLang];
}

function formatDue(due: string | null) {
  if (!due) return "to be set";
  return new Date(`${due}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function toBlueprint(row: BlueprintRow, sections: SectionRow[] = []): Blueprint {
  const bySection: Blueprint["sections"] = {};
  for (const s of sections) {
    const paragraphs = s.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length > 0) bySection[s.section_type] = paragraphs;
  }
  return {
    slug: row.slug,
    title: pick(row.title, row.original_lang) ?? row.slug,
    summary: pick(row.summary, row.original_lang) ?? "",
    medium: row.medium,
    setting: row.setting ?? [],
    costTry: row.cost_try === null ? null : Number(row.cost_try),
    status: row.status,
    due: formatDue(row.due),
    highlights: pick(row.highlights, row.original_lang) ?? [],
    sections: bySection,
    sectionsDone: row.sections_done,
  };
}

/** All blueprints for cards and filters (without section text). */
export async function getBlueprints(): Promise<Blueprint[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blueprints");

  try {
    const { data, error } = await createPublicClient()
      .from("blueprints")
      .select(BLUEPRINT_COLUMNS)
      .order("due", { ascending: true, nullsFirst: false })
      .returns<BlueprintRow[]>();
    if (error) throw error;
    return (data ?? []).map((row) => toBlueprint(row));
  } catch (err) {
    console.error("Supabase unavailable, using sample blueprints:", err);
    return SAMPLE_BLUEPRINTS.map((b) => ({ ...b, sections: {} }));
  }
}

/** One blueprint with the text of its sections. */
export async function getBlueprint(slug: string): Promise<Blueprint | undefined> {
  "use cache";
  cacheLife("minutes");
  cacheTag("blueprints", `blueprint:${slug}`);

  try {
    const supabase = createPublicClient();
    const { data: row, error } = await supabase
      .from("blueprints")
      .select(`id, ${BLUEPRINT_COLUMNS}`)
      .eq("slug", slug)
      .maybeSingle<BlueprintRow & { id: string }>();
    if (error) throw error;
    if (!row) return undefined;

    const { data: sections, error: sectionsError } = await supabase
      .from("blueprint_sections")
      .select("section_type, content, lang")
      .eq("blueprint_id", row.id)
      .in("lang", [LANG, row.original_lang])
      .returns<(SectionRow & { lang: string })[]>();
    if (sectionsError) throw sectionsError;

    // Prefer the site language, fall back to the original language per section
    const chosen = new Map<SectionType, SectionRow>();
    for (const s of sections ?? []) {
      if (s.lang === LANG || !chosen.has(s.section_type)) chosen.set(s.section_type, s);
    }
    return toBlueprint(row, [...chosen.values()]);
  } catch (err) {
    console.error(`Supabase unavailable for "${slug}", using sample data:`, err);
    return SAMPLE_BLUEPRINTS.find((b) => b.slug === slug);
  }
}

