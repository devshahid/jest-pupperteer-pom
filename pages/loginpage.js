const { expect } = require("chai");
const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
class Loginpage {
  async registerUser(page) {
    let emailadd = `${Handler.generateString(5)}@gmail.com`;
    let elementArr = [
      "firstname",
      "lastname",
      "email",
      "telephone",
      "password",
      "confirm",
    ];
    let elementText = [
      "Testing",
      "User",
      emailadd,
      "1098908790",
      "testuser",
      "testuser",
    ];
    for (let i in elementArr) {
      await Handler.TypeOnLocator(
        page,
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("checkbox"));
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("submit"));
  }
  async logoutUser(page) {
    await Handler.waitForXPath(page, selector.ecommerce.menuitem("My Account"));
    page, selector.ecommerce.menuitem("My Account");
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.menuitem("My Account")
    );
    await Handler.clickLocatorXpath(
      page,
      selector.ecommerce.dropdown_item("Logout")
    );
  }
  async loginuser(page) {
    await Handler.waitForSelector(page, selector.ecommerce.loginScreen);
    let elementArr = ["email", "password"];
    let elementText = ["user2@testing.com", "testuser"];
    for (let i in elementArr) {
      await Handler.TypeOnLocator(
        page,
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(page, selector.ecommerce.actionBtn("submit"));
  }
  async validateLoginElements(page) {
    let options = await Handler.getArrayOfInnerHTML(
      page,
      selector.ecommerce.loginElements
    );
    options.sort();
    let elements = [
      "My Account",
      "My Orders",
      "My Affiliate Account",
      "Newsletter",
    ];
    elements.sort();
    expect(options).to.eql(elements);
  }
}
module.exports = new Loginpage();
module.exports.Loginpage = Loginpage;
