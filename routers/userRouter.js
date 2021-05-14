const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const userTransactions = TransactionsFactory.creating("userTransactions");
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const userStatusAuthControl = authorization.userStatusAuthControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/user",
  tokenControl,
  authControl,
  userValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await userTransactions.vwSelectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  "/user/:ID",
  tokenControl,
  authControl,
  userValidator.paramId,
  async (req, res) => {
    try {
      const result = await userTransactions.vwFindAsync(req.params);
      res.json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/user",
  tokenControl,
  authControl,
  userValidator.bodyId,
  async (req, res) => {
    try {
      const result = await userTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "There is no such user ID in the system !"
        );
      res.json("The user registration was deleted successfully.");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  "/user",
  tokenControl,
  authControl,
  userValidator.update,
  userStatusAuthControl,
  async (req, res) => {
    try {
      const result = await userTransactions.updateAsync(req.body, {
        userID: req.body.userID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "There is no such user ID in the system !"
        );
      res.json("User information has been updated");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  "/user",
  tokenControl,
  authControl,
  userValidator.insert,
  userStatusAuthControl,
  async (req, res) => {
    try {
      const result = await userTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROROR,
          "There was a problem adding the user !"
        );
      res.json("User registered.");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("Email address is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
