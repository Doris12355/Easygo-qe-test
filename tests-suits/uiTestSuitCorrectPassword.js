const { chromium } = require("playwright");
const { UI_TEST_LINK } = require("../constant/testing_constants");

const uiTestSuit = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(UI_TEST_LINK);

  await page.fill("#username", "tomsmith");
  await page.fill("#password", "SuperSecretPassword");

  await page.click('button[type="submit"]');

  await page.waitForSelector(".flash.error", { timeout: 3000 });

  await browser.close();
};

module.exports = uiTestSuit;
