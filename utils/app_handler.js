const CommonUtils = require('./common');
class AppHandler {
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
  initializeParams(locator, property, inputValue) {
    this.locator = CommonUtils.identifyLocator(locator);
    this.property = CommonUtils.identifyData(property);
    this.inputValue = CommonUtils.identifyData(inputValue);
  }
  /**
   * This method is used select the specific element from the locator.
   * @param {*} locator
   */
  async selectElement(locator) {
    this.initializeParams(locator);
    return await page.$(this.locator);
  }

  /**
   * This method is used get the property of specific element from the locator and the name of property.
   * @param {*} selector
   * @param {*} property
   */
  async getElementProperty(selector, property) {
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
    this.initializeParams(locator, property, inputValue);
    expect(await this.getElementProperty(selector, this.property)).toBe(this.inputValue);
  }
  /**
   * Everytime get 2 parameters. This method is used to make the assertion case 'not to ToBe'.
   * @param {*} locator
   * @param {*} property
   */
  async assertionNotToBe(locator, property) {
    let selector = await this.selectElement(locator);
    this.initializeParams(locator, property);
    expect(await this.getElementProperty(selector, this.property)).not.toBeNull();
  }
  /**
   * This method is used wait for the locator for sometime untill it appears on the screen.
   * @param {*} locator
   */
  async waitForSelector(locator) {
    this.initializeParams(locator);
    await page.waitForSelector(this.locator);
  }
  /**
   * This method is used fill the input field of specific locator with the given input value.
   * @param {*} locator
   * @param {*} inputValue
   */
  async type(locator, inputValue, property = '') {
    this.initializeParams(locator, property, inputValue);
    await page.waitForSelector(this.locator);
    await page.type(this.locator, this.inputValue);
  }
  /**
   * This method is used click on locator.
   * @param {*} locator
   */
  async click(locator) {
    this.initializeParams(locator);
    await page.waitForSelector(this.locator);
    await page.click(this.locator);
  }
}

module.exports = new AppHandler();
