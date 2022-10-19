const Handler = require('../utils/handlers');
const selector = require('../locators/locators');
class ProductPage {
  async searchProduct(productType) {
    await Handler.waitForXpath(page, selector.Amazon.searchBar);
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.menuItems('Best Sellers'),
      'innerText',
      'Best Sellers',
    );
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.menuItems('Mobiles'),
      'innerText',
      'Mobiles',
    );
    await Handler.typeXpath(page, selector.Amazon.searchBar, productType);
    await Handler.clickXpath(page, selector.Amazon.searchBtn);
  }
  async waitForNavigation() {
    await Handler.waitForPageNavigation();
  }
  async validateProducts() {
    await Handler.assertionToBeWithXpath(
      page,
      'Amazon.product_title',
      'innerText',
      'Amazon.product_1_title',
    );
  }
  async addProductToCart() {
    // await Handler.assertionToBeWithXpath('Amazon.cartCount', 'innerText', '0');
    await Handler.clickXpath(page, selector.Amazon.addToCartBtn);
  }
  async checkoutProduct() {
    await Handler.clickXpath(page, selector.Amazon.addToCartBtn);
    await Handler.clickXpath(page, selector.Amazon.closeBtn);
    await Handler.clickXpath(page, selector.Amazon.cartBtn);
    await Handler.clickXpath(page, selector.Amazon.checkoutBtn);
  }
  async SignIn(instance, text, email, buttonType) {
    await Handler.waitForXpath(instance, selector.Amazon.title_text(text));
    await Handler.typeXpath(instance, selector.Amazon.inputFieldEmailSignIn, email);
    await Handler.clickXpath(instance, selector.Amazon.continueBtn(buttonType));
  }
}
module.exports = new ProductPage();
module.exports.ProductPage = ProductPage;
