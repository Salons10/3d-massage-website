---
name: competitor-research
description: >
  Scrapes and analyzes competitor websites to produce a structured Website Blueprint
  with section recommendations, layout patterns, and style direction. Features
  niche research caching and Firecrawl/read_url_content fallback chain.
  Use when starting a new website project or analyzing a niche's competitive landscape.
---

# Competitor Research

Analyze competitor websites to produce an actionable **Website Blueprint** — the input document that drives the build process.

**Pipeline position:** Runs AFTER `lead-generation` (which provides competitor URLs) and BEFORE `website-builder`.

## When to Use This Skill

- User asks to "research competitors" or "analyze competitor websites"
- User wants design recommendations or a website blueprint before building
- Telegram bot pipeline triggers website build (research phase)
- Starting a new niche — need to understand what's working

## Prerequisites

| Requirement | Source |
|-------------|--------|
| 3–10 competitor URLs | From `lead-generation` CSV or user-provided |
| Industry/niche + location | User-provided or from pipeline context |
| Firecrawl MCP or `read_url_content` | Available by default |

## Research Caching

**Before scraping anything**, check if research already exists:

```
Check: ~/dt-creative/niches/{niche}/research.md
  → If EXISTS and < 30 days old: load and reuse
  → If EXISTS and > 30 days old: refresh (re-scrape)
  → If MISSING: run full research pipeline
```

> **Why:** Once you research "roofing" competitors, every future roofing project reuses that research. Don't waste time or API calls re-scraping the same niche.

## Workflow

```markdown
- [ ] Check niche research cache
- [ ] If cache miss: gather competitor URLs (from leads CSV or user)
- [ ] Scrape each competitor (Firecrawl → read_url_content fallback)
- [ ] Analyze page structure, design patterns, content/SEO signals
- [ ] Generate BLUEPRINT.md artifact
- [ ] Cache research to ~/dt-creative/niches/{niche}/research.md
- [ ] Present executive summary to user
```

---

## Step 1: Gather Competitor URLs

**Source A — From Leads CSV** (if `lead-generation` was run):
- Extract `Website` column from enriched CSV
- Filter out Facebook/Yelp-only listings
- Pick **top 5–8 by Google Rating** (proxy for quality)

**Source B — Manual / web search:**
- Ask user for URLs, or supplement with `search_web`: "best [niche] in [city]"
- Target sites with high review counts (they're doing something right)

---

## Step 2: Scrape & Analyze Each Site

### Primary: Firecrawl MCP

Use Firecrawl to scrape each competitor URL. Extract full page content as markdown.

### 🔄 Fallback 1: `read_url_content`

If Firecrawl is rate-limited or unavailable:

```markdown
1. Use `read_url_content` tool on each URL
2. Parses HTML → markdown automatically
3. Less detailed than Firecrawl but functional
4. May miss JavaScript-rendered content
```

### 🔄 Fallback 2: `search_web`

If both Firecrawl and `read_url_content` fail for a URL:

```markdown
1. Use `search_web` for: "site:{competitor_url}"
2. Gets cached/indexed version of the page
3. Extract whatever structural info is available
4. Note in research: "limited data — scraped from search cache"
```

### What to Capture Per Competitor

**Page Structure:**
| Element | What to Look For |
|---------|-----------------|
| **Hero** | Headline style, CTA placement, background type, trust badges |
| **Nav** | Sticky vs static, CTA button in nav, mega menu vs simple |
| **Services** | Card vs list, icons vs images, count shown |
| **Social Proof** | Reviews widget, star ratings, testimonial format |
| **Contact/CTA** | Form vs phone vs chat, urgency language |
| **Footer** | Service areas, licenses, hours, social links |
| **Unique Features** | Calculator, gallery, before/after, blog, financing |

**Design Patterns:**
| Element | What to Capture |
|---------|----------------|
| **Colors** | Primary, secondary, accent (extract hex values) |
| **Typography** | Font families, heading weights |
| **Imagery** | Stock vs real, dark overlay vs light, aerial vs ground |
| **Layout** | Full-width vs contained, spacing, grid patterns |
| **Animations** | Scroll reveals, hover effects, parallax |

**Content/SEO:**
- H1 wording patterns
- CTA button text that converts in this industry
- Service area pages vs single page
- Schema markup in use

---

## Step 3: Generate the Website Blueprint

Produce a `BLUEPRINT.md` artifact:

```markdown
# Website Blueprint — [Industry] in [Location]

## Research Summary
- Sites analyzed: [count]
- Date: [date]
- Industry: [industry]
- Cached: yes/no (expires: [date])

## Recommended Sections (in order)
1. **Hero** — [recommendation + rationale]
2. **Trust Bar** — [recommendation]
3. **Services** — [recommendation]
... (8–12 sections typical)

## Design Direction
### Color Palette
- Primary: [hex] — [rationale]
- Secondary: [hex]
- Accent: [hex]
- Background: [hex]

### Typography
- Headings: [font] — [why]
- Body: [font]

### Imagery
- [Style recommendation]

## Features to Include
- [Feature] — seen on [X of Y] competitors, [rationale]

## Features to Skip
- [Feature] — [why not needed]

## Competitive Gaps (Opportunities)
- [Gap] — [how to exploit for our client]

## Expert Recommendations
- [Strategic advice based on patterns]
```

---

## Step 4: Cache the Research

Save to local filesystem AND optionally Supabase:

```
~/dt-creative/niches/{niche}/research.md  ← BLUEPRINT.md content
~/dt-creative/niches/{niche}/competitors/ ← individual site analyses (optional)
```

Next time this niche is used, research is loaded instantly — no re-scraping.

---

## Consulting Heuristics

Patterns from analyzing hundreds of service-industry websites:

- **Hero with real project photo** converts 2–3x better than stock
- **"Free Estimate" CTA** outperforms "Contact Us" in contractor niches
- **Google Reviews widget** showing 4.5+ stars significantly increases trust
- **Service area maps/lists** reduce bounce rate for local businesses
- **Before/after galleries** are highest-engagement for renovation industries
- **Financing callouts** reduce friction for high-ticket services ($5K+)
- **Mobile-first** is non-negotiable — 60–70% of local service traffic is mobile
- **Phone number in hero** converts best for urgent services (plumbing, HVAC)

## Output Files

| File | Description |
|------|------------|
| `BLUEPRINT.md` | Complete website blueprint (consumed by `website-builder`) |
| `~/dt-creative/niches/{niche}/research.md` | Cached research (reusable) |

## Related Skills

- **Input from:** `lead-generation` (provides competitor URLs from leads CSV)
- **Output to:** `website-builder` (consumes the BLUEPRINT.md)
- **Design system:** `ui-ux-pro-max` (used during build, informed by this blueprint)
