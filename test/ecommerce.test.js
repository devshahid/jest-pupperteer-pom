const { expect } = require("chai");
const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
let emailadd = `${Handler.generateString(5)}@gmail.com`;

describe("Complete Registration Flow", () => {
  let page, elementName;
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://tutorialsninja.com/demo/");
    await page.setViewport({ width: 1300, height: 768 });

    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item("Register")
    );
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(elementName, "Register Account");
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionInclude(
      elementName,
      "If you already have an account with us, please login at the"
    );
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.desc_heading
    );
    await Handler.assertionEquals(elementName, "Your Personal Details");
  });
  afterEach(async () => {
    await page.close();
  });
  it("Validate Register page elements", async () => {
    let elementArr = [
      "firstname",
      "lastname",
      "email",
      "telephone",
      "password",
      "confirm",
    ];
    let elementText = [
      "First Name",
      "Last Name",
      "E-Mail",
      "Telephone",
      "Password",
      "Password Confirm",
    ];
    for (let i in elementArr) {
      elementName = await Handler.getInnerHTML(
        page,
        selector.ecommerce.register_fields(elementArr[i])
      );
      await Handler.assertionEquals(elementName, elementText[i]);
    }
  });

  it("Register User", async () => {
    let elementArr = [
      "firstname",
      "lastname",
      "email",
      "telephone",
      "password",
      "confirm",
    ];
    let elementText = [
      "Testing",
      "User",
      emailadd,
      "1098908790",
      "testuser",
      "testuser",
    ];
    for (let i in elementArr) {
      await Handler.TypeOnLocator(
        page,
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("checkbox"));
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("submit"));
    await Handler.waitForXPath(page, selector.ecommerce.menuitem("My Account"));
    page, selector.ecommerce.menuitem("My Account");
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item("Logout")
    );
  });
});

describe("Complete Login Flow", () => {
  let page, elementName;
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://tutorialsninja.com/demo/");
    await page.setViewport({ width: 1300, height: 768 });

    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item("Login")
    );
    await Handler.waitForSelector(page, selector.ecommerce.loginScreen);
    let elementArr = ["email", "password"];
    let elementText = ["user2@testing.com", "testuser"];
    for (let i in elementArr) {
      await Handler.TypeOnLocator(
        page,
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("submit"));
    let options = await Handler.getArrayOfInnerHTML(
      page,
      selector.ecommerce.loginElements
    );
    options.sort();
    let elements = [
      "My Account",
      "My Orders",
      "My Affiliate Account",
      "Newsletter",
    ];
    elements.sort();
    expect(options).to.eql(elements);
  });
  afterEach(async () => {
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item("Logout")
    );
    await page.close();
  });
  it("Add and Remove Product to Fav list and Validate", async () => {
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.continueBtn);
    await Handler.clickLocator(page, selector.ecommerce.continueBtn);
    await Handler.waitForXPath(page, selector.ecommerce.itemsList("MacBook"));
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.itemsList("MacBook")
    );
    await Handler.waitForSelector(page, selector.ecommerce.itemHeading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.itemHeading
    );
    await Handler.assertionEquals(elementName, "MacBook");
    await Handler.clickLocator(
      page,
      selector.ecommerce.addToFavBtn("Add to Wish List")
    );
    await Handler.waitForSelector(page, selector.ecommerce.favSuccess);
    await Handler.clickLocator(page, selector.ecommerce.wishListNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.loginElements);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.loginElements
    );
    await Handler.assertionEquals(elementName, "My Wish List");
    await Handler.waitForSelector(page, selector.ecommerce.removeBtn);
    await Handler.clickLocator(page, selector.ecommerce.removeBtn);

    await Handler.waitForSelector(page, selector.ecommerce.title_desc);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(elementName, "Your wish list is empty.");
    await Handler.waitForSelector(page, selector.ecommerce.continueBtn);
    await Handler.clickLocator(page, selector.ecommerce.continueBtn);
  });

  it("Add Product to Cart", async () => {
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.continueBtn);
    await Handler.clickLocator(page, selector.ecommerce.continueBtn);
    await Handler.waitForXPath(page, selector.ecommerce.itemsList("MacBook"));
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.itemsList("MacBook")
    );
    await Handler.waitForSelector(page, selector.ecommerce.itemHeading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.itemHeading
    );
    await Handler.assertionEquals(elementName, "MacBook");
    await Handler.clickLocator(page, selector.ecommerce.addToCartBtn);
    await Handler.waitForSelector(page, selector.ecommerce.favSuccess);
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionInclude(elementName, "Shopping Cart");
    await Handler.waitForSelector(page, selector.ecommerce.continueBtn);
    await Handler.clickLocator(page, selector.ecommerce.continueBtn);
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(elementName, "Checkout");
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.itemRemoveBtn);
    await Handler.clickLocator(page, selector.ecommerce.itemRemoveBtn);
    await Handler.waitForSelector(page, selector.ecommerce.title_desc);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(elementName, "Your shopping cart is empty!");
  });
});
