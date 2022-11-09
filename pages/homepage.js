const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
class Homepage {
  elementName = "";
  async visitpage(url) {
    await page.goto(url);
  }
  async navigateToActionScreen(action) {
    await Handler.clickLocatorXpath(selector.ecommerce.menuitem("My Account"));
    await Handler.clickLocatorXpath(selector.ecommerce.dropdown_item(action));
  }
  async validateRegisterScreen() {
    await Handler.waitForSelector(selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(this.elementName, "Register Account");
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_desc
    );
    await Handler.assertionInclude(
      this.elementName,
      "If you already have an account with us, please login at the"
    );
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.desc_heading
    );
    await Handler.assertionEquals(this.elementName, "Your Personal Details");
  }
  async validateRegisterElements() {
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
        selector.ecommerce.register_fields(elementArr[i])
      );
      await Handler.assertionEquals(this.elementName, elementText[i]);
    }
  }
  async navigateToCart() {
    await Handler.clickLocator(selector.ecommerce.cartNavLink);
  }
  async clickContinueBtn() {
    await Handler.waitForSelector(selector.ecommerce.continueBtn);
    await Handler.clickLocator(selector.ecommerce.continueBtn);
  }
  async selectProduct(product) {
    await Handler.waitForXPath(selector.ecommerce.itemsList(product));
    await Handler.clickLocatorXpath(selector.ecommerce.itemsList(product));
    await Handler.waitForSelector(selector.ecommerce.itemHeading);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.itemHeading
    );
    await Handler.assertionEquals(this.elementName, product);
  }
  async addProductToWishList() {
    await Handler.waitForSelector(
      selector.ecommerce.addToFavBtn("Add to Wish List")
    );
    await Handler.clickLocator(
      selector.ecommerce.addToFavBtn("Add to Wish List")
    );
  }
  async validateSuccessFavMsg() {
    await Handler.waitForSelector(selector.ecommerce.favSuccess);
    await Handler.clickLocator(selector.ecommerce.wishListNavLink);
  }
  async removeItemFromFav() {
    await Handler.waitForSelector(selector.ecommerce.loginElements);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.loginElements
    );
    await Handler.assertionEquals(this.elementName, "My Wish List");
    await Handler.waitForSelector(selector.ecommerce.removeBtn);
    await Handler.clickLocator(selector.ecommerce.removeBtn);
    await Handler.waitForSelector(selector.ecommerce.title_desc);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(this.elementName, "Your wish list is empty.");
  }
  async addProductToCart() {
    await Handler.clickLocator(selector.ecommerce.addToCartBtn);
  }
  async validateAddedToCartMsg() {
    await Handler.waitForSelector(selector.ecommerce.favSuccess);
  }
  async removeItemFromCart() {
    await Handler.clickLocator(selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(selector.ecommerce.itemRemoveBtn);
    await Handler.clickLocator(selector.ecommerce.itemRemoveBtn);
    await Handler.waitForSelector(selector.ecommerce.title_desc);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(
      this.elementName,
      "Your shopping cart is empty!"
    );
  }
  async navigateToCartNavLink() {
    await Handler.waitForSelector(selector.ecommerce.cartNavLink);
    await Handler.clickLocator(selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_heading
    );
    await Handler.assertionInclude(this.elementName, "Shopping Cart");
  }
  async navigateToCheckout() {
    await Handler.waitForSelector(selector.ecommerce.title_heading);
    this.elementName = await Handler.getInnerHTML(
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(this.elementName, "Checkout");
  }
  async ValidateLinkedInElements() {
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.joinNowBtnLabel
    );
    await Handler.assertionEquals(this.elementName, "Join now");
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.signInBtnLabel
    );
    await Handler.assertionEquals(this.elementName, "Sign in");
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.mainHeading
    );
    await Handler.assertionEquals(
      this.elementName,
      "Welcome to your professional community"
    );
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.emailPhoneNumberInputLabel
    );
    await Handler.assertionEquals(this.elementName, "Email or phone number");
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.passwordLabel
    );
    await Handler.assertionEquals(this.elementName, "Password");
    this.elementName = await Handler.getInnerHTML(
      selector.LinkedIn.forgetPasswordLabel
    );
    await Handler.assertionEquals(this.elementName, "Forgot password?");
  }
}
module.exports = new Homepage();
module.exports.Homepage = Homepage;
