const { globals } = require('../jest.config');
const ProductPage = require('../Pages/productpage');
const HomePage = require('../Pages/homepage');
const Handler = require('../utils/handlers');
const selector = require('../locators/locators');
describe('Purchase order from Amazon', () => {
  it('Search, Select and Add items to cart', async () => {
    await HomePage.vitispage(globals.watch_product);
    await ProductPage.addProductToCart();
    await ProductPage.checkoutProduct();
    await ProductPage.SignIn(page, 'Email or mobile phone number', 'abc7777@g.com', 'continue');
    await HomePage.validateInvalidCredentials('We cannot find an account with that email address');
  });
});
describe('Search and Buy Product', () => {
  it('Search for specific product and purhcase it form amazon', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await ProductPage.searchProduct('smart watch');
    await Handler.clickXpath(
      page,
      selector.Amazon.product_title(
        'ZEBRONICS Zeb-Fit 580ch Bluetooth Smart Watch, 4.69cm Capacitive touch screen and 1 button on the Right side,7 Days Data Storage, BP & Heart Rate Monitor, IP67 Waterproof, Multiple Watch Faces (Black)',
      ),
    );
    await page.waitForTimeout(2000);
    const pages = await browser.pages();
    await pages[2].bringToFront();
    await Handler.clickXpath(pages[2], selector.Amazon.addToCartBtn);
    await Handler.clickXpath(pages[2], selector.Amazon.cartCount);
    await Handler.clickXpath(pages[2], selector.Amazon.checkoutBtn);
    await ProductPage.SignIn(pages[2], 'Email or mobile phone number', 'abc7777@g.com', 'continue');
  });
});
describe('Login User', () => {
  beforeEach(async () => {
    await HomePage.vitispage(globals.pageurl1);
    await HomePage.AmazonSignInBtn();
  });
  it('Invalid Email', async () => {
    await ProductPage.SignIn(page, 'Email or mobile phone number', 'abc7777@g.com', 'continue');
    await HomePage.validateInvalidCredentials('We cannot find an account with that email address');
  });
  it('Invalid Password', async () => {
    await ProductPage.SignIn(
      page,
      'Email or mobile phone number',
      'qureshi.shahid7777@gmail.com',
      'continue',
    );
    await ProductPage.SignIn(page, 'Password', '123456abc', 'signInSubmit');
    await HomePage.validateInvalidCredentials('Your password is incorrect');
  });
});
