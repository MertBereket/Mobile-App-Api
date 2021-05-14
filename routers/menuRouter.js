const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const menuTransactions = TransactionsFactory.creating("menuTransactions");
const menuValidator = validators.menuValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/menu",
  tokenControl,
  menuValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await menuTransactions.selectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.stack);
    }
  }
);

router.get(
  "/menu/:ID",
  tokenControl,
  menuValidator.paramId,
  async (req, res) => {
    try {
      const result = await menuTransactions.findOneAsync(req.params);
      res.status(HttpStatusCode.OK).json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/menu",
  tokenControl,
  authControl,
  menuValidator.bodyId,
  async (req, res) => {
    try {
      const result = await menuTransactions.deleteAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The menu Id you were looking for was not found!"
        );
      res.json("The menu was deleted successfully.");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  "/menu",
  tokenControl,
  authControl,
  menuValidator.update,
  async (req, res) => {
    try {
      const result = await menuTransactions.updateAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The menu Id you were looking for was not found!"
        );
      res.json("Menu information has been updated");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("Menu is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.post(
  "/menu",
  tokenControl,
  authControl,
  menuValidator.insert,
  async (req, res) => {
    try {
      const result = await menuTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "There was a problem adding the menu!"
        );
      res.json("Menu inserted.");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("Menu is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
