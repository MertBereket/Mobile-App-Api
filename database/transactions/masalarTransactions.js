const { FadabHelper } = require("fadab-mysql-helper");

class MasalarTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblMasalar";
  }

}

module.exports = MasalarTransactions;