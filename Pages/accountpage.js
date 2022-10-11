const AppHandler = require('../utils/app_handler');
class AccountPage {
  async validateItemCard(title, desc) {
    await AppHandler.assertionToBeWithXpath('Amazon.card_Title', 'innerText', title);
    await AppHandler.assertionToBeWithXpath('Amazon.product_title', 'innerText', desc);
  }
}
module.exports = new AccountPage();
module.exports.AccountPage = AccountPage;
