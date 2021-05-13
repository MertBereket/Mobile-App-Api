const { queryAsync } = require("fadab-mysql-helper");

class AuthTransactions {
  constructor() {}

  additiveUserTypesAsync(UserTypeName) {
    return queryAsync(
      `SELECT UserTypeName FROM tblUserTypeName WHERE userTypeNumber<(SELECT userTypeNumber FROM tblUserTypeName WHERE UserTypeName=?)`,
      [UserTypeName]
    );
  }
}

module.exports = AuthTransactions;
