const {
  FadabHelper,
  selectAsync,
  findOneAsync,
} = require("fadab-mysql-helper");

class UserTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblUser";
  }

  vwSelectAsync(selectOptions = null) {
    return selectAsync("vwUserList", selectOptions);
  }

  vwFindAsync(where) {
    return findOneAsync("vwUserList", where);
  }
}

module.exports = UserTransactions;
