-- PreventPrint – align the schema with the site's data model (lib/blueprints.ts)
-- Run once in Supabase > SQL Editor, after 20261113000000_init.sql.

-- 1. A blueprint can apply to several settings (e.g. home and school)
alter table public.blueprints
  alter column setting type public.setting[] using array[setting];

-- 2. Fields the site already shows
alter table public.blueprints
  add column if not exists due date,
  add column if not exists highlights jsonb not null default '{}'::jsonb;  -- {"en": ["...", "..."], "tr": [...]}

-- 3. Keep the live site's URL for the cleaning-products blueprint
update public.blueprints set slug = 'cleaning-products-storage-guide'
where slug = 'cleaning-products-storage';

-- 4. Data for the three blueprints (same as the v0 sample data)
update public.blueprints set
  setting = array['school']::public.setting[],
  due = '2026-11-27',
  highlights = $j${"en": ["Lights up when it is time to open the windows", "Parts cost about 1,500 TL", "Runs on 5 V USB power", "Online Wokwi simulation, no hardware needed to try it"]}$j$::jsonb
where slug = 'classroom-ventilation-indicator';

update public.blueprints set
  setting = array['home']::public.setting[],
  due = '2026-12-04',
  highlights = $j${"en": ["No equipment needed", "Which products must never be mixed", "A storage layout that keeps products away from children"]}$j$::jsonb
where slug = 'cleaning-products-storage-guide';

update public.blueprints set
  setting = array['home', 'school']::public.setting[],
  due = '2026-12-11',
  highlights = $j${"en": ["Uses seeds, cups and water", "Compares garden soil with clean soil", "A first screen, not a laboratory test"]}$j$::jsonb
where slug = 'seed-germination-soil-test';

-- 5. The two sections already written for the classroom blueprint
--    Paragraphs are separated by a blank line.
insert into public.blueprint_sections (blueprint_id, section_type, lang, content, is_manual)
select b.id, v.section_type::public.section_type, 'en', v.content, true
from public.blueprints b
cross join (values
  ('cost_adoption', $t$Basic set: ESP32-S3 board, gas sensor, temperature sensor, two ultrasonic sensors and LEDs, about 1,500 TL including VAT (prices checked 2 Nov 2026). The enclosure is designed for printing on a school or shared 3D printer.

For comparison, a commercial CO₂ monitor such as the Aranet4 Home costs about US$250. The commercial device measures more accurately; this build gives a much cheaper prompt to ventilate.$t$),
  ('limitations_safety', $t$Low-cost gas sensors are not calibrated instruments. The indicator shows that air quality is getting worse and prompts action, such as opening a window. It does not give an exact CO₂ value and must not be used on its own for health decisions.$t$)
) as v(section_type, content)
where b.slug = 'classroom-ventilation-indicator'
on conflict (blueprint_id, section_type, lang) do update set content = excluded.content;

-- 6. Section text is public for every blueprint, so work in progress is visible
--    (drafts are labelled on the site). Publishing still requires all six sections.
drop policy if exists "public reads published sections" on public.blueprint_sections;
create policy "public reads sections" on public.blueprint_sections
  for select using (true);

-- Check
select slug, setting, due, sections_done from public.blueprints order by due;
