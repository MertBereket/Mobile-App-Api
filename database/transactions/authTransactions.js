const { queryAsync } = require("fadab-mysql-helper");

class AuthTransactions {
  constructor() {}

  additiveUserTypesAsync(UserTypeName) {
    return queryAsync(
      `SELECT UserTypeName FROM tblUserType WHERE UserTypeNumber<(SELECT UserTypeNumber FROM tblUserType WHERE UserTypeName=?)`,
      [UserTypeName]
    );
  }
}

module.exports = AuthTransactions;
