const { expect, test, describe } = require('@jest/globals');
const { Builder, By, Key, until, Capabilities, WebDriver } = require("selenium-webdriver");
const website = process.env.WEBSITE || "{WEBSITE}"
const { percy } = require('browserstack-node-sdk');
describe(`${new URL(website).host}`, () => {
    /**
     * @type {WebDriver}
     */
    let driver;

    beforeAll(async () => {
        driver = new Builder()
            .usingServer(`http://localhost:4444/wd/hub`)
            .withCapabilities(Capabilities.chrome())
            .build();
        await driver.manage().window().maximize()
    });

    afterAll(async () => {
        await driver.quit();
    })
    test(`check the URL: ${website}`, async () => {
        // Here you can define the actual test for each URL
        await driver.get(website);
        await slowScrollToBottom(driver);
        const title = await driver.getTitle();
        expect(title.length).toBeGreaterThan(0);

        const ogUrl = await driver.findElement(By.css('meta[property="og:url"]')).getAttribute('content');
        expect(ogUrl).toBe(website)

        await percy.screenshot(driver, new URL(website).pathname,{fullPage:true})
    });
});

// Slow Scroll function that scrolls the page slowly
async function slowScrollToBottom(driver, scrollInterval = 200, scrollStep = 100) {
    let currentScroll = 0;
    const bodyHandle = await driver.findElement(By.tagName('body'));
    const { height } = await bodyHandle.getRect();
    
    // Keep scrolling until the bottom is reached
    while (currentScroll < height) {
        await driver.executeScript(`window.scrollBy(0, ${scrollStep})`);
        currentScroll += scrollStep;
        await driver.sleep(scrollInterval);  // Wait for the defined interval before scrolling again
    }
}


