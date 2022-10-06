const HomePage = require('../Pages/homepage');
describe('Enter User Credentials and Purchase product', () => {
  it('Complete order purchase', async () => {
    await HomePage.vitispage();
    await HomePage.validateUserNameAndPasswordFields();
    await HomePage.enterLoginDetails();
    await HomePage.clickLoginBtn();
    await HomePage.validateFirstItemDetails();
    await HomePage.additemToCart();
    await HomePage.continueToCheckoutPage();
    await HomePage.continueToCheckoutProduct();
    await HomePage.enterShippingDetails();
    await HomePage.continueToOrderConfirmationScreen();
    await HomePage.validateOrderDetailsConfirmationScreen();
    await HomePage.continueToFinishOrderPurchase();
    await HomePage.validateOrderSuccessScreen();
  });
});

describe('Login and Logout User', () => {
  it('Take user to the dashboard and return back to login page', async () => {
    await HomePage.vitispage();
    await HomePage.validateUserNameAndPasswordFields();
    await HomePage.enterLoginDetails();
    await HomePage.clickLoginBtn();
    await HomePage.clickOnLogoutBtn();
    await HomePage.validateUserNameAndPasswordFields();
  });
});
