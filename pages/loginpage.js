const Handler = require("../utils/handlers");

class Logininstance {
  async getInnerHTML(instance, locator) {
    return await instance.$eval(locator, (el) => el.innerHTML);
  }
  async getArrayOfInnerHTML(instance, locator) {
    return await instance.$$eval(locator, (options) =>
      options.map((option) => option.innerHTML.replace(/\n/g, "").trim())
    );
  }
  async clickLocator(instance, locator) {
    await instance.click(locator);
  }
  async waitForSelector(instance, locator) {
    await instance.waitForSelector(locator);
  }
  async TypeOnLocator(instance, locator, value) {
    await instance.type(locator, value);
  }
}
module.exports = new Logininstance();
module.exports.Logininstance = Logininstance;
