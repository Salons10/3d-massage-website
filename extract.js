import puppeteer from 'puppeteer';
import fs from 'fs';

async function extractCode() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const urls = [
        { name: 'FlowButton', url: 'https://21st.dev/Kain0127/flow-button/default' },
        { name: 'GradientCard', url: 'https://21st.dev/jatin-yadav05/gradient-card/default' },
        { name: 'AnimatedTabBar', url: 'https://21st.dev/abxlfazl__/animated-tab-bar/default' }
    ];

    for (const { name, url } of urls) {
        console.log(`Navigating to ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        // 21st.dev usually has the code in a <pre> or code viewer.
        // Try to extract text from elements that look like code blocks.
        const codeTexts = await page.evaluate(() => {
            const preElements = Array.from(document.querySelectorAll('pre'));
            return preElements.map(pre => pre.innerText);
        });

        fs.writeFileSync(`/tmp/${name}.txt`, codeTexts.join('\n\n---NEXT-BLOCK---\n\n'));
        console.log(`Saved ${codeTexts.length} code blocks for ${name}`);
    }

    await browser.close();
}

extractCode().catch(console.error);
