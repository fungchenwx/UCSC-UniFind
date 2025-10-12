import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const cacheFile = path.join(process.cwd(), 'researchCache.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
    try {
        if (fs.existsSync(cacheFile)) {
            const { mtimeMs } = fs.statSync(cacheFile);
            if (Date.now() - mtimeMs < CACHE_DURATION) {
                const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
                return NextResponse.json(cached);
            }
        }

        const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
        const page = await browser.newPage();
        await page.goto('https://undergradresearch.ucsc.edu/discover-opportunities/undergraduate-research-internships/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('.views-row');

        const opportunities = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.views-row'));
            return rows.map(el => {
                const titleEl = el.querySelector('h3 a');
                const descriptionEl = el.querySelector('.views-field-body, .views-field-field-description');
                return {
                    title: titleEl ? titleEl.textContent.trim() : null,
                    link: titleEl ? titleEl.href : null,
                    description: descriptionEl ? descriptionEl.textContent.trim() : 'No description available.'
                };
            }).filter(o => o.title);
        });

        await browser.close();

        fs.writeFileSync(cacheFile, JSON.stringify(opportunities, null, 2));
        return NextResponse.json(opportunities);
    } catch (err) {
        console.error('Scraper error:', err.message);
        return NextResponse.json({ error: 'Failed to scrape research opportunities' }, { status: 500 });
    }
}
