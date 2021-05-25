const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const categoryTransactions = TransactionsFactory.creating("categoryTransactions");
const categoryValidator = validators.categoryValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/category",
  tokenControl,
  categoryValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await categoryTransactions.selectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.stack);
    }
  }
);

router.get(
  "/category/:ID",
  tokenControl,
  categoryValidator.paramId,
  async (req, res) => {
    try {
      const result = await categoryTransactions.findOneAsync(req.params);
      res.status(HttpStatusCode.OK).json(result || {});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/category",
  tokenControl,
  authControl,
  categoryValidator.bodyId,
  async (req, res) => {
    try {
      const result = await categoryTransactions.deleteAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The category Id you were looking for was not found!"
        );
      res.json({"result" : "The category was deleted successfully."});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  "/category",
  tokenControl,
  authControl,
  categoryValidator.update,
  async (req, res) => {
    try {
      const result = await categoryTransactions.updateAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          "The category Id you were looking for was not found!"
        );
      res.json({"result" : "Category information has been updated"});
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send({"result" : "Category is already registered in the system !"});
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.post(
  "/category",
  tokenControl,
  authControl,
  categoryValidator.insert,
  async (req, res) => {
    try {
      const result = await categoryTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "There was a problem adding the category!"
        );
      res.json({"result" : "Category inserted."});
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send({"result" : "Category is already registered in the system !"});
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
