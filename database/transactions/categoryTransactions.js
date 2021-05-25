const { FadabHelper } = require("fadab-mysql-helper");

class MenuTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblCategory";
  }
}
module.exports = MenuTransactions;