const Homepage = require("../pages/homepage");
const Loginpage = require("../pages/loginpage");
describe("Complete Registration Flow", () => {
  let page;
  beforeEach(async () => {
    page = await browser.newPage();
    await Homepage.visitpage(page, "http://tutorialsninja.com/demo/");
    await page.setViewport({ width: 1300, height: 768 });
    await Homepage.navigateToActionScreen(page, "Register");
    await Homepage.validateRegisterScreen(page);
  });
  afterEach(async () => {
    await page.close();
  });
  it("Validate Register page elements", async () => {
    await Homepage.validateRegisterElements(page);
  });

  it("Register User", async () => {
    await Loginpage.registerUser(page);
    await Loginpage.logoutUser(page);
  });
});

describe("Complete Login Flow", () => {
  let page;
  beforeEach(async () => {
    page = await browser.newPage();
    await Homepage.visitpage(page, "http://tutorialsninja.com/demo/");
    await page.setViewport({ width: 1300, height: 768 });
    await Homepage.navigateToActionScreen(page, "Login");
    await Loginpage.loginuser(page);
    await Loginpage.validateLoginElements(page);
    await Homepage.navigateToCart(page);
    await Homepage.clickContinueBtn(page);
    await Homepage.selectProduct(page, "MacBook");
  });
  afterEach(async () => {
    await Loginpage.logoutUser(page);
    await page.close();
  });
  it("Add and Remove Product to Fav list and Validate", async () => {
    await Homepage.addProductToWishList(page);
    await Homepage.validateSuccessFavMsg(page);
    await Homepage.removeItemFromFav(page);
    await Homepage.clickContinueBtn(page);
  });

  it("Add Product to Cart", async () => {
    await Homepage.addProductToCart(page);
    await Homepage.validateAddedToCartMsg(page);
    await Homepage.navigateToCartNavLink(page);
    await Homepage.clickContinueBtn(page);
    await Homepage.navigateToCheckout(page);
    await Homepage.removeItemFromCart(page);
  });
});
