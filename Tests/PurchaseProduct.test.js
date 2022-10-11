const { globals } = require('../jest.config');
const ProductPage = require('../Pages/productpage');
const HomePage = require('../Pages/homepage');
const AppHandler = require('../utils/app_handler');
describe('Purchase order from Amazon', () => {
  it('Search, Select and Add items to cart', async () => {
    await HomePage.vitispage(globals.watch_product);
    await ProductPage.addProductToCart();
    await ProductPage.checkoutProduct();
    await ProductPage.SignIn('Email or mobile phone number', 'abc7777@g.com', 'continue');
    await HomePage.validateInvalidCredentials('We cannot find an account with that email address');
  });
});

describe('Login User', () => {
  beforeEach(async () => {
    await HomePage.vitispage(globals.pageurl1);
    await HomePage.AmazonSignInBtn();
  });
  it('Invalid Email', async () => {
    await ProductPage.SignIn('Email or mobile phone number', 'abc7777@g.com', 'continue');
    await HomePage.validateInvalidCredentials('Amazon.invalidEmail_Text');
  });
  it('Invalid Password', async () => {
    await ProductPage.SignIn(
      'Email or mobile phone number',
      'qureshi.shahid7777@gmail.com',
      'continue',
    );
    await ProductPage.SignIn('Password', '123456abc', 'signInSubmit');
    await HomePage.validateInvalidCredentials('Amazon.invalidPassword_Text');
  });
});
