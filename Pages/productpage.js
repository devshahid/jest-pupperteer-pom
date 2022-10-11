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
    await AppHandler.assertionToBeWithXpath('Amazon.cartCount', 'innerText', '0');
    await AppHandler.clickXpath('Amazon.addToCartBtn');
    await page.waitForTimeout(4000);
  }
  async checkoutProduct() {
    await AppHandler.clickXpath('Amazon.addToCartBtn');
    await page.waitForTimeout(2000);
    await AppHandler.clickXpath('Amazon.closeBtn');
    await page.waitForTimeout(3000);
    await AppHandler.clickXpath('Amazon.cartBtn');
    await page.waitForTimeout(2000);
    await AppHandler.clickXpath('Amazon.checkoutBtn');
  }
  async SignIn(text, email) {
    await AppHandler.waitForXpath('Amazon.title_text', text);
    await AppHandler.typeXpath('Amazon.inputFieldEmailSignIn', email);
  }
}
module.exports = new ProductPage();
module.exports.ProductPage = ProductPage;
