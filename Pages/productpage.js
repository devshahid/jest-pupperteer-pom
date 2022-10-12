const AppHandler = require('../utils/app_handler');
class ProductPage {
  async searchProduct(productType) {
    await AppHandler.waitForXpath(page, 'Amazon.searchBar');
    await AppHandler.assertionToBeWithXpath(page, 'Amazon.menuItems', 'innerText', 'Best Sellers');
    await AppHandler.assertionToBeWithXpath(page, 'Amazon.menuItems', 'innerText', 'Mobiles');
    await AppHandler.typeXpath(page, 'Amazon.searchBar', productType);
    await AppHandler.clickXpath(page, 'Amazon.searchBtn');
  }
  async waitForNavigation() {
    await AppHandler.waitForPageNavigation();
  }
  async validateProducts() {
    await AppHandler.assertionToBeWithXpath(
      page,
      'Amazon.product_title',
      'innerText',
      'Amazon.product_1_title',
    );
  }
  async addProductToCart() {
    // await AppHandler.assertionToBeWithXpath('Amazon.cartCount', 'innerText', '0');
    await AppHandler.clickXpath(page, 'Amazon.addToCartBtn');
  }
  async checkoutProduct() {
    await AppHandler.clickXpath(page, 'Amazon.addToCartBtn');
    await AppHandler.clickXpath(page, 'Amazon.closeBtn');
    await AppHandler.clickXpath(page, 'Amazon.cartBtn');
    await AppHandler.clickXpath(page, 'Amazon.checkoutBtn');
  }
  async SignIn(instance, text, email, buttonType) {
    await AppHandler.waitForXpath(instance, 'Amazon.title_text', text);
    await AppHandler.typeXpath(instance, 'Amazon.inputFieldEmailSignIn', email);
    await AppHandler.clickXpath(instance, 'Amazon.continueBtn', buttonType);
  }
  async SignInWithInstance(instance, text, email, buttonType) {
    await AppHandler.waitForXpathWithInstance(instance, 'Amazon.title_text', text);
    await AppHandler.typeXpathWithInstance(instance, 'Amazon.inputFieldEmailSignIn', email);
    await AppHandler.clickXpathWithInstace(instance, 'Amazon.continueBtn', buttonType);
  }
}
module.exports = new ProductPage();
module.exports.ProductPage = ProductPage;
