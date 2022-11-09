const { expect } = require("chai");
class Handler {
  async getInnerHTML(locator) {
    return await page.$eval(locator, (el) => el.innerHTML);
  }
  async getArrayOfInnerHTML(locator) {
    return await page.$$eval(locator, (options) =>
      options.map((option) => option.innerHTML.replace(/\n/g, "").trim())
    );
  }
  async clickLocator(locator) {
    await page.click(locator);
  }
  async clickLocatorXpath(locator) {
    await page.waitForXPath(locator);
    const [selectedElement] = await page.$x(locator);
    await selectedElement.click(locator);
  }
  async waitForXPath(locator) {
    await page.waitForXPath(locator);
  }
  async waitForSelector(locator) {
    await page.waitForSelector(locator);
  }
  async TypeOnLocator(locator, value) {
    await page.type(locator, value);
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
