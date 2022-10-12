const AppHandler = require('../utils/app_handler');
class AccountPage {
  async validateItemCard(title, desc) {
    await AppHandler.waitForXpath(page, 'Amazon.card_Title', title);
    await AppHandler.assertionToBeWithXpath(page, 'Amazon.card_Title', 'innerText', title);
    await AppHandler.waitForXpath(page, 'Amazon.product_title', desc);
    await AppHandler.assertionToBeWithXpath(page, 'Amazon.product_title', 'innerText', desc);
  }
}
module.exports = new AccountPage();
module.exports.AccountPage = AccountPage;
