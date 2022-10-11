const { globals } = require('../jest.config');
const AccountPage = require('../Pages/accountpage');
const HomePage = require('../Pages/homepage');
const AppHandler = require('../utils/app_handler');
describe('Validate Account Items', () => {
  it('Validate Your orders', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Your Orders', 'Track, return, or buy things again');
  });
  it('Validate Login & Security orders', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Login & security', 'Edit login, name, and mobile number');
  });
  it('Validate Prime Card', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Prime', 'View benefits and payment settings');
  });
  it('Validate Your Address Card', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Your Addresses', 'Edit addresses for orders and gifts');
  });
  it('Validate Payment options Card', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Payment options', 'Edit or add payment methods');
  });
  it('Validate Amazon Pay balance Card', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await AppHandler.clickXpath('Amazon.hamburger');
    await AppHandler.clickXpath('Amazon.Hamburger_Items', 'Your Account');
    await AppHandler.waitForXpath('Amazon.Account_Title', 'Your Account');
    await AppHandler.assertionToBeWithXpath('Amazon.Account_Title', 'innerText', 'Your Account');
    await AccountPage.validateItemCard('Amazon Pay balance', 'Add money to your balance');
  });
});
