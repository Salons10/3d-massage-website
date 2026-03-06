---
name: scraping-leads-with-enrichment
description: >
  Scrapes local business leads from Google Maps via Apify and enriches them with
  email addresses via AnyMailFinder. Use when the user asks to find leads, scrape
  contractors, generate a prospect list, enrich contacts with emails, or build a
  CSV of local businesses in a specific area.
---

# Scraping Leads with Email Enrichment

End-to-end lead generation pipeline: **Google Maps scraping → data cleaning → email enrichment → CSV export**.

## When to Use This Skill

- User asks to "find leads" or "scrape businesses" in a specific area
- User asks to "enrich" an existing CSV with email addresses
- User mentions "AnyMailFinder", "Apify", "Google Maps scraper", or "lead generation"
- User wants a list of contractors, service providers, or local businesses

## Prerequisites

| Requirement | How to Get |
|-------------|-----------|
| **Apify API key** | Must be configured in MCP server (`APIFY_TOKEN` env var) |
| **AnyMailFinder API key** | User must provide; passed via `--api-key` flag |
| **Node.js** | Required to run the enrichment script |

## Workflow

Copy this checklist and update it as you go:

```markdown
- [ ] Gather inputs (industry, location, budget, API keys)
- [ ] Calculate max leads from budget ($0.005/place)
- [ ] Run Apify Google Maps Extractor (`compass/google-maps-extractor`)
- [ ] Process raw data with `scripts/process_leads.js`
- [ ] Run email enrichment with `scripts/enrich_emails.js`
- [ ] Generate summary report
```

---

## Step 1: Gather Inputs

Ask the user for these values (skip any they've already provided):

| Input | Required | Default |
|-------|----------|---------|
| Industry / business type | ✅ | — |
| Location(s) (city, state) | ✅ | — |
| Budget (USD) | ✅ | $1.00 |
| AnyMailFinder API key | ✅ | — |
| Max leads per search term | ❌ | 20 |

### Budget Formula

```
max_places = floor(budget / 0.005)
places_per_term = floor(max_places / (num_locations × num_search_terms))
```

### Search Terms

Refer to [resources/search_terms_by_industry.md](resources/search_terms_by_industry.md) for pre-built
search term lists. Use **3 terms per industry** for best coverage within budget.

---

## Step 2: Run Apify Google Maps Extractor

Use the Apify MCP tool `call-actor` with actor `compass/google-maps-extractor`.

**Input template:**

```json
{
  "searchStringsArray": ["<term_1>", "<term_2>", "<term_3>"],
  "locationQuery": "<City>, <State>, USA",
  "maxCrawledPlacesPerSearch": <places_per_term>,
  "countryCode": "us",
  "language": "en",
  "state": "<State>",
  "skipClosedPlaces": true,
  "website": "allPlaces"
}
```

**Run one scrape per location.** Wait for each to complete (`async: false`).

Save the `datasetId` from each run — you'll need it for Step 3.

---

## Step 3: Process Raw Data

Run the processing script to clean, filter, and deduplicate the raw Apify output:

```bash
node <skill_path>/scripts/process_leads.js \
  --input <raw_data.json> \
  --output <output.csv> \
  --industry "<industry_keywords>" \
  --area "<area_label>"
```

**What the script does:**
- Filters to businesses matching the industry category
- Removes duplicates by phone number
- Normalizes phone numbers and addresses
- Outputs a clean CSV with columns: `Business Name, Phone, Website, Address, City, State, Zip, Category, Google Rating, Area`

> **If you don't have a raw JSON file**, you can build the CSV manually from the Apify
> `call-actor` response preview or `get-actor-output` data. Use the same column format.

---

## Step 4: Enrich with Emails

Run the enrichment script against the CSV:

```bash
node <skill_path>/scripts/enrich_emails.js \
  --input <leads.csv> \
  --output <leads_enriched.csv> \
  --api-key <ANYMAILFINDER_API_KEY>
```

**Flags:**

| Flag | Description | Default |
|------|-------------|---------|
| `--input` | Path to input CSV | *required* |
| `--output` | Path to output CSV | `<input>_enriched.csv` |
| `--api-key` | AnyMailFinder API key | *required* |
| `--website-col` | Column name for website URLs | `Website` |
| `--delay` | Ms between API calls (rate limit) | `1500` |
| `--skip-domains` | Comma-separated domains to skip | `facebook.com,yelp.com,google.com` |

**Output:** Adds two columns to the CSV: `Email` and `Email Source`.

---

## Step 5: Generate Report

After enrichment, produce a summary with:

1. **Scraping stats** — leads per location, cost, search terms used
2. **Enrichment stats** — emails found / not found / no website / errors, per area
3. **Top leads** — businesses with the most email addresses found
4. **Output file locations** — links to the CSV files

---

## Cost Estimation Reference

| Places | Apify Cost | AnyMailFinder |
|--------|-----------|---------------|
| 50 | $0.25 | Per-query pricing |
| 100 | $0.50 | Per-query pricing |
| 120 | $0.60 | Per-query pricing |
| 200 | $1.00 | Per-query pricing |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Apify returns 0 results | Try broader search terms; check location spelling |
| AnyMailFinder returns `not_found` | Normal — many small businesses don't have discoverable emails |
| Duplicate businesses across locations | The process script deduplicates by phone; run it on the merged CSV |
| Rate limit errors from AnyMailFinder | Increase `--delay` to `3000` or higher |
| Apify budget exceeded | Reduce `maxCrawledPlacesPerSearch` or split into smaller runs |
| Non-industry results (plumbers in roofing search) | The process script filters by `categoryName`; add keywords to `--industry` |

## Resources

- [scripts/enrich_emails.js](scripts/enrich_emails.js) — Email enrichment CLI tool
- [scripts/process_leads.js](scripts/process_leads.js) — Raw data processor
- [examples/roofers_katy_houston.md](examples/roofers_katy_houston.md) — Worked example
- [resources/search_terms_by_industry.md](resources/search_terms_by_industry.md) — Industry search terms
