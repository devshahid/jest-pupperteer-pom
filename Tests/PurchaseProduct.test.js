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

    //save target of original page to know that this was the opener:
    const pageTarget = page.target();
    //execute click on first tab that triggers opening of new tab:
    await Handler.clickXpath(
      page,
      selector.Amazon.product_title(
        'Newly launched Biggest Display Zebronics Eternal Bluetooth Calling Smartwatch, 1.85" , Voice Assistant, 10 Built-in & 100+ Watch Faces, 123 Sport Modes, IP67, 8 Menu UI, 4 Games, Calculator (Black)',
      ),
    );
    //check that the first page opened this new page:
    const newTarget = await browser.waitForTarget((target) => target.opener() === pageTarget);
    //get the new page object:
    const newPage = await newTarget.page();

    await Handler.clickXpath(newPage, selector.Amazon.addToCartBtn);
    await Handler.clickXpath(newPage, selector.Amazon.cartCount);
    await Handler.clickXpath(newPage, selector.Amazon.checkoutBtn);
    await ProductPage.SignIn(newPage, 'Email or mobile phone number', 'abc7777@g.com', 'continue');
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
