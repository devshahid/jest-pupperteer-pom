/* Import the puppeteer and expect functionality of chai library for configuraing the Puppeteer */
const puppeteer = require("puppeteer");
const { expect } = require("chai");
const _ = require("lodash");

/* create the global variable by using lodash function */
const globalVariables = _.pick(global, ["browser", "expect"]);

/* configurable options or object for puppeteer */
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 0,
  args: ["--start-maximized"],
};

/* call the before for puppeteer for execute this code before start testing */
before(async () => {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 768 });
});
afterEach(async () => {
  await page.close();
});

/* call the function after puppeteer done testing */
after(() => {
  browser.close();
  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
