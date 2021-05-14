const { FadabHelper } = require("fadab-mysql-helper");

class MenuTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblSiparis";
    this.vwName = "masa_ekran";
  }
  vwSelectAsync(options) {
    return selectAsync(this.vwName, options);
  }
}

module.exports = MenuTransactions;