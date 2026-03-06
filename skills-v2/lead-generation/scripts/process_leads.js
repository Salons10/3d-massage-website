#!/usr/bin/env node
/**
 * process_leads.js — Apify Google Maps Data Processor (v2)
 *
 * Processes raw JSON from Apify's compass/google-maps-extractor, filters by
 * industry keywords, deduplicates by phone, exports a standardized CSV,
 * and optionally inserts into Supabase "leads" table.
 *
 * Usage:
 *   node process_leads.js --input raw_data.json --output leads.csv --industry "roofing,roofer,roof" --area "Houston"
 *
 * Flags:
 *   --input       Path to raw JSON from Apify (required)
 *   --output      Path to output CSV (required)
 *   --industry    Comma-separated industry filter keywords (optional — if omitted, all results kept)
 *   --area        Area label to tag each row with (default: "Unknown")
 *   --niche       Niche label for Supabase (default: derived from industry keywords)
 *   --supabase    If set, also insert leads into Supabase "leads" table
 *   --append      If set, append to existing CSV instead of overwriting
 *   --help        Show this help message
 *
 * Environment Variables (for --supabase mode):
 *   SUPABASE_URL            Supabase project URL
 *   SUPABASE_SERVICE_KEY    Supabase service role key
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
    const args = process.argv.slice(2);
    const opts = { input: null, output: null, industry: null, area: 'Unknown', niche: null, supabase: false, append: false };
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--input': opts.input = args[++i]; break;
            case '--output': opts.output = args[++i]; break;
            case '--industry': opts.industry = args[++i].split(',').map(k => k.trim().toLowerCase()); break;
            case '--area': opts.area = args[++i]; break;
            case '--niche': opts.niche = args[++i]; break;
            case '--supabase': opts.supabase = true; break;
            case '--append': opts.append = true; break;
            case '--help':
                console.log(fs.readFileSync(__filename, 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[1]);
                process.exit(0);
        }
    }
    if (!opts.input) { console.error('❌ --input is required'); process.exit(1); }
    if (!opts.output) { console.error('❌ --output is required'); process.exit(1); }
    // Derive niche from first industry keyword if not provided
    if (!opts.niche && opts.industry) {
        opts.niche = opts.industry[0];
    }
    return opts;
}

function escapeCSV(val) {
    val = val || '';
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
}

function formatPhone(phone) {
    if (!phone) return 'N/A';
    return phone.replace(/^\+1/, '').replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

async function insertToSupabase(leads, opts) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
        console.log('⚠️  SUPABASE_URL or SUPABASE_SERVICE_KEY not set. Skipping Supabase insert.');
        return 0;
    }

    const https = require('https');
    const { URL } = require('url');

    const supabaseUrl = new URL(`${url}/rest/v1/leads`);
    let inserted = 0;

    // Batch insert (Supabase supports upsert)
    const rows = leads.map(item => ({
        business_name: item.title || '',
        email: '', // Will be filled during enrichment step
        phone: formatPhone(item.phone || item.phoneUnformatted),
        website: item.website || '',
        address: item.address || `${item.city || opts.area}, ${item.state || 'TX'}`,
        city: item.city || opts.area,
        niche: opts.niche || 'unknown',
        google_reviews: item.totalScore != null ? Math.round(item.totalScore * 10) : null,
        source: 'apify'
    }));

    // Insert in batches of 50
    const batchSize = 50;
    for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const postData = JSON.stringify(batch);

        try {
            await new Promise((resolve, reject) => {
                const reqUrl = new URL(`${url}/rest/v1/leads`);
                const options = {
                    hostname: reqUrl.hostname,
                    path: reqUrl.pathname,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`,
                        'apikey': key,
                        'Prefer': 'resolution=ignore-duplicates,return=minimal',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => { data += chunk; });
                    res.on('end', () => {
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            inserted += batch.length;
                            resolve();
                        } else {
                            console.log(`⚠️  Supabase batch error (${res.statusCode}): ${data}`);
                            resolve(); // Don't reject — continue with remaining batches
                        }
                    });
                });
                req.on('error', (e) => {
                    console.log(`⚠️  Supabase connection error: ${e.message}`);
                    resolve();
                });
                req.write(postData);
                req.end();
            });
        } catch (e) {
            console.log(`⚠️  Supabase batch error: ${e.message}`);
        }
    }

    return inserted;
}

async function main() {
    const opts = parseArgs();

    console.log('📋 Lead Processor v2');
    console.log('=======================');
    console.log(`   Input:    ${opts.input}`);
    console.log(`   Output:   ${opts.output}`);
    console.log(`   Industry: ${opts.industry ? opts.industry.join(', ') : 'all'}`);
    console.log(`   Area:     ${opts.area}`);
    console.log(`   Supabase: ${opts.supabase ? 'YES' : 'no'}\n`);

    const raw = JSON.parse(fs.readFileSync(opts.input, 'utf8'));
    console.log(`   Raw records: ${raw.length}`);

    // Filter by industry keywords (match against categoryName or title)
    let filtered = raw;
    if (opts.industry) {
        filtered = raw.filter(item => {
            const cat = (item.categoryName || '').toLowerCase();
            const title = (item.title || '').toLowerCase();
            return opts.industry.some(kw => cat.includes(kw) || title.includes(kw));
        });
        console.log(`   After industry filter: ${filtered.length}`);
    }

    // Deduplicate by phone number
    const seen = new Set();
    const deduped = [];
    for (const item of filtered) {
        const phone = (item.phoneUnformatted || item.phone || '').replace(/\D/g, '');
        if (phone && seen.has(phone)) continue;
        if (phone) seen.add(phone);
        deduped.push(item);
    }
    console.log(`   After dedup: ${deduped.length}`);

    // Build CSV
    const headers = ['Business Name', 'Phone', 'Website', 'Address', 'City', 'State', 'Zip', 'Category', 'Google Rating', 'Area'];
    const csvRows = deduped.map(item => {
        return [
            escapeCSV(item.title || ''),
            escapeCSV(formatPhone(item.phone || item.phoneUnformatted)),
            escapeCSV(item.website || 'N/A'),
            escapeCSV(item.address || `${item.street || ''}, ${item.city || ''}, ${item.state || ''} ${item.postalCode || ''}`.replace(/^, |, $/g, '') || `${item.city || opts.area} ${item.state || 'TX'}`),
            escapeCSV(item.city || opts.area),
            escapeCSV(item.state || 'TX'),
            escapeCSV(item.postalCode || ''),
            escapeCSV(item.categoryName || ''),
            escapeCSV(item.totalScore != null ? String(item.totalScore) : 'N/A'),
            escapeCSV(opts.area)
        ].join(',');
    });

    // Write CSV
    let content;
    if (opts.append && fs.existsSync(opts.output)) {
        content = '\n' + csvRows.join('\n');
        fs.appendFileSync(opts.output, content, 'utf8');
    } else {
        content = headers.join(',') + '\n' + csvRows.join('\n');
        fs.writeFileSync(opts.output, content, 'utf8');
    }

    console.log(`\n✅ Exported ${deduped.length} leads to ${opts.output}`);

    // Supabase insert
    if (opts.supabase) {
        console.log('\n📤 Inserting into Supabase...');
        const inserted = await insertToSupabase(deduped, opts);
        console.log(`   ✅ Inserted ${inserted} leads into Supabase "leads" table`);
    }
}

main().catch(console.error);
