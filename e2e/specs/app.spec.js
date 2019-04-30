const puppeteer = require('puppeteer');

describe('app', () => {

  test('renders content correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto(process.env.TEST_HOST);
    await page.waitForSelector('.App');

    const html = await page.$eval('.navbar-brand', e => e.innerHTML);
    expect(html).toBe('Sonalake Task');

    browser.close();
  });
});
