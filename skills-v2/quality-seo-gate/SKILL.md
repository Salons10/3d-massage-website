---
name: quality-seo-gate
description: >
  Unified quality pass combining UI/UX polish, content SEO optimization, and
  structural SEO validation into a single skill. Audits design quality, rewrites
  copy for keywords, adds schema markup, and validates everything before deployment.
  Must pass all Critical checks before deploying.
  Use when polishing, auditing, SEO-optimizing, or preparing a site for deployment.
---

# Quality & SEO Gate

**One pass, three phases.** This skill replaces the old 3-step process (`polishing-website-quality` → `seo-content-optimization` → `seo-audit-gate`) with a single unified gate.

**Pipeline position:** Runs AFTER `website-builder` and BEFORE `deploy-and-preview`.

## When to Use This Skill

- Website build is complete — needs QA before deployment
- User says "polish", "audit", "optimize for SEO", or "make it production-ready"
- Telegram bot pipeline enters quality check phase
- User reports design bugs, mobile issues, or SEO concerns

## Prerequisites

| Requirement | Source |
|-------------|--------|
| Working website | Output from `website-builder` |
| Industry + location | From blueprint, site-config, or user |
| Dev server running | `npm run dev` at `localhost:5173` |

## Workflow

```markdown
PHASE 1: UI/UX POLISH
- [ ] Visual audit at 4 breakpoints (375, 768, 1024, 1440px)
- [ ] Catalog issues by priority (Critical / High / Low)
- [ ] Fix Critical issues (layout breaks, overflow, invisible content)
- [ ] Fix High issues (spacing, alignment, contrast, images)
- [ ] Polish interactions (hover states, transitions, mobile menu)

PHASE 2: CONTENT SEO
- [ ] Define target keywords (primary, secondary, long-tail, local)
- [ ] Optimize title tag and meta description
- [ ] Rewrite headings for keyword targeting
- [ ] Optimize body copy and CTAs
- [ ] Add schema.org structured data (LocalBusiness + FAQ)
- [ ] Implement local SEO signals (NAP, service areas, map)

PHASE 3: STRUCTURAL SEO GATE
- [ ] Title tag: 50-60 chars, includes primary keyword
- [ ] Meta description: 150-160 chars
- [ ] Single H1 per page with primary keyword
- [ ] Sequential heading order (H1 → H2 → H3)
- [ ] All images have descriptive alt text
- [ ] All internal links valid
- [ ] External links use rel="noopener noreferrer"
- [ ] No blocking scripts hurting Core Web Vitals
- [ ] npm run build succeeds without errors

FINAL: Generate QUALITY_REPORT.md
```

---

## Phase 1: UI/UX Polish

### Visual Audit

Use the browser tool to screenshot at each breakpoint:

| Breakpoint | Device | Priority Checks |
|------------|--------|----------------|
| **375px** | Mobile | Hamburger menu, text overflow, touch targets (44px min) |
| **768px** | Tablet | Grid collapse, image sizing, nav behavior |
| **1024px** | Small Desktop | Content width, hover states visible |
| **1440px** | Full Desktop | Max-width containers, hero proportions |

### Issue Priority

| Level | Definition | Examples |
|-------|-----------|---------|
| **Critical** | Blocks deployment | Invisible content, horizontal overflow, broken nav, JS errors |
| **High** | Noticeable quality issue | Bad spacing, missing hover states, contrast failures, unoptimized images |
| **Low** | Polish item | Sub-pixel alignment, animation timing, micro-copy |

### Fix Order
1. **All Critical** — must be fixed before continuing
2. **All High** — fix before deployment
3. **Low** — fix if time allows, won't block deployment

### Image Optimization
```markdown
- [ ] Compress all images (content: <200KB, hero: <500KB)
- [ ] Add loading="lazy" to below-fold images
- [ ] Set explicit width/height or aspect-ratio (prevent layout shift)
- [ ] No remaining placeholders — use generate_image if missing
```

### Interaction Polish
- **Hover states**: Every clickable element needs visible feedback
- **Transitions**: `transition: all 250ms ease` on interactive elements
- **Mobile menu**: Smooth animation, overlay, scroll lock
- **Focus states**: Visible outline for keyboard navigation

---

## Phase 2: Content SEO

### Keyword Strategy

For each page, define:

| Type | Example (Roofing, Katy TX) | Usage |
|------|---------------------------|-------|
| **Primary** | "roofing contractor Katy TX" | Title, H1, first paragraph |
| **Secondary** | "roof repair Katy", "shingle replacement" | H2s, body copy |
| **Long-tail** | "emergency roof repair Katy Texas" | FAQ section |
| **Local modifiers** | "Katy", "Houston", "Fort Bend County" | Service area, footer |

### Meta Tag Optimization

**Title (50-60 chars):**
```
[Primary Service] in [City] | [Business Name]
→ Expert Roofing Contractor in Katy, TX | ABC Roofing
```

**Meta Description (150-160 chars):**
```
[Value prop]. [Services]. [CTA]. [Trust signal].
→ Top-rated roofing in Katy, TX. Residential & commercial roof repair & replacement. Free estimates. 5-star rated.
```

### Heading Optimization

| Element | Rule | Example |
|---------|------|---------|
| **H1** | Primary keyword, ONE per page | "Katy's Most Trusted Roofing Contractor" |
| **H2** | Secondary keywords | "Residential Roof Repair Services" |
| **H3** | Long-tail keywords | "Emergency Storm Damage Repair in Katy" |

### Body Copy Rules
- First 100 words include primary keyword naturally
- Location names appear 3-5x across the page
- CTAs use action + benefit: "Get Your Free Roof Inspection" > "Contact Us"
- Service descriptions are benefit-focused, not feature-focused

### Schema.org Structured Data

Add JSON-LD to `index.html` `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "[IndustryType]",
  "name": "[Business Name]",
  "image": "[logo URL]",
  "telephone": "[phone]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[State]"
  },
  "areaServed": ["[City1]", "[City2]"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[rating]",
    "reviewCount": "[count]"
  }
}
```

Also add FAQ Schema if FAQ section exists.

### Local SEO Signals
- [ ] **NAP consistency** — Name, Address, Phone identical sitewide
- [ ] **Service area section** — List all cities/neighborhoods
- [ ] **Google Maps embed** — In contact or service area section
- [ ] **Local phone number** — Visible prominently (not just form)
- [ ] **City-specific content** — Mention neighborhoods, landmarks

---

## Phase 3: Structural SEO Gate

### Must-Pass Checks

| # | Check | Pass Criteria |
|---|-------|--------------|
| 1 | Title tag | 50-60 chars, includes primary keyword |
| 2 | Meta description | 150-160 chars, compelling, includes keyword |
| 3 | H1 count | Exactly 1 per page |
| 4 | Heading hierarchy | Sequential (H1 → H2 → H3, no skips) |
| 5 | Image alt text | All `<img>` have descriptive alt attributes |
| 6 | Internal links | All valid, no 404s |
| 7 | External links | All use `rel="noopener noreferrer"` |
| 8 | Performance | No heavy blocking scripts |
| 9 | Build | `npm run build` succeeds without errors |
| 10 | Console | No errors in browser console |
| 11 | Canonical URL | `<link rel="canonical">` present |

### Gate Decision

```
All Critical UI issues fixed?     → YES → Continue
All Structural SEO checks pass?   → YES → Continue
Build succeeds?                   → YES → ✅ GATE PASSED → Ready for deploy-and-preview

Any Critical unfixed?             → ❌ GATE FAILED → Fix and re-check
Build fails?                      → ❌ GATE FAILED → Fix build errors
```

---

## Output: QUALITY_REPORT.md

```markdown
# Quality Report — [Business Name]

## Gate Status: ✅ PASSED / ❌ FAILED

## UI/UX Audit
- Critical issues: [count] (all fixed ✅)
- High issues: [count] (all fixed ✅)
- Low issues: [count] ([fixed] fixed, [remaining] deferred)

## Content SEO
- Primary keyword: [keyword]
- Title tag: [title] ([chars] chars) ✅
- Meta description: [desc] ([chars] chars) ✅
- Schema markup: LocalBusiness + FAQ ✅
- Local SEO signals: [count]/5 ✅

## Structural SEO
- H1 count: 1 ✅
- Heading hierarchy: sequential ✅
- Image alt text: [count]/[total] ✅
- Links validated: ✅
- Build succeeds: ✅

## Ready for deployment: YES / NO
```

---

## Common Bugs & Fixes

| Bug | Cause | Fix |
|-----|-------|-----|
| Horizontal scroll mobile | Element wider than viewport | `overflow-x: hidden`, find offending element |
| Text over image unreadable | No overlay | `background: linear-gradient(rgba(0,0,0,0.5), ...)` |
| Layout shift on load | Images without dimensions | Set `width`/`height` or `aspect-ratio` |
| Button text wrapping | Fixed width | Use `padding` + `min-width` instead |
| Z-index wars | Competing stacking contexts | Audit values, use scale (10, 20, 30) |

## Related Skills

- **Input from:** `website-builder` (the built website)
- **Design compliance:** `ui-ux-pro-max` (verify against design system)
- **Output to:** `deploy-and-preview` (next step — screenshot + deploy)
