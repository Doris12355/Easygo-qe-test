const { chromium } = require("playwright");
const {
  E2E_UI_WEB_LINK,
  E2E_USERNAME,
  E2E_PASSWORD,
} = require("../constant/testingConstants");

describe("E2E UI Test Suite", () => {
  let browser;
  let context;
  let page;

  const login = async () => {
    if (page) {
      await page.fill("#user-name", E2E_USERNAME);
      await page.fill("#password", E2E_PASSWORD);
      await page.click("#login-button");
    }
  };

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(E2E_UI_WEB_LINK);
  });

  afterAll(async () => {
    // await browser.close();
  });

  it("should enter the landing page", async () => {
    const logo = await page.locator(".login_logo").isVisible();
    expect(logo).toBe(true);
  });

  it("should redirect to the login page after filling username and password", async () => {
    await login();

    const inventoryHeader = await page.locator(".title").textContent();
    expect(inventoryHeader).toContain("Products");
  });

  it("should add item to the cart successfully", async () => {
    await page.click(".inventory_item:first-child .btn_inventory");

    const cartBadge = await page.locator(".shopping_cart_badge").textContent();
    expect(cartBadge).toBe("1");
  });

  it("should not allow user to checkout if empty input value", async () => {
    await page.click(".shopping_cart_link");
    await page.click("#checkout");

    await page.fill("#first-name", "");
    await page.fill("#last-name", "");
    await page.fill("#postal-code", "");
    await page.click("#continue");

    const errorMessage = await page
      .locator(".error-message-container")
      .textContent();
    expect(errorMessage).toContain("Error: First Name is required");
  });

  it("Checkout and save action", async () => {
    await page.click(".shopping_cart_link");
    await page.click("#checkout");

    await page.fill("#first-name", "John");
    await page.fill("#last-name", "Doe");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");

    const overviewTitle = await page.locator(".title").textContent();
    expect(overviewTitle).toContain("Checkout: Overview");
  });

  it("should allow user to click finish after input receiving address", async () => {
    await page.click("button#finish");
    expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });
});
