const {
  FadabHelper,
  findOneAsync,
  selectAsync,
} = require("fadab-mysql-helper");

class MasalarTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblMasalar";
    this.vwName = "vwMasalar";
  }

  vwSelectAsync(options) {
    return selectAsync(this.vwName, options);
  }

  vwFindOneAsync(where) {
    return findOneAsync(this.vwName, where);
  }
}

module.exports = MasalarTransactions;
