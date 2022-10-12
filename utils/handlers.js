const CommonUtils = require('./common');
const selector = require('../locators/locators');
class Handler {
  /**
   * reset this parameter values
   */
  constructor() {
    this.locator = '';
    this.inputValue = '';
    this.property = '';
  }
  /**
   * every time initializes 3 main parameters app handler
   * this method is reused to initialize each method call
   * caller no need to worry about constructing actual value
   * And initializes
   * @param {*} locator
   * @param {*} property
   * @param {*} inputValue
   */
  initializeParams(locator, property, inputValue, replaceText) {
    this.locator = CommonUtils.identifyLocator(locator);
    this.property = CommonUtils.identifyData(property);
    this.inputValue = CommonUtils.identifyData(inputValue);
    this.replaceText = CommonUtils.identifyData(replaceText);
  }
  /**
   * This method is used select the specific element from the locator.
   * @param {*} locator
   */
  async selectElement(locator) {
    return await page.$(locator);
  }

  /**
   * This method is used get the property of specific element from the locator and the name of property.
   * @param {*} selector
   * @param {*} property
   */
  async getElementProperty(selector) {
    console.log(selector, await selector.getProperty(this.property));
    return await (await selector.getProperty(this.property)).jsonValue();
  }
  /**
   * Everytime get 3 parameters. This method is used to make the assertion case to 'ToBe'.
   * @param {*} locator
   * @param {*} property
   * @param {*} inputValue
   */
  async assertionToBe(locator, property, inputValue) {
    let selector = await this.selectElement(locator);
    // console.log(selector);
    // expect(await this.getElementProperty(selector, property)).toBe(inputValue);

    const [elementHandle] = await page.$(locator);
    const propertyHandle = await elementHandle.getProperty(property);
    const propertyValue = await propertyHandle.jsonValue();
    expect(propertyValue).toBe(inputValue);
  }

  /**
   * Everytime get 3 parameters. This method is used to make the assertion case to 'ToBe' using X-Path.
   * @param {*} locator
   * @param {*} property
   * @param {*} inputValue
   */
  async assertionToBeWithXpath(instance, locator, property, inputValue) {
    const [elementHandle] = await instance.$x(locator);
    const propertyHandle = await elementHandle.getProperty(property);
    const propertyValue = await propertyHandle.jsonValue();
    expect(propertyValue).toBe(inputValue);
  }
  /**
   * Everytime get 2 parameters. This method is used to make the assertion case 'not to ToBe'.
   * @param {*} locator
   * @param {*} property
   */
  async assertionNotToBe(locator, property) {
    let selector = await this.selectElement(locator);
    expect(await this.getElementProperty(selector, property)).not.toBeNull();
  }
  /**
   * This method is used wait for the locator for sometime untill it appears on the screen.
   * @param {*} locator
   */
  async waitForSelector(locator) {
    await page.waitForSelector(locator);
  }
  /**
   * This method is used wait for the locator for sometime untill it appears on the screen.
   * @param {*} locator
   */
  async waitForXpath(instance, locator) {
    await instance.waitForXPath(locator);
  }
  /**
   * This method is used fill the input field of specific locator with the given input value.
   * @param {*} locator
   * @param {*} inputValue
   */
  async type(locator, inputValue) {
    await page.waitForSelector(locator);
    await page.type(locator, inputValue);
  }
  /**
   * This method is used fill the input field of specific locator with the given input value for Xpath.
   * @param {*} locator
   * @param {*} inputValue
   */
  async typeXpath(instance, locator, inputValue) {
    await instance.waitForXPath(locator);
    const [selectedElement] = await instance.$x(locator);
    await selectedElement.type(inputValue);
  }
  /**
   * This method is used click on locator.
   * @param {*} locator
   */
  async click(locator) {
    await page.waitForSelector(locator);
    await page.click(locator);
  }
  /**
   * This method is used click on locator of xpath.
   * @param {*} locator
   */
  async clickXpath(instance, locator) {
    await instance.waitForXPath(locator);
    const [selectedElement] = await instance.$x(locator);
    await selectedElement.click(locator);
  }
  async waitForPageNavigation() {
    await page.waitForNavigation();
  }
}

module.exports = new Handler();
