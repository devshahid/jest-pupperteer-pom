const { expect } = require("chai");
const Homepage = require("../pages/homepage");
const Loginpage = require("../pages/loginpage");
describe("Validate LinkedIn Page", () => {
  let page;
  beforeEach(async () => {
    page = await browser.newPage();
    await Homepage.visitpage(page, "https://linkedin.com/");
    // await page.goto("https://linkedin.com/");
    await page.setViewport({ width: 1300, height: 768 });
  });
  afterEach(async () => {
    await page.close();
  });
  it("Validate page elements", async () => {
    await Homepage.ValidateLinkedInElements(page);
  });

  it("Sign up - Without email and password", async () => {
    await Loginpage.signUpWithoutEmailAndValidate(page);
  });

  it("Sign up - With email and password", async () => {
    await Loginpage.signUpWithEmailAndValidate(page);
  });
});
