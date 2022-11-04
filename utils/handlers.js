const { expect } = require("chai");
class Handler {
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
  async clickLocatorXpath(instance, locator) {
    await instance.waitForXPath(locator);
    const [selectedElement] = await instance.$x(locator);
    await selectedElement.click(locator);
  }
  async waitForXPath(instance, locator) {
    await instance.waitForXPath(locator);
  }
  async waitForSelector(instance, locator) {
    await instance.waitForSelector(locator);
  }
  async TypeOnLocator(instance, locator, value) {
    await instance.type(locator, value);
  }

  async assertionEquals(element, text) {
    expect(element.replace(/\n/g, "").trim()).to.equal(text);
  }
  async assertionInclude(element, text) {
    expect(element.replace(/\n/g, "").trim()).to.include(text);
  }
  generateString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = new Handler();
module.exports.Handler = Handler;
