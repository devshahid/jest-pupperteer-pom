const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
class Homepage {
  elementName = "";
  async visitpage(page, url) {
    await page.goto(url);
  }
  async navigateToActionScreen(page, action) {
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item(action)
    );
  }
  async validateRegisterScreen(page) {
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(this.elementName, "Register Account");
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionInclude(
      this.elementName,
      "If you already have an account with us, please login at the"
    );
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.desc_heading
    );
    await Handler.assertionEquals(this.elementName, "Your Personal Details");
  }
  async validateRegisterElements(page) {
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
      this.elementName = await Handler.getInnerHTML(
        page,
        selector.ecommerce.register_fields(elementArr[i])
      );
      await Handler.assertionEquals(this.elementName, elementText[i]);
    }
  }
  async navigateToCart(page) {
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
  }
  async clickContinueBtn(page) {
    await Handler.waitForSelector(page, selector.ecommerce.continueBtn);
    await Handler.clickLocator(page, selector.ecommerce.continueBtn);
  }
  async selectProduct(page, product) {
    await Handler.waitForXPath(page, selector.ecommerce.itemsList(product));
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.itemsList(product)
    );
    await Handler.waitForSelector(page, selector.ecommerce.itemHeading);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.itemHeading
    );
    await Handler.assertionEquals(this.elementName, product);
  }
  async addProductToWishList(page) {
    await Handler.waitForSelector(
      page,
      selector.ecommerce.addToFavBtn("Add to Wish List")
    );
    await Handler.clickLocator(
      page,
      selector.ecommerce.addToFavBtn("Add to Wish List")
    );
  }
  async validateSuccessFavMsg(page) {
    await Handler.waitForSelector(page, selector.ecommerce.favSuccess);
    await Handler.clickLocator(page, selector.ecommerce.wishListNavLink);
  }
  async removeItemFromFav(page) {
    await Handler.waitForSelector(page, selector.ecommerce.loginElements);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.loginElements
    );
    await Handler.assertionEquals(this.elementName, "My Wish List");
    await Handler.waitForSelector(page, selector.ecommerce.removeBtn);
    await Handler.clickLocator(page, selector.ecommerce.removeBtn);
    await Handler.waitForSelector(page, selector.ecommerce.title_desc);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(this.elementName, "Your wish list is empty.");
  }
  async addProductToCart(page) {
    await Handler.clickLocator(page, selector.ecommerce.addToCartBtn);
  }
  async validateAddedToCartMsg(page) {
    await Handler.waitForSelector(page, selector.ecommerce.favSuccess);
  }
  async removeItemFromCart(page) {
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.itemRemoveBtn);
    await Handler.clickLocator(page, selector.ecommerce.itemRemoveBtn);
    await Handler.waitForSelector(page, selector.ecommerce.title_desc);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(
      this.elementName,
      "Your shopping cart is empty!"
    );
  }
  async navigateToCartNavLink(page) {
    await Handler.waitForSelector(page, selector.ecommerce.cartNavLink);
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionInclude(this.elementName, "Shopping Cart");
  }
  async navigateToCheckout(page) {
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(this.elementName, "Checkout");
  }
  async ValidateLinkedInElements(page) {
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.joinNowBtnLabel
    );
    await Handler.assertionEquals(this.elementName, "Join now");
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.signInBtnLabel
    );
    await Handler.assertionEquals(this.elementName, "Sign in");
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.mainHeading
    );
    await Handler.assertionEquals(
      this.elementName,
      "Welcome to your professional community"
    );
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.emailPhoneNumberInputLabel
    );
    await Handler.assertionEquals(this.elementName, "Email or phone number");
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.passwordLabel
    );
    await Handler.assertionEquals(this.elementName, "Password");
    this.elementName = await Handler.getInnerHTML(
      page,
      selector.LinkedIn.forgetPasswordLabel
    );
    await Handler.assertionEquals(this.elementName, "Forgot password?");
  }
}
module.exports = new Homepage();
module.exports.Homepage = Homepage;
