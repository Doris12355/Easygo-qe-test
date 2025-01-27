const { chromium } = require("playwright");
const { UI_TEST_LINK } = require("../constant/testing_constants");

const uiTestSuit = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(UI_TEST_LINK);

  await page.fill("#username", "tomsmith");
  await page.fill("#password", "SuperSecretPassword!");

  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector(".flash.error", { timeout: 3000 }); // Timeout if no error appears
    const errorMessage = await page.textContent("`.flash.error");
    console.log("Login Failed:", errorMessage.trim());
  } catch (e) {
    console.log(
      "No error message appeared. Check the page for unexpected behavior."
    );
  }

  await page.waitForSelector(".flash.success");

  const successMessage = await page.textContent(".subheader");
  console.log("Login page subheader is :", successMessage.trim());

  try {
    await page.click('a:has-text("Logout")');
  } catch (e) {
    console.log(
      "No logout button found. Check the page for unexpected behavior."
    );
  }

  await page.waitForSelector("#username");
  console.log("Logout successful!");

  await browser.close();
};

module.exports = uiTestSuit;
