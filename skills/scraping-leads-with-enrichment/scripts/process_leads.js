#!/usr/bin/env node
/**
 * process_leads.js — Apify Google Maps Data Processor
 *
 * Processes raw JSON from Apify's compass/google-maps-extractor, filters by
 * industry keywords, deduplicates by phone, and exports a standardized CSV.
 *
 * Usage:
 *   node process_leads.js --input raw_data.json --output leads.csv --industry "roofing,roofer,roof" --area "Houston"
 *
 * Flags:
 *   --input       Path to raw JSON from Apify (required)
 *   --output      Path to output CSV (required)
 *   --industry    Comma-separated industry filter keywords (optional — if omitted, all results kept)
 *   --area        Area label to tag each row with (default: "Unknown")
 *   --append      If set, append to existing CSV instead of overwriting
 *   --help        Show this help message
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
    const args = process.argv.slice(2);
    const opts = { input: null, output: null, industry: null, area: 'Unknown', append: false };
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--input': opts.input = args[++i]; break;
            case '--output': opts.output = args[++i]; break;
            case '--industry': opts.industry = args[++i].split(',').map(k => k.trim().toLowerCase()); break;
            case '--area': opts.area = args[++i]; break;
            case '--append': opts.append = true; break;
            case '--help':
                console.log(fs.readFileSync(__filename, 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[1]);
                process.exit(0);
        }
    }
    if (!opts.input) { console.error('❌ --input is required'); process.exit(1); }
    if (!opts.output) { console.error('❌ --output is required'); process.exit(1); }
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

function main() {
    const opts = parseArgs();

    console.log('📋 Apify Lead Processor');
    console.log('=======================');
    console.log(`   Input:    ${opts.input}`);
    console.log(`   Output:   ${opts.output}`);
    console.log(`   Industry: ${opts.industry ? opts.industry.join(', ') : 'all'}`);
    console.log(`   Area:     ${opts.area}\n`);

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

    // Build CSV rows
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
}

main();
