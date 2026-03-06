#!/usr/bin/env node
/**
 * enrich_emails.js — AnyMailFinder Email Enrichment CLI
 *
 * Usage:
 *   node enrich_emails.js --input leads.csv --output leads_enriched.csv --api-key YOUR_KEY
 *
 * Flags:
 *   --input         Path to input CSV (required)
 *   --output        Path to output CSV (default: <input>_enriched.csv)
 *   --api-key       AnyMailFinder API key (required)
 *   --website-col   Column name containing website URLs (default: "Website")
 *   --delay         Milliseconds between API calls (default: 1500)
 *   --skip-domains  Comma-separated domains to skip (default: facebook.com,yelp.com,google.com,instagram.com,twitter.com,linkedin.com)
 *   --help          Show this help message
 */

const https = require('https');
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
        skipDomains: ['facebook.com', 'yelp.com', 'google.com', 'instagram.com', 'twitter.com', 'linkedin.com']
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--input': opts.input = args[++i]; break;
            case '--output': opts.output = args[++i]; break;
            case '--api-key': opts.apiKey = args[++i]; break;
            case '--website-col': opts.websiteCol = args[++i]; break;
            case '--delay': opts.delay = parseInt(args[++i], 10); break;
            case '--skip-domains': opts.skipDomains = args[++i].split(',').map(d => d.trim()); break;
            case '--help':
                console.log(fs.readFileSync(__filename, 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[1]);
                process.exit(0);
        }
    }

    if (!opts.input) { console.error('❌ --input is required'); process.exit(1); }
    if (!opts.apiKey) { console.error('❌ --api-key is required'); process.exit(1); }
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

// --- AnyMailFinder API ---
function findEmails(domain, apiKey) {
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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- Main ---
async function main() {
    const opts = parseArgs();

    console.log('📧 AnyMailFinder Email Enrichment');
    console.log('=================================');
    console.log(`   Input:  ${opts.input}`);
    console.log(`   Output: ${opts.output}`);
    console.log(`   Delay:  ${opts.delay}ms\n`);

    const csvContent = fs.readFileSync(opts.input, 'utf8');
    const { headers, rows } = parseCSV(csvContent);

    if (!headers.includes('Email')) headers.push('Email');
    if (!headers.includes('Email Source')) headers.push('Email Source');

    let found = 0, notFound = 0, noWebsite = 0, errors = 0, totalEmails = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const domain = extractDomain(row[opts.websiteCol], opts.skipDomains);
        const name = row['Business Name'] || row[headers[0]] || `Row ${i + 1}`;

        process.stdout.write(`[${i + 1}/${rows.length}] ${name}... `);

        if (!domain) {
            console.log('⏩ No website');
            row.Email = row.Email || '';
            row['Email Source'] = 'no_website';
            noWebsite++;
            continue;
        }

        try {
            const result = await findEmails(domain, opts.apiKey);

            if (result.error) {
                console.log(`❌ Error: ${result.error}`);
                row.Email = '';
                row['Email Source'] = 'error';
                errors++;
            } else if (result.emails && result.emails.length > 0) {
                const emails = result.emails.map(e => typeof e === 'string' ? e : e.email).filter(Boolean);
                row.Email = emails.join('; ');
                row['Email Source'] = 'anymailfinder';
                totalEmails += emails.length;
                console.log(`✅ Found ${emails.length}: ${emails.slice(0, 3).join(', ')}${emails.length > 3 ? ` (+${emails.length - 3} more)` : ''}`);
                found++;
            } else if (result.email) {
                row.Email = result.email;
                row['Email Source'] = 'anymailfinder';
                totalEmails++;
                console.log(`✅ Found: ${result.email}`);
                found++;
            } else {
                console.log('🔍 Not found');
                row.Email = '';
                row['Email Source'] = 'not_found';
                notFound++;
            }
        } catch (e) {
            console.log(`❌ ${e.message}`);
            row.Email = '';
            row['Email Source'] = 'error';
            errors++;
        }

        if (i < rows.length - 1) await sleep(opts.delay);
    }

    // Write output
    const csvLines = [headers.map(escapeCSV).join(',')];
    for (const row of rows) {
        csvLines.push(headers.map(h => escapeCSV(row[h] || '')).join(','));
    }
    fs.writeFileSync(opts.output, csvLines.join('\n'), 'utf8');

    console.log('\n=================================');
    console.log('📊 Enrichment Summary:');
    console.log(`   ✅ Leads with emails: ${found} / ${rows.length} (${Math.round(found / rows.length * 100)}%)`);
    console.log(`   📧 Total emails found: ${totalEmails}`);
    console.log(`   🔍 Not found: ${notFound}`);
    console.log(`   ⏩ No website: ${noWebsite}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`\n📄 Output: ${opts.output}`);
}

main().catch(console.error);
