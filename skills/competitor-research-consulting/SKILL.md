---
name: competitor-research-consulting
description: >
  Scrapes and analyzes competitor websites to produce a structured "Website Blueprint"
  with section recommendations, layout patterns, style direction, and expert-level
  web design consulting. Use when the user wants competitor analysis, website strategy,
  design recommendations, or a blueprint before building a new site.
---

# Competitor Research & Web Design Consulting

Analyze competitor websites to produce an actionable **Website Blueprint** — the single input document that drives the entire build process.

**Pipeline position:** This skill runs AFTER `scraping-leads-with-enrichment` (which provides competitor URLs from Google Maps data) and BEFORE `building-website-from-blueprint`.

## When to Use This Skill

- User asks to "research competitors" or "analyze competitor websites"
- User wants design recommendations before building a site
- User needs a "website blueprint" or "website strategy"
- User mentions "what sections should my site have" or "what features do competitors use"
- Starting a new website project from scratch (this is always Step 2 in the pipeline)

## Prerequisites

| Requirement | Source |
|-------------|--------|
| 3–10 competitor URLs | From `scraping-leads-with-enrichment` output CSV or user-provided |
| Industry/niche context | User-provided (e.g., "roofing contractor in Katy, TX") |
| Firecrawl MCP or `read_url_content` | Available by default |

## Workflow

```markdown
- [ ] Gather competitor URLs (from leads CSV or user input)
- [ ] Scrape each competitor site (Firecrawl or read_url_content)
- [ ] Analyze page structure and content patterns
- [ ] Identify common sections, features, and design patterns
- [ ] Generate style recommendations (colors, typography, imagery)
- [ ] Produce the BLUEPRINT.md artifact
- [ ] Present findings with expert consulting recommendations
```

---

## Step 1: Gather Competitor URLs

**Source A — From Leads CSV** (if `scraping-leads-with-enrichment` was run):
- Open the enriched CSV and extract the `Website` column
- Filter to businesses with actual websites (skip Facebook/Yelp-only listings)
- Pick the **top 5–8 sites** by Google Rating

**Source B — Manual collection:**
- Ask the user for 3–10 competitor URLs
- Supplement with a web search: `"best <industry> in <city>"` to find top-ranking sites

---

## Step 2: Scrape & Analyze Each Site

For each competitor URL, capture:

### Page Structure Analysis
| Element | What to Look For |
|---------|-----------------|
| **Hero Section** | Headline style, CTA placement, background (image/video/gradient), trust badges |
| **Navigation** | Sticky vs static, mega menu vs simple, CTA button in nav |
| **Services/Features** | Card layout vs list, icons vs images, how many shown |
| **Social Proof** | Testimonials, Google reviews widget, star ratings, case studies |
| **About/Team** | Photo style, story format, certifications highlighted |
| **Contact/CTA** | Form vs phone vs chat, urgency language, scheduling tools |
| **Footer** | Service areas, licenses, hours, social links |
| **Unique Features** | Financing calculator, project gallery, before/after slider, blog |

### Design Pattern Analysis
| Element | What to Capture |
|---------|----------------|
| **Color Palette** | Primary, secondary, accent colors (extract hex values) |
| **Typography** | Font families, heading sizes, weight usage |
| **Imagery Style** | Stock vs real photos, dark overlay vs light, aerial vs ground |
| **Layout** | Full-width vs contained, section spacing, grid patterns |
| **Animations** | Scroll reveals, hover effects, parallax, video backgrounds |

### Content & SEO Signals
- H1 wording patterns
- CTA button text (what converts in this industry)
- Service area pages vs single page
- Blog presence and content types
- Schema markup in use

---

## Step 3: Generate the Website Blueprint

Produce a `BLUEPRINT.md` artifact with this structure:

```markdown
# Website Blueprint — [Industry] in [Location]

## Research Summary
- Sites analyzed: [count]
- Date: [date]
- Industry: [industry]

## Recommended Sections (in order)
1. **Hero** — [recommendation with rationale]
2. **Services** — [recommendation]
3. ... (8–12 sections typical)

## Design Direction
### Color Palette
- Primary: [hex] — [rationale]
- Secondary: [hex]
- Accent: [hex]
- Background: [hex]

### Typography
- Headings: [font recommendation] — [why]
- Body: [font recommendation]
- Accent: [font if applicable]

### Imagery Direction
- [Style recommendation with examples]

## Features to Include
- [Feature 1] — seen on [X of Y] competitors, [rationale]
- [Feature 2] — ...

## Features to Skip
- [Feature] — [why it doesn't apply]

## Competitive Gaps (Opportunities)
- [Gap 1] — [how to exploit it]

## Expert Recommendations
- [Strategic advice based on analysis]
```

---

## Step 4: Expert Consulting Output

After generating the blueprint, provide the user with:

1. **Executive Summary** — 3–5 sentence overview of the competitive landscape
2. **Top 3 Opportunities** — Features/approaches competitors are missing
3. **Design Direction Rationale** — Why the recommended style will outperform competitors
4. **Priority Features** — Rank features by impact vs effort
5. **Content Strategy** — What messaging angles resonate in this industry

---

## Consulting Heuristics

These patterns are derived from analyzing hundreds of service-industry websites:

- **Hero sections** with real project photos convert 2–3x better than stock imagery
- **"Free Estimate" CTA** outperforms "Contact Us" in contractor industries
- **Google Reviews widgets** showing 4.5+ stars significantly increase trust
- **Service area maps** reduce bounce rate for location-specific businesses
- **Before/after galleries** are the highest-engagement section for renovation industries
- **Financing options** prominently displayed reduce friction for high-ticket services
- **Mobile-first** is non-negotiable — 60–70% of local service traffic is mobile

---

## Output Files

| File | Description |
|------|------------|
| `BLUEPRINT.md` | The complete website blueprint (consumed by `building-website-from-blueprint`) |
| Competitor analysis notes | Inline in the blueprint under Research Summary |

## Related Skills

- **Input from:** `scraping-leads-with-enrichment` (provides competitor URLs)
- **Output to:** `building-website-from-blueprint` (consumes the BLUEPRINT.md)
- **Design system:** `designing-ui-ux-pro-max` (used during the build phase, informed by this blueprint)
