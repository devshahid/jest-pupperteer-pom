const Handler = require('../utils/handlers');
const selector = require('../locators/locators');
class HomePage {
  async vitispage(pageurl) {
    await page.goto(pageurl, { waitUntil: 'networkidle0' });
  }

  async validateUserNameAndPasswordFields() {
    await Handler.waitForSelector(selector.Login.username);
    await Handler.waitForSelector(selector.Login.password);
    await Handler.selectElement(selector.Login.username);
    await Handler.assertionToBe(selector.Login.username, 'placeholder', 'Username');
    await Handler.assertionToBe(selector.Login.password, 'placeholder', 'Password');
  }
  async enterLoginDetails() {
    await Handler.type(selector.Login.username, 'standard_user');
    await Handler.type(selector.Login.password, 'secret_sauce');
  }
  async clickLoginBtn() {
    await Handler.click(selector.Login.loginBtn);
  }
  async validateFirstItemDetails() {
    await Handler.waitForSelector(selector.Login.firstItem_title);
    await Handler.waitForSelector(selector.Login.firstItem_description);
    await Handler.waitForSelector(selector.Login.firstItem_amount);
    await Handler.assertionToBe(
      selector.Login.firstItem_title,
      'textContent',
      'Sauce Labs Backpack',
    );
    await Handler.assertionToBe(
      selector.Login.firstItem_description,
      'textContent',
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await Handler.assertionToBe(selector.Login.firstItem_amount, 'textContent', '$29.99');
  }
  async additemToCart() {
    expect(await Handler.selectElement(selector.Login.shopping_cart_count)).toBe(null);
    await Handler.click(selector.Login.firstItem_AddCart);
    await Handler.assertionNotToBe(selector.Login.shopping_cart_count, 'textContent');
  }
  async continueToCheckoutPage() {
    await Handler.click(selector.Login.shopping_cart);
  }
  async continueToCheckoutProduct() {
    await Handler.click(selector.Login.checkoutBtn);
  }
  async enterShippingDetails() {
    await Handler.type(selector.Login.firstNameField, 'Shahid');
    await Handler.type(selector.Login.lastNameField, 'Qureshi');
    await Handler.type(selector.Login.zipCodeField, '492001');
  }
  async continueToOrderConfirmationScreen() {
    await Handler.click(selector.Login.continueBtn);
  }

  async validateOrderDetailsConfirmationScreen() {
    await Handler.assertionToBe(
      selector.Login.firstItem_title,
      'textContent',
      'Sauce Labs Backpack',
    );
    await Handler.assertionToBe(
      selector.Login.firstItem_orderDescription,
      'textContent',
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await Handler.assertionToBe(selector.Login.firstItem_orderAmount, 'textContent', '$29.99');
  }
  async continueToFinishOrderPurchase() {
    await Handler.click(selector.Login.finishBtn);
  }
  async validateOrderSuccessScreen() {
    await Handler.assertionToBe(
      selector.Login.orderComplete_Title,
      'textContent',
      'THANK YOU FOR YOUR ORDER',
    );
    await Handler.assertionToBe(
      selector.Login.orderComplete_Description,
      'textContent',
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
  }
  async clickOnLogoutBtn() {
    await Handler.click(selector.Login.sideBtn);
    await Handler.assertionToBe(selector.Login.logoutBtn, 'textContent', 'Logout');
    await Handler.click(selector.Login.logoutBtn);
  }
  async AmazonSignInBtn() {
    await Handler.clickXpath(page, selector.Amazon.homeSignIn);
  }
  async validateInvalidCredentials(invalidCredentials) {
    await Handler.waitForXpath(page, selector.Amazon.invalidCredentials_desc(invalidCredentials));
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.invalidCredentials_desc(invalidCredentials),
      'innerText',
      invalidCredentials,
    );
  }
}
module.exports = new HomePage();
module.exports.HomePage = HomePage;
