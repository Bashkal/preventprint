# PreventPrint

**An open library of low-cost DIY blueprints against air, water, soil and chemical contamination.**

PreventPrint collects practical, buildable solutions that schools, workshops and households can use to notice and reduce everyday pollution risks. It supports UN Sustainable Development Goal 3, Target 3.9: reducing illness and death from hazardous chemicals and from air, water and soil pollution.

> 🇹🇷 PreventPrint; hava, su, toprak ve kimyasal kirliliğe karşı düşük maliyetli, kendin-yap çözümlerin açık bir kütüphanesidir. İçerik önce İngilizce, ardından Türkçe olarak sunulur.

## What is a blueprint?

Every blueprint follows the same six-part structure, so anyone can compare, build and improve it:

1. **Health risk**: what the pollutant is, who is exposed and why it matters
2. **Application and code**: electronics, wiring and source code (with a simulation where possible)
3. **Mechanical design**: parts, enclosure, CAD files and assembly
4. **Spatial placement**: where and how to install it in a real space
5. **Cost and adoption**: bill of materials in TL and what it takes to adopt it
6. **Limitations and safety**: what it cannot do and how to use it safely

Blueprints can be filtered by **medium** (air, water, soil, chemicals), **setting** (school, home, workshop, outdoors) and **budget**.

> ⚠️ DIY sensors give *indicators* that prompt action. They are not calibrated instruments and must not be used on their own for health decisions.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- [Supabase](https://supabase.com) for the database, team login and file storage
- [Vercel](https://vercel.com) for hosting; every push to `main` deploys automatically
- English and Turkish with `next-intl`; machine translation via DeepL, always reviewable by hand

## Getting started

Requirements: Node.js 20 or newer and Git.

```bash
git clone https://github.com/Bashkal/preventprint.git
cd preventprint
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Once Supabase is connected, create a `.env.local` file in the project root (it is git-ignored):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Never commit secret keys (such as the Supabase `service_role` key). Add them in the Vercel project settings instead.

## Project status

This site is being built during the GLB 300 course (Fall 2026).

- [ ] Site v0: home, blueprint list with filters, blueprint page, safety and contribute pages (13 Nov)
- [ ] Blueprint 1: classroom air quality, with simulation (27 Nov)
- [ ] Site v1: contribution form and machine translation (4 Dec)
- [ ] Blueprint 3 and faculty review (11 Dec)
- [ ] Project fair (25 Dec)

## Contributing

Ideas, corrections and new blueprints are welcome. Until the contribution form is live, please open an [issue](https://github.com/Bashkal/preventprint/issues) describing your solution and which of the six sections you can fill. Every blueprint is reviewed before it is published.

## Team

GLB 300, Group 1:

- Mahmut Sami Başkal, Computer Engineering
- Berat Kınık, Mechanical Engineering
- Fatma Killik, Molecular Biology
- Fatma Elif Özkan, Business
- Duygu Karabıyık, Architecture
