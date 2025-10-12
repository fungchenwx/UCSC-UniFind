import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const cacheFile = path.join(process.cwd(), 'internshipsCache.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000;

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
        await page.goto('https://ucsc.joinhandshake.com/job-search/10402119?query=UCSC&per_page=25&sort=relevance&page=1', { waitUntil: 'networkidle2' });

        // You may need to adjust selectors depending on Handshake's rendered HTML
        const internships = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.job-card, .search-result-item'));
            return cards.map(el => {
                const titleEl = el.querySelector('a');
                const descriptionEl = el.querySelector('.job-description, .description');
                return {
                    title: titleEl ? titleEl.textContent.trim() : null,
                    link: titleEl ? titleEl.href : null,
                    description: descriptionEl ? descriptionEl.textContent.trim() : 'No description available.'
                };
            }).filter(o => o.title);
        });

        await browser.close();

        fs.writeFileSync(cacheFile, JSON.stringify(internships, null, 2));
        return NextResponse.json(internships);
    } catch (err) {
        console.error('Scraper error:', err.message);
        return NextResponse.json({ error: 'Failed to scrape internships' }, { status: 500 });
    }
}
