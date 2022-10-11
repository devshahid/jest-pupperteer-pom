const { globals } = require('../jest.config');
const ProductPage = require('../Pages/productpage');
const HomePage = require('../Pages/homepage');
const AppHandler = require('../utils/app_handler');
describe('Purchase order from Amazon', () => {
  it('Search, Select and Add items to cart', async () => {
    await HomePage.vitispage(globals.watch_product);
    await ProductPage.addProductToCart();
    await ProductPage.checkoutProduct();
    await ProductPage.SignIn('Email or mobile phone number', 'abc7777@g.com');
    await AppHandler.clickXpath('Amazon.continueBtn', 'continue');
    await HomePage.validateInvalidCredentials('Amazon.invalidEmail_Text');
  });
});

describe('Login User', () => {
  it('Invalid Email', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await HomePage.AmazonSignInBtn();
    await ProductPage.SignIn('Email or mobile phone number', 'abc7777@g.com');
    await AppHandler.clickXpath('Amazon.continueBtn', 'continue');
    await HomePage.validateInvalidCredentials('Amazon.invalidEmail_Text');
  });
  it('Invalid Password', async () => {
    await HomePage.vitispage(globals.pageurl1);
    await HomePage.AmazonSignInBtn();
    await ProductPage.SignIn('Email or mobile phone number', 'qureshi.shahid7777@gmail.com');
    await AppHandler.clickXpath('Amazon.continueBtn', 'continue');
    await ProductPage.SignIn('Password', '123456abc');
    await AppHandler.clickXpath('Amazon.continueBtn', 'signInSubmit');
    await HomePage.validateInvalidCredentials('Amazon.invalidPassword_Text');
  });
});
