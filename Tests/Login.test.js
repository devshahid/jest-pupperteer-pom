const HomePageMA = require("../Pages/homepage");
const CommonUtils = require("../utils/common");
describe("Login User", () => {
  it("Visit Home page", async () => {
    await HomePageMA.vitispage("saucedemo");
  });
  it("Validate username and password fields", async () => {
    await HomePageMA.validateUserNameAndPasswordFields();
  });
});
// global hooks for before and after
