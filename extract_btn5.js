import puppeteer from 'puppeteer';
import fs from 'fs';

async function extractCode() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://21st.dev/ui-layouts/button-5/default';

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for pre blocks to load just in case
    await page.waitForSelector('pre', { timeout: 10000 }).catch(() => console.log('No <pre> timeout'));

    const codeTexts = await page.evaluate(() => {
        const preElements = Array.from(document.querySelectorAll('pre'));
        return preElements.map(pre => pre.innerText);
    });

    const bodyText = await page.evaluate(() => document.body.innerText);

    fs.writeFileSync(`/tmp/Button5.txt`, codeTexts.join('\n\n---NEXT-BLOCK---\n\n'));
    fs.writeFileSync(`/tmp/Button5_body.txt`, bodyText);

    console.log(`Saved ${codeTexts.length} code blocks for Button5`);

    await browser.close();
}

extractCode().catch(console.error);
