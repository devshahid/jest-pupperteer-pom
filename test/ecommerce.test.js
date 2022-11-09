const Homepage = require("../pages/homepage");
const Loginpage = require("../pages/loginpage");
describe("Complete Registration Flow", () => {
  beforeEach(async () => {
    await Homepage.visitpage("http://tutorialsninja.com/demo/");
    await Homepage.navigateToActionScreen("Register");
    await Homepage.validateRegisterScreen();
  });
  it("Validate Register  elements", async () => {
    await Homepage.validateRegisterElements();
  });

  it("Register User", async () => {
    // add option to form fill
    await Loginpage.registerUser();
    await Loginpage.logoutUser();
  });
});

// describe("Complete Login Flow", () => {
//   beforeEach(async () => {
//     //  = await browser.newPage();
//     await Homepage.visitpage("http://tutorialsninja.com/demo/");
//     await Homepage.navigateToActionScreen("Login");
//     await Loginpage.loginuser();
//     await Loginpage.validateLoginElements();
//     await Homepage.navigateToCart();
//     await Homepage.clickContinueBtn();
//     await Homepage.selectProduct("MacBook");
//   });
//   afterEach(async () => {
//     await Loginpage.logoutUser();
//   });
//   it("Add and Remove Product to Fav list and Validate", async () => {
//     await Homepage.addProductToWishList();
//     await Homepage.validateSuccessFavMsg();
//     await Homepage.removeItemFromFav();
//     await Homepage.clickContinueBtn();
//   });

//   it("Add Product to Cart", async () => {
//     await Homepage.addProductToCart();
//     await Homepage.validateAddedToCartMsg();
//     await Homepage.navigateToCartNavLink();
//     await Homepage.clickContinueBtn();
//     await Homepage.navigateToCheckout();
//     await Homepage.removeItemFromCart();
//   });
// });
