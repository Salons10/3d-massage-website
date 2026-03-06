---
name: lead-generation
description: >
  End-to-end lead generation pipeline with API fallback safety nets.
  Scrapes leads via Apify, enriches emails via AnyMailFinder (with Firecrawl
  and regex fallbacks), processes data, and inserts into Supabase.
  Use when the user wants to find leads, scrape businesses, enrich contacts,
  or generate a prospect list for a specific niche and location.
---

# Lead Generation

End-to-end lead pipeline: **Apify scrape → data processing → email enrichment (3-tier fallback) → Supabase insert → CSV export**.

**Pipeline position:** This is Step 1. Runs BEFORE `competitor-research`.

## When to Use This Skill

- User says "find leads", "scrape businesses", "get me leads for [niche] in [city]"
- User says "enrich emails" for an existing lead list
- Telegram bot pipeline receives a `/leads` command
- Full chain triggered: "scrape, build, deploy, and start emails"

## Prerequisites

| Requirement | How to Get |
|-------------|-----------|
| **Apify MCP** | Connected in Antigravity (API key in MCP config) |
| **AnyMailFinder API key** | User provides (stored in `.env`) |
| **Supabase MCP** | Connected in Antigravity (project URL + keys in `.env`) |
| **Node.js** | Required for processing scripts |

## Workflow

```markdown
- [ ] Gather inputs (niche, city, budget, max leads)
- [ ] Check Apify credit balance before scraping
- [ ] Run Apify Google Maps Extractor (or fallback)
- [ ] Process raw data with scripts/process_leads.js
- [ ] Enrich emails (3-tier fallback chain)
- [ ] Insert leads into Supabase "leads" table
- [ ] Export CSV to ~/dt-creative/niches/{niche}/leads.csv
- [ ] Report results to user (or Telegram bot)
```

---

## Step 1: Gather Inputs

Ask the user (or receive from Telegram bot) these values:

| Input | Required | Default |
|-------|----------|---------|
| Niche / industry | ✅ | — |
| City, State | ✅ | — |
| Budget (USD) | ❌ | $0.50 |
| Max leads | ❌ | 30 |
| AnyMailFinder API key | ✅ | From `.env` |

### Budget Formula

```
max_places = floor(budget / 0.005)
places_per_term = floor(max_places / (num_locations × num_search_terms))
```

### Search Terms

Use [resources/search_terms_by_industry.md](resources/search_terms_by_industry.md) for pre-built lists. Default: **3 terms per industry**.

---

## Step 2: Scrape Leads

### Primary: Apify MCP

```json
{
  "searchStringsArray": ["<term_1>", "<term_2>", "<term_3>"],
  "locationQuery": "<City>, <State>, USA",
  "maxCrawledPlacesPerSearch": <places_per_term>,
  "countryCode": "us",
  "language": "en",
  "skipClosedPlaces": true,
  "website": "allPlaces"
}
```

> ⚠️ **ALWAYS set budget cap**: Include `"maxCrawledPlacesPerSearch"` to prevent runaway costs.

### 🔄 Fallback 1: `search_web`

If Apify credits are exhausted or MCP unavailable:

```markdown
1. Use `search_web` for: "[niche] in [city] [state]"
2. Extract business names, websites, phone numbers from results
3. Repeat with variations: "best [niche] near [city]", "[niche] companies [city]"
4. Manual compilation into CSV format
5. Notify user: "⚠️ Apify unavailable — used web search. Results may be less complete."
```

### 🔄 Fallback 2: User-Provided List

If both Apify and search fail:
```markdown
1. Ask user: "Apify and web search are unavailable. Can you provide a list of businesses?"
2. Accept: CSV upload, pasted list, or Google Maps URLs
3. Process whatever format into standard CSV columns
```

---

## Step 3: Process Raw Data

Run the processing script:

```bash
node <skill_path>/scripts/process_leads.js \
  --input <raw_data.json> \
  --output <output.csv> \
  --industry "<industry_keywords>" \
  --area "<city>"
```

**What it does:**
- Filters to businesses matching the industry category
- Deduplicates by phone number
- Normalizes phone numbers and addresses
- Outputs clean CSV: `Business Name, Phone, Website, Address, City, State, Zip, Category, Google Rating, Area`

---

## Step 4: Enrich with Emails (3-Tier Fallback)

### Tier 1: AnyMailFinder API (Primary)

```bash
node <skill_path>/scripts/enrich_emails.js \
  --input <leads.csv> \
  --output <leads_enriched.csv> \
  --api-key <ANYMAILFINDER_API_KEY>
```

**Flags:** `--delay 1500` (rate limit), `--skip-domains facebook.com,yelp.com,google.com`

**If AnyMailFinder returns errors or credits exhausted → fall to Tier 2:**

### Tier 2: Firecrawl Contact Page Scraping 🔄

For each lead that failed Tier 1:

```markdown
1. Use Firecrawl MCP to scrape: {lead.website}/contact, {lead.website}/about
2. Extract emails using regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
3. Filter out generic emails (noreply@, info@, support@) — keep owner/personal emails
4. If Firecrawl fails → fall to Tier 3
```

### Tier 3: `read_url_content` Regex Extraction 🔄

For leads that failed both Tier 1 and Tier 2:

```markdown
1. Use `read_url_content` tool on: {lead.website}
2. Search returned markdown for email patterns
3. Also try: {lead.website}/contact-us, {lead.website}/about-us
4. Extract and validate emails
5. If nothing found → mark as "no_email" — still usable for phone outreach
```

### Fallback Summary

```
AnyMailFinder API → works? → done ✅
    ↓ fails
Firecrawl scrape /contact → found email? → done ✅
    ↓ fails
read_url_content regex → found email? → done ✅
    ↓ fails
Mark as "no_email" — still a valid lead for phone/manual outreach
```

---

## Step 5: Insert into Supabase

After enrichment, insert all leads into the Supabase `leads` table:

```sql
INSERT INTO leads (business_name, email, phone, website, address, city, niche, google_reviews, source)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ON CONFLICT (email) DO NOTHING;
```

**Fields mapped:**
| CSV Column | Supabase Column |
|-----------|----------------|
| Business Name | `business_name` |
| Email | `email` |
| Phone | `phone` |
| Website | `website` |
| Address | `address` |
| City | `city` |
| Category → niche keyword | `niche` |
| Google Rating | `google_reviews` |
| — | `source` = "apify" or "search_web" or "manual" |

---

## Step 6: Export & Report

Save enriched CSV to:
```
~/dt-creative/niches/{niche}/leads_{city}_{date}.csv
```

Generate summary:

```
📊 Lead Generation Report
━━━━━━━━━━━━━━━━━━━━━━━━
Niche: {niche}
Location: {city}, {state}
Total scraped: {count}
Emails found: {email_count} ({percent}%)
  - via AnyMailFinder: {tier1}
  - via Firecrawl: {tier2}
  - via regex: {tier3}
No email: {no_email}
Apify cost: ${cost}
Saved to Supabase: ✅ {count} rows

📄 CSV: ~/dt-creative/niches/{niche}/leads_{city}.csv
```

---

## Cost Estimation

| Places | Apify Cost | AnyMailFinder | Total |
|--------|-----------|---------------|-------|
| 30 | $0.15 | Per-query | ~$0.50-$2.00 |
| 50 | $0.25 | Per-query | ~$1.00-$3.00 |
| 100 | $0.50 | Per-query | ~$2.00-$5.00 |

> **Cost-saving tip:** If AnyMailFinder credits are low, set `--tier1-only false` to skip it and go straight to free Firecrawl/regex extraction. Less accurate but $0 cost.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Apify returns 0 results | Broader search terms; verify location spelling |
| AnyMailFinder credit exhausted | Falls to Tier 2 (Firecrawl) automatically |
| Firecrawl rate limited | Falls to Tier 3 (`read_url_content`) automatically |
| Duplicate leads in Supabase | `ON CONFLICT (email) DO NOTHING` prevents duplicates |
| Budget exceeded | Always set `maxCrawledPlacesPerSearch`; check balance first |
| Non-industry results | Process script filters by `categoryName`; add keywords to `--industry` |

## Resources

- [scripts/enrich_emails.js](scripts/enrich_emails.js) — Email enrichment with fallback chain
- [scripts/process_leads.js](scripts/process_leads.js) — Raw data processor with Supabase output
- [resources/search_terms_by_industry.md](resources/search_terms_by_industry.md) — Industry search terms
- [examples/roofers_katy_houston.md](examples/roofers_katy_houston.md) — Worked example
