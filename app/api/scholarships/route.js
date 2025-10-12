import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const cacheFile = path.join(process.cwd(), 'scholarshipsCache.json');
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
        await page.goto('https://financialaid.ucsc.edu/types-of-aid/scholarships/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('a');

        const scholarships = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'));
            return links.map(a => ({
                title: a.textContent.trim(),
                link: a.href,
                description: ''
            })).filter(a => a.title);
        });

        await browser.close();

        fs.writeFileSync(cacheFile, JSON.stringify(scholarships, null, 2));
        return NextResponse.json(scholarships);
    } catch (err) {
        console.error('Scraper error:', err.message);
        return NextResponse.json({ error: 'Failed to scrape scholarships' }, { status: 500 });
    }
}
