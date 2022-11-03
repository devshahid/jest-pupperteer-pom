const selector = require("../locators/locators");
class Handler {
  async assertionEquals(element, text) {
    expect(element.replace(/\n/g, "").trim()).to.equal(text);
  }
}

module.exports = new Handler();
module.exports.Handler = Handler;
