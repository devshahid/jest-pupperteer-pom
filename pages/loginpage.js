const { expect } = require("chai");
const selector = require("../locators/locators");
const Handler = require("../utils/handlers");
class Loginpage {
  async registerUser() {
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
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(selector.ecommerce.actionBtn("checkbox"));
    await Handler.clickLocator(selector.ecommerce.actionBtn("submit"));
  }
  async logoutUser() {
    await Handler.waitForXPath(selector.ecommerce.menuitem("My Account"));
    selector.ecommerce.menuitem("My Account");
    await Handler.clickLocatorXpath(selector.ecommerce.menuitem("My Account"));
    await Handler.clickLocatorXpath(selector.ecommerce.dropdown_item("Logout"));
  }
  async loginuser() {
    await Handler.waitForSelector(selector.ecommerce.loginScreen);
    let elementArr = ["email", "password"];
    let elementText = ["user2@testing.com", "testuser"];
    for (let i in elementArr) {
      await Handler.TypeOnLocator(
        selector.ecommerce.register_inputs(elementArr[i]),
        elementText[i]
      );
    }
    await Handler.clickLocator(selector.ecommerce.actionBtn("submit"));
  }
  async validateLoginElements() {
    let options = await Handler.getArrayOfInnerHTML(
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
  async signUpWithoutEmailAndValidate() {
    await Handler.clickLocator(selector.LinkedIn.joinNowBtnLabel);
    await Handler.clickLocator(selector.LinkedIn.continueBtn);
    await Handler.waitForSelector(selector.LinkedIn.errorlabels);

    const options = await Handler.getArrayOfInnerHTML(
      selector.LinkedIn.errorlabels
    );
    options.sort();
    let errorMsgs = [
      "Please enter your email address or mobile number.",
      "Please enter your password.",
    ];
    errorMsgs.sort();
    expect(options).to.eql(errorMsgs);
  }
  async signUpWithEmailAndValidate() {
    await Handler.clickLocator(selector.LinkedIn.joinNowBtnLabel);
    await Handler.TypeOnLocator(
      selector.LinkedIn.InputField("email-or-phone"),
      "testing0909876@gmail.com"
    );
    await Handler.TypeOnLocator(
      selector.LinkedIn.InputField("password"),
      "0909876learning"
    );
    await Handler.clickLocator(selector.LinkedIn.continueBtn);
    await Handler.waitForSelector(selector.LinkedIn.InputField("first-name"));
    await Handler.TypeOnLocator(
      selector.LinkedIn.InputField("first-name"),
      "learning"
    );
    await Handler.TypeOnLocator(
      selector.LinkedIn.InputField("last-name"),
      "tester"
    );
    await Handler.clickLocator(selector.LinkedIn.continueBtn);
  }
}
module.exports = new Loginpage();
module.exports.Loginpage = Loginpage;
