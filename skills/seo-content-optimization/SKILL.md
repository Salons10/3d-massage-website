---
name: seo-content-optimization
description: >
  Optimizes all website text, meta tags, headings, and copy for SEO and conversions.
  Covers keyword strategy, content rewriting, schema.org markup, and local SEO.
  Use when the user asks for SEO content, keyword optimization, or wants to improve
  their site's search rankings. Complements the structural seo-audit-gate skill.
---

# SEO Content Optimization

Optimize every word on the website for **search engine rankings and conversions**. This skill handles the *content* side of SEO — keyword strategy, copywriting, meta tags, and structured data.

**Pipeline position:** Runs AFTER `polishing-website-quality` and BEFORE `deploying-to-github-vercel`.

> **How this differs from `seo-audit-gate`:** The `seo-audit-gate` skill checks *structural* SEO (heading hierarchy, alt tags, meta tag existence). This skill handles *content* SEO (what the words actually say, keyword targeting, conversion copy). Run this skill first, then `seo-audit-gate` for final structural validation.

## When to Use This Skill

- User asks for "SEO optimization" or "keyword optimization"
- User wants to "improve search rankings" or "show up on Google"
- Website copy uses generic text that doesn't target specific keywords
- User asks about local SEO, Google Business, or search visibility
- User says "optimize the text" or "make the wording better for SEO"

## Prerequisites

| Requirement | Source |
|-------------|--------|
| Working website | Output from `building-website-from-blueprint` + `polishing-website-quality` |
| Industry + location | From blueprint or user-provided |
| Target audience | User-provided or inferred from industry |

## Workflow

```markdown
- [ ] Define target keywords (primary, secondary, long-tail)
- [ ] Optimize page title and meta description
- [ ] Rewrite H1 and section headings for keyword targeting
- [ ] Optimize body copy, CTAs, and service descriptions
- [ ] Add schema.org structured data
- [ ] Implement local SEO signals
- [ ] Run seo-audit-gate for final structural validation
```

---

## Step 1: Keyword Research

For each page, define:

| Type | Example (Roofing, Katy TX) | Usage |
|------|---------------------------|-------|
| **Primary keyword** | "roofing contractor Katy TX" | Title tag, H1, first paragraph |
| **Secondary keywords** | "roof repair Katy", "shingle replacement" | H2s, body copy |
| **Long-tail keywords** | "emergency roof repair Katy Texas", "best roofer near me" | FAQ section, blog topics |
| **Local modifiers** | "Katy", "Houston", "Fort Bend County" | Service area section, footer |

### Research Methods
- Use `search_web` to check what competitors rank for
- Analyze the blueprint's competitor data for keyword patterns
- Focus on **service + location** combinations for local businesses

---

## Step 2: Meta Tag Optimization

### Title Tag (50–60 characters)
```
Pattern: [Primary Service] in [City] | [Business Name]
Example: Expert Roofing Contractor in Katy, TX | ABC Roofing
```

### Meta Description (150–160 characters)
```
Pattern: [Value prop]. [Service details]. [CTA]. [Trust signal].
Example: Top-rated roofing contractor in Katy, TX. Residential & commercial 
roof repair, replacement & installation. Free estimates. 5-star rated.
```

### Implementation
Update `index.html`:
```html
<title>Expert Roofing Contractor in Katy, TX | ABC Roofing</title>
<meta name="description" content="Top-rated roofing..." />
<meta name="keywords" content="roofing contractor Katy TX, roof repair..." />
<link rel="canonical" href="https://domain.com/" />
```

---

## Step 3: Content Optimization

### Headings
| Element | SEO Rule | Example |
|---------|----------|---------|
| **H1** | Include primary keyword, one per page | "Katy's Most Trusted Roofing Contractor" |
| **H2** | Include secondary keywords | "Residential Roof Repair Services" |
| **H3** | Support long-tail keywords | "Emergency Storm Damage Repair in Katy" |

### Body Copy Rules
- **First 100 words** must include the primary keyword naturally
- Use **keyword variations** (don't repeat the same phrase)
- Write for humans first, search engines second
- Include **location names** 3–5 times across the page (naturally)
- CTAs should use **action + benefit**: "Get Your Free Roof Inspection" > "Contact Us"

### Service Descriptions
Each service card should include:
- Service name with keyword
- 2–3 sentences describing the service
- Location mention where natural
- Benefit-focused language (not feature-focused)

---

## Step 4: Schema.org Structured Data

Add JSON-LD to `index.html` `<head>`:

### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Business Name",
  "image": "https://domain.com/images/logo.png",
  "telephone": "+1-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Katy",
    "addressRegion": "TX",
    "postalCode": "77449"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "29.7858", "longitude": "-95.8245" },
  "areaServed": ["Katy", "Houston", "Sugar Land"],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
}
```

### Service Schema
Add for each major service offered.

### FAQ Schema
If the site has an FAQ section, wrap it in FAQ schema for rich results.

---

## Step 5: Local SEO Signals

- [ ] **NAP consistency** — Name, Address, Phone identical across site
- [ ] **Service area page/section** — List all cities/neighborhoods served
- [ ] **Google Maps embed** — In contact or service area section
- [ ] **Local phone number** — Prominently displayed (not just a form)
- [ ] **City-specific content** — Mention local landmarks, neighborhoods, area names

---

## Step 6: Final Validation

After all content changes, run the `seo-audit-gate` skill to validate:
- Title tag length (50–60 chars)
- Meta description length (150–160 chars)
- Single H1 per page
- All images have alt text with keywords
- No broken links

## Related Skills

- **Input from:** `polishing-website-quality` (polished website ready for SEO)
- **Structural validation:** `seo-audit-gate` (run after this skill for final check)
- **Output to:** `deploying-to-github-vercel` (next step in pipeline)
