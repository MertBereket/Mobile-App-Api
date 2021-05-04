const { queryAsync } = require("fadab-mysql-helper");

class AuthTransactions {
  constructor() {}

  additiveUserTypesAsync(UserTypeName) {
    return queryAsync(
      `SELECT userTypeName FROM tblUserTypeName WHERE userTypeNumber<(SELECT userTypeNumber FROM tblUserTypeName WHERE userTypeName=?)`,
      [UserTypeName]
    );
  }
}

module.exports = AuthTransactions;
