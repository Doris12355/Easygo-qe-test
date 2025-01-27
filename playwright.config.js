module.exports = {
  browsers: ["chromium"], // "firefox", "webkit" can be added
  launchOptions: {
    headless: true,
    slowMo: 50,
  },
  contextOptions: {
    viewport: { width: 1280, height: 720 },
  },
};
