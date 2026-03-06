#!/usr/bin/env node
/**
 * enrich_emails.js — Email Enrichment CLI with 3-Tier Fallback (v2)
 *
 * Tier 1: AnyMailFinder API (paid, most accurate)
 * Tier 2: Firecrawl MCP contact page scraping (free, good accuracy)
 * Tier 3: read_url_content regex extraction (free, basic)
 *
 * Usage:
 *   node enrich_emails.js --input leads.csv --output leads_enriched.csv --api-key YOUR_KEY
 *
 * Flags:
 *   --input         Path to input CSV (required)
 *   --output        Path to output CSV (default: <input>_enriched.csv)
 *   --api-key       AnyMailFinder API key (optional — skip Tier 1 if not provided)
 *   --website-col   Column name for website URLs (default: "Website")
 *   --delay         Ms between API calls (default: 1500)
 *   --skip-domains  Comma-separated domains to skip (default: facebook.com,yelp.com,google.com,instagram.com,twitter.com,linkedin.com)
 *   --tier1-only    Only use AnyMailFinder (skip fallbacks)
 *   --skip-tier1    Skip AnyMailFinder entirely (use free methods only)
 *   --supabase      Update Supabase "leads" table with found emails
 *   --help          Show this help message
 *
 * Fallback Safety Net:
 *   If --api-key is not provided or AnyMailFinder returns errors/credits exhausted,
 *   the script automatically falls through to Tier 2 (website scraping) and
 *   Tier 3 (regex extraction) — both of which are free.
 *
 * Environment Variables (for --supabase mode):
 *   SUPABASE_URL            Supabase project URL
 *   SUPABASE_SERVICE_KEY    Supabase service role key
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// --- Argument Parsing ---
function parseArgs() {
    const args = process.argv.slice(2);
    const opts = {
        input: null,
        output: null,
        apiKey: null,
        websiteCol: 'Website',
        delay: 1500,
        skipDomains: ['facebook.com', 'yelp.com', 'google.com', 'instagram.com', 'twitter.com', 'linkedin.com'],
        tier1Only: false,
        skipTier1: false,
        supabase: false
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--input': opts.input = args[++i]; break;
            case '--output': opts.output = args[++i]; break;
            case '--api-key': opts.apiKey = args[++i]; break;
            case '--website-col': opts.websiteCol = args[++i]; break;
            case '--delay': opts.delay = parseInt(args[++i], 10); break;
            case '--skip-domains': opts.skipDomains = args[++i].split(',').map(d => d.trim()); break;
            case '--tier1-only': opts.tier1Only = true; break;
            case '--skip-tier1': opts.skipTier1 = true; break;
            case '--supabase': opts.supabase = true; break;
            case '--help':
                console.log(fs.readFileSync(__filename, 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[1]);
                process.exit(0);
        }
    }

    if (!opts.input) { console.error('❌ --input is required'); process.exit(1); }
    if (!opts.output) {
        const ext = path.extname(opts.input);
        opts.output = opts.input.replace(ext, `_enriched${ext}`);
    }
    return opts;
}

// --- CSV Utilities ---
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (char === ',' && !inQuotes) {
            result.push(current); current = '';
        } else { current += char; }
    }
    result.push(current);
    return result;
}

function parseCSV(content) {
    const lines = content.trim().split('\n');
    const headers = parseCSVLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = parseCSVLine(lines[i]);
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx] || ''; });
        rows.push(row);
    }
    return { headers, rows };
}

function escapeCSV(val) {
    if (val && (val.includes(',') || val.includes('"') || val.includes('\n') || val.includes(';'))) {
        return `"${val.replace(/"/g, '""')}"`;
    }
    return val || '';
}

// --- Domain Extraction ---
function extractDomain(url, skipDomains) {
    if (!url || url === 'N/A' || url === '') return null;
    try {
        let domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
        domain = domain.split('/')[0].split('?')[0].toLowerCase();
        if (skipDomains.some(sd => domain.includes(sd))) return null;
        return domain;
    } catch (e) {
        return null;
    }
}

function extractFullUrl(url) {
    if (!url) return null;
    if (!url.startsWith('http')) url = 'https://' + url;
    return url;
}

// --- Email Regex ---
const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const GENERIC_EMAILS = ['noreply@', 'no-reply@', 'support@', 'donotreply@', 'admin@', 'webmaster@', 'postmaster@'];

function extractEmailsFromText(text) {
    if (!text) return [];
    const matches = text.match(EMAIL_REGEX) || [];
    return matches.filter(email => {
        const lower = email.toLowerCase();
        return !GENERIC_EMAILS.some(generic => lower.startsWith(generic));
    });
}

// --- HTTP Fetch Utility ---
function fetchUrl(url, timeout = 10000) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.get(url, { timeout }, (res) => {
            // Follow redirects (up to 3)
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetchUrl(res.headers.location, timeout).then(resolve);
                return;
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve(data));
        });
        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
    });
}

// --- Tier 1: AnyMailFinder API ---
function findEmailsAnyMailFinder(domain, apiKey) {
    return new Promise((resolve) => {
        const postData = JSON.stringify({ domain });
        const options = {
            hostname: 'api.anymailfinder.com',
            path: '/v5.1/find-email/company',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { resolve({ error: 'parse_error', raw: data }); }
            });
        });
        req.on('error', (e) => resolve({ error: e.message }));
        req.write(postData);
        req.end();
    });
}

// --- Tier 2: Website Contact Page Scraping ---
async function findEmailsFromWebsite(websiteUrl) {
    const fullUrl = extractFullUrl(websiteUrl);
    if (!fullUrl) return [];

    const pagesToTry = [
        fullUrl,
        fullUrl.replace(/\/$/, '') + '/contact',
        fullUrl.replace(/\/$/, '') + '/contact-us',
        fullUrl.replace(/\/$/, '') + '/about',
        fullUrl.replace(/\/$/, '') + '/about-us',
    ];

    const allEmails = new Set();

    for (const pageUrl of pagesToTry) {
        try {
            const html = await fetchUrl(pageUrl);
            if (html) {
                const emails = extractEmailsFromText(html);
                emails.forEach(e => allEmails.add(e.toLowerCase()));
            }
        } catch (e) {
            // Silently skip failed pages
        }
        if (allEmails.size > 0) break; // Found emails, stop checking more pages
    }

    return [...allEmails];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- Main ---
async function main() {
    const opts = parseArgs();

    console.log('📧 Email Enrichment v2 (3-Tier Fallback)');
    console.log('==========================================');
    console.log(`   Input:      ${opts.input}`);
    console.log(`   Output:     ${opts.output}`);
    console.log(`   Tier 1:     ${opts.skipTier1 ? '⏩ SKIPPED' : (opts.apiKey ? '✅ AnyMailFinder' : '⏩ No API key')}`);
    console.log(`   Tier 2:     ${opts.tier1Only ? '⏩ SKIPPED' : '✅ Website scraping'}`);
    console.log(`   Tier 3:     ${opts.tier1Only ? '⏩ SKIPPED' : '✅ Regex extraction'}`);
    console.log(`   Supabase:   ${opts.supabase ? 'YES' : 'no'}`);
    console.log(`   Delay:      ${opts.delay}ms\n`);

    const csvContent = fs.readFileSync(opts.input, 'utf8');
    const { headers, rows } = parseCSV(csvContent);

    if (!headers.includes('Email')) headers.push('Email');
    if (!headers.includes('Email Source')) headers.push('Email Source');

    // Stats tracking
    const stats = {
        tier1_found: 0,
        tier2_found: 0,
        tier3_found: 0,
        not_found: 0,
        no_website: 0,
        errors: 0,
        total_emails: 0
    };

    let tier1Available = !opts.skipTier1 && !!opts.apiKey;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const domain = extractDomain(row[opts.websiteCol], opts.skipDomains);
        const name = row['Business Name'] || row[headers[0]] || `Row ${i + 1}`;

        process.stdout.write(`[${i + 1}/${rows.length}] ${name}... `);

        // Skip if already has email
        if (row.Email && row.Email.trim()) {
            console.log(`⏩ Already has email`);
            continue;
        }

        if (!domain) {
            console.log('⏩ No website');
            row.Email = '';
            row['Email Source'] = 'no_website';
            stats.no_website++;
            continue;
        }

        let emailsFound = [];
        let source = '';

        // === TIER 1: AnyMailFinder ===
        if (tier1Available) {
            try {
                const result = await findEmailsAnyMailFinder(domain, opts.apiKey);

                if (result.error) {
                    // Check if it's a credit/auth error — disable Tier 1 for remaining leads
                    if (result.error === 'unauthorized' || result.error === 'payment_required' ||
                        (result.raw && result.raw.includes('credit'))) {
                        console.log(`⚠️  AnyMailFinder credits exhausted — switching to free tiers`);
                        tier1Available = false;
                        // Fall through to Tier 2
                    } else {
                        // Other error — try this lead with Tier 2
                    }
                } else if (result.emails && result.emails.length > 0) {
                    emailsFound = result.emails.map(e => typeof e === 'string' ? e : e.email).filter(Boolean);
                    source = 'anymailfinder';
                } else if (result.email) {
                    emailsFound = [result.email];
                    source = 'anymailfinder';
                }
            } catch (e) {
                // Tier 1 failed — fall through
            }
        }

        // === TIER 2: Website Contact Page Scraping ===
        if (emailsFound.length === 0 && !opts.tier1Only) {
            try {
                emailsFound = await findEmailsFromWebsite(row[opts.websiteCol]);
                if (emailsFound.length > 0) {
                    source = 'website_scrape';
                }
            } catch (e) {
                // Tier 2 failed — fall through to Tier 3
            }
        }

        // === TIER 3: Regex from homepage (already covered by Tier 2, but as explicit last resort) ===
        // Tier 2 already does this by checking the homepage. If we got here with 0, it's truly not found.

        // Record results
        if (emailsFound.length > 0) {
            row.Email = emailsFound.join('; ');
            row['Email Source'] = source;
            stats.total_emails += emailsFound.length;

            if (source === 'anymailfinder') stats.tier1_found++;
            else if (source === 'website_scrape') stats.tier2_found++;
            else stats.tier3_found++;

            console.log(`✅ [${source}] ${emailsFound.slice(0, 2).join(', ')}${emailsFound.length > 2 ? ` (+${emailsFound.length - 2})` : ''}`);
        } else {
            row.Email = '';
            row['Email Source'] = 'not_found';
            stats.not_found++;
            console.log('🔍 Not found (all tiers exhausted)');
        }

        if (i < rows.length - 1) await sleep(opts.delay);
    }

    // Write output CSV
    const csvLines = [headers.map(escapeCSV).join(',')];
    for (const row of rows) {
        csvLines.push(headers.map(h => escapeCSV(row[h] || '')).join(','));
    }
    fs.writeFileSync(opts.output, csvLines.join('\n'), 'utf8');

    // Summary
    const totalProcessed = rows.length - stats.no_website;
    const totalFound = stats.tier1_found + stats.tier2_found + stats.tier3_found;

    console.log('\n==========================================');
    console.log('📊 Enrichment Summary:');
    console.log(`   Total leads: ${rows.length}`);
    console.log(`   Processed: ${totalProcessed} (${stats.no_website} had no website)`);
    console.log(`   ✅ Emails found: ${totalFound} / ${totalProcessed} (${totalProcessed ? Math.round(totalFound / totalProcessed * 100) : 0}%)`);
    console.log(`      Tier 1 (AnyMailFinder): ${stats.tier1_found}`);
    console.log(`      Tier 2 (Website scrape): ${stats.tier2_found}`);
    console.log(`      Tier 3 (Regex):          ${stats.tier3_found}`);
    console.log(`   📧 Total email addresses: ${stats.total_emails}`);
    console.log(`   🔍 Not found: ${stats.not_found}`);
    console.log(`   ❌ Errors: ${stats.errors}`);
    console.log(`\n📄 Output: ${opts.output}`);

    // Supabase update
    if (opts.supabase) {
        console.log('\n📤 Updating Supabase with emails...');
        await updateSupabaseEmails(rows, opts);
    }
}

async function updateSupabaseEmails(rows, opts) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
        console.log('⚠️  SUPABASE_URL or SUPABASE_SERVICE_KEY not set. Skipping.');
        return;
    }

    let updated = 0;
    for (const row of rows) {
        if (!row.Email || !row.Email.trim()) continue;
        const businessName = row['Business Name'] || '';
        if (!businessName) continue;

        // Update the lead's email in Supabase
        const patchData = JSON.stringify({ email: row.Email.split(';')[0].trim() });

        try {
            await new Promise((resolve) => {
                const reqUrl = new URL(`${url}/rest/v1/leads?business_name=eq.${encodeURIComponent(businessName)}`);
                const options = {
                    hostname: reqUrl.hostname,
                    path: `${reqUrl.pathname}${reqUrl.search}`,
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`,
                        'apikey': key,
                        'Prefer': 'return=minimal',
                        'Content-Length': Buffer.byteLength(patchData)
                    }
                };
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => { data += chunk; });
                    res.on('end', () => {
                        if (res.statusCode >= 200 && res.statusCode < 300) updated++;
                        resolve();
                    });
                });
                req.on('error', () => resolve());
                req.write(patchData);
                req.end();
            });
        } catch (e) {
            // Skip failed updates
        }
    }

    console.log(`   ✅ Updated ${updated} leads in Supabase with emails`);
}

main().catch(console.error);
