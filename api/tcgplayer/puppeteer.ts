import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// const url = 'https://www.tcgplayer.com/product/118413';
// const url = 'https://www.yext.com';
const url = 'https://www.tcgplayer.com';
const doit = () => {
  puppeteer.use(StealthPlugin());
  puppeteer.launch({ headless: true }).then(async (browser) => {
    console.log('running tests');
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url);
    // Waiting for network activity to be idle for at least 500 milliseconds
    // await page.waitForFunction(
    //   'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500',
    // );
    console.log(await page.content());
    await page.screenshot({ path: 'testresult.png', fullPage: true });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
};

export { doit };
