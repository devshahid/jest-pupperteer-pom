const { globals } = require('../jest.config');
const ProductPage = require('../Pages/productpage');
const HomePage = require('../Pages/homepage');
const AppHandler = require('../utils/app_handler');
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
    await AppHandler.clickXpath(page, 'Amazon.product_title', 'Amazon.product_title');
    await page.waitForTimeout(5000);
    const pages = await browser.pages();
    await pages[2].bringToFront();
    await pages[2].waitForTimeout(5000);
    await AppHandler.clickXpath(pages[2], 'Amazon.addToCartBtn');
    await AppHandler.clickXpath(pages[2], 'Amazon.cartCount');
    await AppHandler.clickXpath(pages[2], 'Amazon.checkoutBtn');
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
    await HomePage.validateInvalidCredentials('Amazon.invalidEmail_Text');
  });
  it('Invalid Password', async () => {
    await ProductPage.SignIn(
      page,
      'Email or mobile phone number',
      'qureshi.shahid7777@gmail.com',
      'continue',
    );
    await ProductPage.SignIn(page, 'Password', '123456abc', 'signInSubmit');
    await HomePage.validateInvalidCredentials('Amazon.invalidPassword_Text');
  });
});
