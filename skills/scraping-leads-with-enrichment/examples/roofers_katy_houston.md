# Worked Example: Roofers in Katy & Houston, TX

This documents the exact steps, configs, costs, and results from a real lead generation
run for roofing contractors.

## Inputs

| Setting | Value |
|---------|-------|
| Industry | Roofing contractors |
| Locations | Katy TX, Houston TX |
| Budget | $0.60 |
| Search terms | `roofing contractor`, `roofer`, `roof repair` |
| Max places/term | 20 (Katy), 25 (Houston) |

## Step 1: Apify Scrape

### Katy Run

```json
{
  "searchStringsArray": ["roofing contractor", "roofer", "roof repair"],
  "locationQuery": "Katy, Texas, USA",
  "maxCrawledPlacesPerSearch": 20,
  "countryCode": "us",
  "language": "en",
  "state": "Texas",
  "skipClosedPlaces": true,
  "website": "allPlaces"
}
```

- **Results:** 43 raw places
- **Cost:** ~$0.22

### Houston Run

Same config but `locationQuery: "Houston, Texas, USA"` and `maxCrawledPlacesPerSearch: 25`.

- **Results:** 75 raw places
- **Cost:** ~$0.38

**Total scraping cost: ~$0.59**

## Step 2: Data Processing

After filtering to roofing-related categories and removing non-roofing businesses
(plumbers, painters, RV shops, etc.):

| Area | Raw | After Filter |
|------|-----|-------------|
| Katy | 43 | 25 |
| Houston | 75 | 64 |
| **Total** | **118** | **89** |

## Step 3: Email Enrichment

AnyMailFinder API results:

| Area | Leads | With Emails | Hit Rate | Total Emails |
|------|-------|------------|----------|-------------|
| Katy | 25 | 15 | 60% | 70 |
| Houston | 64 | 41 | 64% | 154 |
| **Total** | **89** | **56** | **63%** | **224** |

### Top Leads by Email Count

| Contractor | Area | Emails |
|-----------|------|--------|
| Brandt Roofing | Katy | 20 |
| ProRoofing | Houston | 19 |
| Priority Roofing | Houston | 18 |
| Cool Roofs - Houston | Houston | 15 |
| FSR Services | Houston | 15 |
| Remedy Roofing | Katy | 14 |

## Output Files

- `roofing_contractors_katy_houston_tx.csv` — Pre-enrichment CSV (89 leads)
- `roofing_contractors_enriched.csv` — Enriched CSV with email columns (89 leads, 224 emails)

## Key Learnings

1. **3 search terms per location** gives good coverage without excessive duplication
2. **~63% email hit rate** is typical for local contractors
3. **Larger companies** (Brandt, ProRoofing, Priority) return more emails
4. **Non-industry results** are common — always filter by `categoryName`
5. **Budget formula works:** 118 places at $0.005 = $0.59, right under $0.60 cap
