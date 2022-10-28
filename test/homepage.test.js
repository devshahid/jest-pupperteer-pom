const { expect } = require("chai");
const selector = require("../locators/locators");

describe("Validate LinkedIn Page", () => {
  let page, elementName;
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://linkedin.com/");
    await page.setViewport({ width: 1300, height: 768 });
  });
  afterEach(async () => {
    await page.close();
  });
  it("Validate page elements", async () => {
    elementName = await page.$eval(
      selector.LinkedIn.joinNowBtnLabel,
      (el) => el.innerHTML
    );
    expect(elementName.replace(/\n/g, "").trim()).to.equal("Join now");
    elementName = await page.$eval(
      selector.LinkedIn.signInBtnLabel,
      (el) => el.innerHTML
    );

    expect(elementName.replace(/\n/g, "").trim()).to.equal("Sign in");
    elementName = await page.$eval(
      selector.LinkedIn.mainHeading,
      (el) => el.innerHTML
    );
    expect(elementName.replace(/\n/g, "").trim()).to.equal(
      "Welcome to your professional community"
    );
    elementName = await page.$eval(
      selector.LinkedIn.emailPhoneNumberInputLabel,
      (el) => el.innerHTML
    );
    expect(elementName.replace(/\n/g, "").trim()).to.equal(
      "Email or phone number"
    );
    elementName = await page.$eval(
      selector.LinkedIn.passwordLabel,
      (el) => el.innerHTML
    );
    expect(elementName.replace(/\n/g, "").trim()).to.equal("Password");
    elementName = await page.$eval(
      selector.LinkedIn.forgetPasswordLabel,
      (el) => el.innerHTML
    );
    expect(elementName.replace(/\n/g, "").trim()).to.equal("Forgot password?");
  });

  it("Sign up - Without email and password", async () => {
    const pageTarget = page.target();
    await page.click(selector.LinkedIn.joinNowBtnLabel);
    await page.click(selector.LinkedIn.continueBtn);
    await page.waitForSelector(selector.LinkedIn.errorlabels);
    const options = await page.$$eval(
      selector.LinkedIn.errorlabels,
      (options) =>
        options.map((option) => option.innerHTML.replace(/\n/g, "").trim())
    );
    options.sort();
    let errorMsgs = [
      "Please enter your email address or mobile number.",
      "Please enter your password.",
    ];
    errorMsgs.sort();
    expect(options).to.eql(errorMsgs);
  });

  it("Sign up - With email and password", async () => {
    await page.click(selector.LinkedIn.joinNowBtnLabel);
    await page.type(
      selector.LinkedIn.InputField("email-or-phone"),
      "testing0909876@gmail.com"
    );
    await page.type(
      selector.LinkedIn.InputField("password"),
      "0909876learning"
    );
    await page.click(selector.LinkedIn.continueBtn);
    await page.waitForSelector(selector.LinkedIn.InputField("first-name"));
    await page.type(selector.LinkedIn.InputField("first-name"), "learning");
    await page.type(selector.LinkedIn.InputField("last-name"), "tester");
    await page.click(selector.LinkedIn.continueBtn);
  });
});
