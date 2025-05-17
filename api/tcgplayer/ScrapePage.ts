import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const ScrapePage = async (url: string) => {
  const data = {
    timestamp: new Date().getTime(),
  };
  await puppeteer.launch({ headless: true }).then(async (browser) => {
    console.log(`scraping page: ${url}`);

    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url);
    // pick an arbitrary element to wait for the page to load
    await page.locator('h1').wait();

    // Need to get the card name from the jsonld because thats the only
    //  place it appears on it's own
    const ldjson = await page.$eval('script[type="application/ld+json"]', (script) => {
      return JSON.parse(script.innerText);
    });
    data['name'] = ldjson.name;

    const dataLocations = [
      { label: 'set', selector: 'span[data-testid="lblProductDetailsSetName"]' },
      {
        label: 'collectorNumber',
        selector: '.product__item-details__attributes li:nth-child(2) span',
      },
      { label: 'marketPrice', selector: '.price-points__upper__price' },
      {
        label: 'currentQuantity',
        selector: '.price-points__lower tr:nth-child(2) td:nth-child(2) span',
      },
      {
        label: 'currentSellers',
        selector: '.price-points__lower tr:nth-child(2) td:nth-child(4) span',
      },
      { label: 'avgDailySold', selector: '.sales-data tr:nth-child(2) td:nth-child(4) span' },
    ];

    for (const query of dataLocations) {
      await page.locator(query.selector).wait();
      const val = await page.$eval(query.selector, (el) => el.innerHTML);
      data[query.label] = val;
    }

    // Grab the first 10 Listings
    const listings = await page.$$eval('.listing-item', (listingEls) =>
      listingEls.map((listingEl) => ({
        condition: listingEl.querySelector('.listing-item__listing-data__info__condition a')
          ?.innerHTML,
        price: listingEl.querySelector('.listing-item__listing-data__info__price')?.innerHTML,
        shipping: listingEl.querySelector('.shipping-messages__price')?.innerHTML,
        quantity: listingEl.querySelector('.add-to-cart__available')?.innerHTML,
      })),
    );

    data['Listings'] = listings;

    await browser.close();
  });

  return data;
};

export { ScrapePage };
