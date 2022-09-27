const CommonUtils = require("../utils/common");
class HomePageMA {
  async vitispage(site) {
    await page.goto(`https://www.${site}.com`);
  }
  async validateUserNameAndPasswordFields() {
    await page.waitForSelector(CommonUtils.identifyLocator("Login.username"));
    await page.waitForSelector(CommonUtils.identifyLocator("Login.password"));
    const data = await page.$eval(
      CommonUtils.identifyLocator("Login.password"),
      (el) => el.textContent
    );
    console.log(data);
  }
}
module.exports = new HomePageMA();
module.exports.HomePageMA = HomePageMA;
