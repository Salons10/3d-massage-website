---
name: website-builder
description: >
  Builds a complete website from a Blueprint and site-config.json using Vite,
  React, and TypeScript. Loads Context OS files (brand, roles) for copy and
  design direction. Uses Gemini 1.5 Pro for copy generation. Handles scaffolding,
  component creation, styling, and asset generation.
  Use when building, scaffolding, or creating a website from a blueprint or
  Telegram bot pipeline command.
---

# Website Builder

Take a **Website Blueprint** (from `competitor-research`) and/or a **site-config.json** (from Telegram bot intake) and build a complete, production-ready website using **Vite + React + TypeScript**.

**Pipeline position:** Runs AFTER `competitor-research` and BEFORE `quality-seo-gate`.

## When to Use This Skill

- User says "build the website" or "create the site" after a blueprint exists
- Telegram bot pipeline enters build phase (site-config.json provided)
- User provides a design document or section list to implement
- User wants to turn competitor research into a working website

## Prerequisites

| Requirement | Source |
|-------------|--------|
| `BLUEPRINT.md` and/or `site-config.json` | From `competitor-research` or Telegram bot intake |
| Node.js + npm | Installed locally |
| `ui-ux-pro-max` skill | For design system generation |
| Context OS files | `brand/BRAND_IDENTITY.md`, `roles/sebastian.md` |

## Input Formats

### Option A: site-config.json (from Telegram bot)

```json
{
  "business_name": "Apex Metal Roofing",
  "tagline": "Houston's Trusted Metal Roof Experts",
  "phone": "832-555-1234",
  "service_area": "Greater Houston, TX",
  "colors": {
    "primary": "#2D2D2D",
    "accent": "#FF6B35",
    "background": "#1A1A1A"
  },
  "style": "sales-focused",
  "sections": [
    "hero_with_quote_form",
    "trust_bar",
    "services_grid",
    "gallery",
    "warranty_section",
    "testimonials",
    "service_areas",
    "faq",
    "cta_footer"
  ],
  "special_requirements": [
    "Quote form above the fold",
    "Gallery of metal roofs",
    "10-year warranty section"
  ],
  "existing_site_url": "apexmetalroofing.com"
}
```

### Option B: BLUEPRINT.md (from competitor-research)

Standard blueprint format with sections, design direction, and features.

### Both can be used together — site-config provides specifics, blueprint provides patterns.

## Workflow

```markdown
- [ ] Load inputs: site-config.json + BLUEPRINT.md + Context OS files
- [ ] Load Sebastian's defaults from roles/sebastian.md
- [ ] Load brand identity from brand/BRAND_IDENTITY.md
- [ ] Scaffold Vite + React + TS project (or confirm existing)
- [ ] Generate design system via `ui-ux-pro-max`
- [ ] Create global styles (index.css) with design tokens
- [ ] Generate copy for all sections (use Gemini/LLM with niche research)
- [ ] Build sections top-to-bottom (Hero → Footer)
- [ ] Generate images with `generate_image` tool (no placeholders)
- [ ] Assemble App.tsx with all sections
- [ ] Local dev server smoke test
```

---

## Step 1: Load Context

Before writing a single line of code, load these files:

```markdown
1. ~/dt-creative/brand/BRAND_IDENTITY.md → DT Creative voice and quality standard
2. ~/dt-creative/roles/sebastian.md → His defaults:
   - Sales-focused by default
   - Conversion elements on every page (forms, CTAs, phone)
   - Dark/professional aesthetics
   - Modern typography (Inter, Outfit, Bebas Neue)
   - High-contrast CTAs
   - Mobile-first
3. ~/dt-creative/niches/{niche}/research.md → Competitor patterns (if exists)
4. site-config.json → Client-specific overrides
```

**Priority order:** site-config overrides > niche research patterns > Sebastian's defaults

---

## Step 2: Project Scaffolding

**New project:**
```bash
npx -y create-vite@latest ./ -- --template react-ts
npm install
```

**Existing project:** Skip scaffolding. Verify `vite.config.ts` and `tsconfig.json` exist.

### Recommended Dependencies
```bash
npm install react-icons lucide-react
```

Only add dependencies the blueprint requires. Keep lean.

---

## Step 3: Design System Setup

**Invoke the `ui-ux-pro-max` skill** to generate the design system.

Feed it:
- Color palette from site-config or blueprint
- Typography pairings
- Industry category

**Output:** `design-system/MASTER.md` with all tokens.

### Implement in `index.css`

```css
:root {
  /* Colors from site-config or blueprint */
  --color-primary: #hex;
  --color-secondary: #hex;
  --color-accent: #hex;
  --color-bg: #hex;
  --color-text: #hex;

  /* Typography */
  --font-heading: 'Font Name', sans-serif;
  --font-body: 'Font Name', sans-serif;

  /* Spacing */
  --section-padding: 80px 0;
  --container-max: 1200px;

  /* Transitions */
  --transition-default: all 250ms ease;
}
```

Import Google Fonts in `index.html` `<head>`.

---

## Step 4: Generate Copy

Use the LLM (Gemini 1.5 Pro) to generate all website copy. Feed it:

```
Context:
- Business: {business_name} in {service_area}
- Industry: {niche}
- Style: {sales-focused / design-focused}
- Competitor patterns: {loaded from research.md}
- Sections needed: {from site-config or blueprint}

Instructions:
- Write sales-focused copy (Sebastian's default)
- Use benefit-driven language, not feature-driven
- Include local references naturally (city names, neighborhoods)
- CTAs should use action + benefit: "Get Your Free Estimate" > "Contact Us"
- First-person plural ("we") for the business voice
- Keep paragraphs short (2-3 sentences max)
- Include specific numbers where possible (years, projects, warranties)
```

**Output:** A copy document with text for every section, ready to inject into JSX.

---

## Step 5: Build Sections

Work through sections **top-to-bottom**. For each section:

### Build Pattern
1. **Read the config** — What does this section need?
2. **Reference research** — What competitor patterns work?
3. **Write the JSX** — Semantic HTML, proper heading hierarchy
4. **Style it** — CSS custom properties, no inline styles
5. **Inject generated copy** — From Step 4
6. **Generate assets** — `generate_image` for visuals (no placeholders)

### Standard Section Checklist (service-industry sites)

| # | Section | Key Elements | Sebastian's Defaults |
|---|---------|-------------|---------------------|
| 1 | **Navigation** | Logo, links, CTA button, mobile hamburger | Phone number visible, bold CTA |
| 2 | **Hero** | Headline, subhead, CTA, background | Form or phone above fold, dark overlay |
| 3 | **Trust Bar** | Badges, years, certifications | Numbers-driven (years, projects, rating) |
| 4 | **Services** | Card grid with icons, descriptions | 3-6 cards, benefit-focused copy |
| 5 | **Why Choose Us** | Value props, differentiators | 3-4 punchy differentiators |
| 6 | **Gallery** | Project photos, before/after | Grid with hover zoom |
| 7 | **Testimonials** | Reviews, star ratings, names | Real quotes, 5-star visual |
| 8 | **Service Areas** | Map or location list | City/neighborhood list for SEO |
| 9 | **CTA Banner** | Strong headline, phone + form | High contrast, urgency |
| 10 | **Footer** | Links, contact, social, legal | NAP info, service area repeat |

### Image Generation Rules
- **Never use placeholder images** — always use `generate_image`
- Prompts should match industry: `"Professional roofer installing metal roof, sunny day, high quality photo"`
- Sizes: hero 1920×1080, cards 600×400, icons 256×256
- Save to `public/images/`

---

## Step 6: Component Architecture

### Single-File Approach (for template/landing pages)

Build in `App.tsx` with clearly labeled sections:

```tsx
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ServiceAreas />
      <CTABanner />
      <Footer />
    </>
  );
}
```

Each section as a function component in the same file or extracted to `src/components/`.

### Multi-Page (if needed)
```bash
npm install react-router-dom
```

---

## Step 7: Quality Checks Before Handoff

Before passing to `quality-seo-gate`:

- [ ] All sections from config/blueprint are implemented
- [ ] No placeholder text ("Lorem ipsum") remains
- [ ] No broken image paths
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Basic responsive behavior works (flex/grid layouts)
- [ ] Generated copy is injected into all sections
- [ ] Phone number and CTAs are visible above the fold

---

## Design Principles

- **Mobile-first CSS** — Start mobile, add `@media` for larger screens
- **Semantic HTML** — `<section>`, `<nav>`, `<main>`, `<footer>`, proper headings
- **Performance** — Lazy load below-fold images, optimize font loading
- **Accessibility** — Alt text, contrast, keyboard navigation
- **No CSS frameworks** — Vanilla CSS unless user explicitly requests Tailwind
- **Sales-focused by default** — Conversion elements on every page

## Related Skills

- **Input from:** `competitor-research` (provides BLUEPRINT.md)
- **Design system:** `ui-ux-pro-max` (generates color/typography tokens)
- **Output to:** `quality-seo-gate` (next step — unified polish + SEO)
