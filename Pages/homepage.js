const { globals } = require('../jest.config');
const AppHandler = require('../utils/app_handler');
class HomePage {
  async vitispage() {
    await page.goto(globals.pageurl);
  }

  async validateUserNameAndPasswordFields() {
    await AppHandler.waitForSelector('Login.username');
    await AppHandler.waitForSelector('Login.password');
    await AppHandler.selectElement('Login.username');
    await AppHandler.assertionToBe('Login.username', 'placeholder', 'Username');
    await AppHandler.assertionToBe('Login.password', 'placeholder', 'Password');
  }
  async enterLoginDetails() {
    await AppHandler.type('Login.username', 'standard_user');
    await AppHandler.type('Login.password', 'secret_sauce');
  }
  async clickLoginBtn() {
    await AppHandler.click('Login.loginBtn');
  }
  async validateFirstItemDetails() {
    await AppHandler.waitForSelector('Login.firstItem_title');
    await AppHandler.waitForSelector('Login.firstItem_description');
    await AppHandler.waitForSelector('Login.firstItem_amount');
    await AppHandler.assertionToBe('Login.firstItem_title', 'textContent', 'product_title1');
    await AppHandler.assertionToBe(
      'Login.firstItem_description',
      'textContent',
      'product_description1',
    );
    await AppHandler.assertionToBe('Login.firstItem_amount', 'textContent', '$29.99');
  }
  async additemToCart() {
    expect(await AppHandler.selectElement('Login.shopping_cart_count')).toBe(null);
    await AppHandler.click('Login.firstItem_AddCart');
    await AppHandler.assertionNotToBe('Login.shopping_cart_count', 'textContent');
  }
  async continueToCheckoutPage() {
    await AppHandler.click('Login.shopping_cart');
  }
  async continueToCheckoutProduct() {
    await AppHandler.click('Login.checkoutBtn');
  }
  async enterShippingDetails() {
    await AppHandler.type('Login.firstNameField', 'Shahid');
    await AppHandler.type('Login.lastNameField', 'Qureshi');
    await AppHandler.type('Login.zipCodeField', '492001');
  }
  async continueToOrderConfirmationScreen() {
    await AppHandler.click('Login.continueBtn');
  }

  async validateOrderDetailsConfirmationScreen() {
    await AppHandler.assertionToBe('Login.firstItem_title', 'textContent', 'product_title1');
    await AppHandler.assertionToBe(
      'Login.firstItem_orderDescription',
      'textContent',
      'product_description1',
    );
    await AppHandler.assertionToBe('Login.firstItem_orderAmount', 'textContent', 'product_amount1');
  }
  async continueToFinishOrderPurchase() {
    await AppHandler.click('Login.finishBtn');
  }
  async validateOrderSuccessScreen() {
    await AppHandler.assertionToBe(
      'Login.orderComplete_Title',
      'textContent',
      'orderSuccess_Title',
    );
    await AppHandler.assertionToBe(
      'Login.orderComplete_Description',
      'textContent',
      'orderSuccess_desc',
    );
  }
  async clickOnLogoutBtn() {
    await AppHandler.click('Login.sideBtn');
    await AppHandler.assertionToBe('Login.logoutBtn', 'textContent', 'Logout');
    await AppHandler.click('Login.logoutBtn');
  }
}
module.exports = new HomePage();
module.exports.HomePage = HomePage;
