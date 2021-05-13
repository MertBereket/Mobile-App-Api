const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const masalarTransactions = TransactionsFactory.creating("masalarTransactions");
const masalarValidator = validators.masalarValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const limitedAuthControl = authorization.limitedAuthControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/masalar",
  tokenControl,
  masalarValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await masalarTransactions.vwSelectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.stack);
    }
  }
);

router.get(
  "/masalar/:Id",
  tokenControl,
  masalarValidator.paramId,
  async (req, res) => {
    try {
      const result = await masalarTransactions.vwFindOneAsync(req.params);
      res.status(HttpStatusCode.OK).json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/masalar",
  tokenControl,
  authControl,
  masalarValidator.bodyId,
  async (req, res) => {
    try {
      const result = await masalarTransactions.deleteAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The masalar Id you were looking for was not found!"
        );
      res.json("The masalar was deleted successfully.");
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  "/masalar",
  tokenControl,
  authControl,
  masalarValidator.update,
  async (req, res) => {
    try {
      const result = await masalarTransactions.updateAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The masalar Id you were looking for was not found!"
        );
      res.json("masalar information has been updated");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("masalar is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.post(
  "/masalar",
  tokenControl,
  authControl,
  masalarValidator.insert,
  async (req, res) => {
    try {
      const result = await masalarTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "There was a problem adding the masalar!"
        );
      res.json("masalar inserted.");
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send("masalar is already registered in the system !");
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
