const AppHandler = require('../utils/app_handler');
class ProductPage {
  async searchProduct(productType) {
    await AppHandler.waitForXpath('Amazon.searchBar');
    await AppHandler.assertionToBeWithXpath('Amazon.menuItems', 'innerText', 'Best Sellers');
    await AppHandler.assertionToBeWithXpath('Amazon.menuItems', 'innerText', 'Mobiles');
    await AppHandler.typeXpath('Amazon.searchBar', productType);
    await AppHandler.clickXpath('Amazon.searchBtn');
  }
  async waitForNavigation() {
    await AppHandler.waitForPageNavigation();
  }
  async validateProducts() {
    await AppHandler.assertionToBeWithXpath(
      'Amazon.product_title',
      'innerText',
      'Amazon.product_1_title',
    );
  }
  async addProductToCart() {
    // await AppHandler.assertionToBeWithXpath('Amazon.cartCount', 'innerText', '0');
    await AppHandler.clickXpath('Amazon.addToCartBtn');
  }
  async checkoutProduct() {
    await AppHandler.clickXpath('Amazon.addToCartBtn');
    await AppHandler.clickXpath('Amazon.closeBtn');
    await AppHandler.clickXpath('Amazon.cartBtn');
    await AppHandler.clickXpath('Amazon.checkoutBtn');
  }
  async SignIn(text, email, buttonType) {
    await AppHandler.waitForXpath('Amazon.title_text', text);
    await AppHandler.typeXpath('Amazon.inputFieldEmailSignIn', email);
    await AppHandler.clickXpath('Amazon.continueBtn', buttonType);
  }
  async SignInWithInstance(instance, text, email, buttonType) {
    await AppHandler.waitForXpathWithInstance(instance, 'Amazon.title_text', text);
    await AppHandler.typeXpathWithInstance(instance, 'Amazon.inputFieldEmailSignIn', email);
    await AppHandler.clickXpathWithInstace(instance, 'Amazon.continueBtn', buttonType);
  }
}
module.exports = new ProductPage();
module.exports.ProductPage = ProductPage;
