import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('BROWSER ERROR:', msg.text());
        } else {
            console.log('BROWSER LOG:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.error('PAGE CRASH:', error.message);
    });

    console.log('Navigating to http://127.0.0.1:3000...');
    try {
        await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle0', timeout: 10000 });

        // Check what is inside the root div
        const html = await page.$eval('#root', el => el.innerHTML);
        console.log('ROOT HTML LENGTH:', html.length);
        if (html.length < 500) {
            console.log('ROOT HTML CONTENT:', html);
        } else {
            console.log('ROOT HTML START:', html.substring(0, 200));
        }
    } catch (e) {
        console.error('Navigation error:', e.message);
    }

    await browser.close();
})();
