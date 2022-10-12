const Handler = require('../utils/handlers');
const selector = require('../locators/locators');
class AccountPage {
  async validateItemCard(title, desc) {
    await Handler.waitForXpath(page, selector.Amazon.card_Title(title));
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.card_Title(title),
      'innerText',
      title,
    );
    await Handler.waitForXpath(page, selector.Amazon.product_title(desc));
    await Handler.assertionToBeWithXpath(
      page,
      selector.Amazon.product_title(desc),
      'innerText',
      desc,
    );
  }
}
module.exports = new AccountPage();
module.exports.AccountPage = AccountPage;
