require("dotenv").config();

const E2E_UI_WEB_LINK = process.env.E2E_WEB_LINK || "";
const E2E_USERNAME = process.env.E2E_USERNAME || "";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "";

const API_ENDPOINT = process.env.API_ENDPOINT || "";
const API_USERNAME = process.env.API_USERNAME || "";
const API_PASSWORD = process.env.API_PASSWORD || "";

module.exports = {
  E2E_UI_WEB_LINK,
  E2E_USERNAME,
  E2E_PASSWORD,
  API_ENDPOINT,
  API_USERNAME,
  API_PASSWORD,
};
