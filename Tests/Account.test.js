const { globals } = require('../jest.config');
const AccountPage = require('../Pages/accountpage');
const HomePage = require('../Pages/homepage');
const Handler = require('../utils/handlers');
const selector = require('../locators/locators');

describe('Validate Account Items', () => {
  beforeEach(async () => {
    await HomePage.vitispage(globals.pageurl1);
    await Handler.clickXpath(page, selector.Amazon.hamburger);
    console.log(selector.Amazon.Hamburger_Items('Your Account'));
    await Handler.clickXpath(page, selector.Amazon.Hamburger_Items('Your Account'));
    await Handler.waitForXpath(page, selector.Amazon.Account_Title('Your Account'));
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.Account_Title('Your Account'),
      'innerText',
      'Your Account',
    );
  });
  it('Validate Your orders', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Your Orders'));
    await AccountPage.validateItemCard('Your Orders', 'Track, return, or buy things again');
  });
  it('Validate Login & Security orders', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Login & security'));
    await AccountPage.validateItemCard('Login & security', 'Edit login, name, and mobile number');
  });
  it('Validate Prime Card', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Prime'));
    await AccountPage.validateItemCard('Prime', 'View benefits and payment settings');
  });
  it('Validate Your Address Card', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Your Addresses'));
    await AccountPage.validateItemCard('Your Addresses', 'Edit addresses for orders and gifts');
  });
  it('Validate Payment options Card', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Payment options'));
    await AccountPage.validateItemCard('Payment options', 'Edit or add payment methods');
  });
  it('Validate Amazon Pay balance Card', async () => {
    await Handler.waitForXpath(page, selector.Amazon.card_Title('Amazon Pay balance'));
    await AccountPage.validateItemCard('Amazon Pay balance', 'Add money to your balance');
  });
});
