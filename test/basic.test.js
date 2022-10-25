const { expect } = require("chai");

describe("simple test for Linkedin Login functionality", async () => {
  let page;

  before(async () => {
    /* before hook for mocha testing */
    page = await browser.newPage();
    await page.goto("https://www.linkedin.com/");
    await page.setViewport({ width: 1920, height: 1040 });
  });

  after(async function () {
    /* after hook for mocah testing */ await page.close();
  });

  it("should login to home page", async () => {
    /* simple test case */
    const emailInput = "#login-email";
    const passwordInput = "#login-password";
    const submitSelector = "#login-submit";

    let linkEmail = await page.$(emailInput);
    let linkPassword = await page.$(passwordInput);
    let linkSubmit = await page.$(submitSelector);
    console.log(linkEmail);
    await linkEmail.click({ clickCount: 3 });
    await linkEmail.type(""); // add the email address for linkedin //

    await linkPassword.click({ clickCount: 3 });
    await linkPassword.type(""); // add password for linkedin account

    await linkSubmit.click();
    // await page.waitFor(3000);
  });
});
