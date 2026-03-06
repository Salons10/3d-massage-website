---
name: building-website-from-blueprint
description: >
  Builds a complete website from a Website Blueprint using Vite, React, and TypeScript.
  Handles project scaffolding, component creation, styling, and asset generation.
  Use when the user wants to build, scaffold, or create a new website from a blueprint
  or design document.
---

# Building a Website from Blueprint

Take a **Website Blueprint** (produced by `competitor-research-consulting`) and build a complete, production-ready website using **Vite + React + TypeScript**.

**Pipeline position:** Runs AFTER `competitor-research-consulting` and BEFORE `polishing-website-quality`.

## When to Use This Skill

- User says "build the website" or "create the site" after a blueprint exists
- User provides a design document or section list and wants it implemented
- User asks to "scaffold a new project" for a client website
- User wants to turn competitor research into a working website

## Prerequisites

| Requirement | Source |
|-------------|--------|
| `BLUEPRINT.md` | Output from `competitor-research-consulting` |
| Node.js + npm | Must be installed locally |
| `designing-ui-ux-pro-max` skill | For design system generation |

## Workflow

```markdown
- [ ] Review BLUEPRINT.md and extract section list
- [ ] Scaffold Vite + React + TS project (or confirm existing)
- [ ] Generate design system via `designing-ui-ux-pro-max`
- [ ] Create global styles (index.css) with design tokens
- [ ] Build sections top-to-bottom (Hero → Footer)
- [ ] Generate images with `generate_image` tool (no placeholders)
- [ ] Assemble App.tsx with all sections
- [ ] Local dev server smoke test
```

---

## Step 1: Project Scaffolding

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

Only add dependencies the blueprint requires. Keep it lean.

---

## Step 2: Design System Setup

**Invoke the `designing-ui-ux-pro-max` skill** to generate the design system.

Feed it the blueprint's Design Direction section:
- Color palette (primary, secondary, accent, backgrounds)
- Typography pairings (headings, body)
- Industry category

**Output:** A `design-system/MASTER.md` file with all tokens.

### Implement in `index.css`

Translate the design system into CSS custom properties:

```css
:root {
  /* Colors */
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

## Step 3: Build Sections

Work through the blueprint's section list **top-to-bottom**. For each section:

### Build Pattern
1. **Read the blueprint** — What does this section need?
2. **Reference competitors** — What patterns worked?
3. **Write the JSX** — Semantic HTML, proper heading hierarchy
4. **Style it** — Use CSS custom properties, no inline styles
5. **Generate assets** — Use `generate_image` for any visuals (hero backgrounds, service icons, team photos)

### Section Checklist (typical for service-industry sites)

| # | Section | Key Elements |
|---|---------|--------------|
| 1 | **Navigation** | Logo, links, CTA button, mobile hamburger |
| 2 | **Hero** | Headline, subhead, CTA, background image/video |
| 3 | **Trust Bar** | Badges, certifications, years in business |
| 4 | **Services** | Card grid with icons, titles, descriptions |
| 5 | **Why Choose Us** | Value props, differentiators |
| 6 | **Gallery/Portfolio** | Before/after, project photos |
| 7 | **Testimonials** | Reviews, star ratings, customer names |
| 8 | **Service Areas** | Map, location list |
| 9 | **CTA Banner** | Strong headline, phone + form |
| 10 | **Footer** | Links, contact info, social, legal |

### Image Generation Rules
- **Never use placeholder images** — always generate with `generate_image`
- Use descriptive prompts matching the industry: `"Professional roofer installing shingles on a residential home, sunny day, high quality photo"`
- Generate at appropriate sizes (hero: 1920×1080, cards: 600×400, icons: 256×256)
- Save to `public/images/` directory

---

## Step 4: Component Architecture

### Single-File Approach (for template sites)
For single-page template sites, build everything in `App.tsx` with clearly labeled section blocks:

```tsx
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      {/* ... */}
      <Footer />
    </>
  );
}
```

Each section can be a function component in the same file or extracted to `src/components/` as complexity grows.

### Multi-Page Approach
If the blueprint calls for multiple pages, use React Router:
```bash
npm install react-router-dom
```

---

## Step 5: Quality Checks Before Handoff

Before handing off to `polishing-website-quality`:

- [ ] All sections from blueprint are implemented
- [ ] No placeholder text ("Lorem ipsum") remains
- [ ] No broken image paths
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Basic responsive behavior works (flex/grid layouts)

---

## Design Principles

- **Mobile-first CSS** — Start with mobile layout, add `@media` for larger screens
- **Semantic HTML** — Use `<section>`, `<nav>`, `<main>`, `<footer>`, proper `<h1>`–`<h6>`
- **Performance** — Lazy load images below the fold, optimize font loading
- **Accessibility** — Alt text on images, proper contrast, keyboard navigation
- **No CSS frameworks** — Use vanilla CSS unless user explicitly requests Tailwind

## Related Skills

- **Input from:** `competitor-research-consulting` (provides BLUEPRINT.md)
- **Design system:** `designing-ui-ux-pro-max` (generates color/typography tokens)
- **Output to:** `polishing-website-quality` (next step in pipeline)
