const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
class Homepage {
  async visitpage(page, url) {
    console.log(url);
    await page.goto(url);
  }
  async navigateToRegisterScreen(page, action) {
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
    let elementName;
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
  }
  async validateRegisterElements(page) {
    let elementName;
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
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.itemHeading
    );
    await Handler.assertionEquals(elementName, product);
  }
  async addProductToWishList(page) {
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
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_desc
    );
    await Handler.assertionEquals(elementName, "Your shopping cart is empty!");
  }
  async navigateToCartNavLink(page) {
    await Handler.clickLocator(page, selector.ecommerce.cartNavLink);
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionInclude(elementName, "Shopping Cart");
  }
  async navigateToCheckout(page) {
    await Handler.waitForSelector(page, selector.ecommerce.title_heading);
    elementName = await Handler.getInnerHTML(
      page,
      selector.ecommerce.title_heading
    );
    await Handler.assertionEquals(elementName, "Checkout");
  }
}
module.exports = new Homepage();
module.exports.Homepage = Homepage;
