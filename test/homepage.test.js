const { expect } = require("chai");
const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
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
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.joinNowBtnLabel
    );
    await Handler.assertionEquals(elementName, "Join now");
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.signInBtnLabel
    );
    await Handler.assertionEquals(elementName, "Sign in");
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.mainHeading
    );
    await Handler.assertionEquals(
      elementName,
      "Welcome to your professional community"
    );
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.emailPhoneNumberInputLabel
    );
    await Handler.assertionEquals(elementName, "Email or phone number");
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.passwordLabel
    );
    await Handler.assertionEquals(elementName, "Password");
    elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.forgetPasswordLabel
    );
    await Handler.assertionEquals(elementName, "Forgot password?");
  });

  it("Sign up - Without email and password", async () => {
    await Handler.clickLocator(page, selector.LinkedIn.joinNowBtnLabel);
    await Handler.clickLocator(page, selector.LinkedIn.continueBtn);
    await Handler.waitForSelector(page, selector.LinkedIn.errorlabels);

    const options = await Handler.getArrayOfInnerHTML(
      page,
      selector.LinkedIn.errorlabels
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
    await Handler.clickLocator(page, selector.LinkedIn.joinNowBtnLabel);
    await Handler.TypeOnLocator(
      page,
      selector.LinkedIn.InputField("email-or-phone"),
      "testing0909876@gmail.com"
    );
    await Handler.TypeOnLocator(
      page,
      selector.LinkedIn.InputField("password"),
      "0909876learning"
    );
    await Handler.clickLocator(page, selector.LinkedIn.continueBtn);
    await Handler.waitForSelector(
      page,
      selector.LinkedIn.InputField("first-name")
    );
    await Handler.TypeOnLocator(
      page,
      selector.LinkedIn.InputField("first-name"),
      "learning"
    );
    await Handler.TypeOnLocator(
      page,
      selector.LinkedIn.InputField("last-name"),
      "tester"
    );
    await Handler.clickLocator(page, selector.LinkedIn.continueBtn);
  });
});
