const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const siparisTransactions = TransactionsFactory.creating("siparisTransactions");
const siparisValidator = validators.siparisValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.get(
  "/siparis",
  tokenControl,
  siparisValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await siparisTransactions.selectAsync(req.query);
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.stack);
    }
  }
);

router.get(
  "/siparis/:ID",
  tokenControl,
  siparisValidator.paramId,
  async (req, res) => {
    try {
      const result = await siparisTransactions.findOneAsync(req.params);
      res.status(HttpStatusCode.OK).json(result || {});
    } 
    catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/siparis",
  tokenControl,
  authControl,
  siparisValidator.bodyId,
  async (req, res) => {
    try {
      const result = await siparisTransactions.deleteAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          {"result" : "The siparis Id you were looking for was not found!"}
        );
      res.json({"result" : "The siparis was deleted successfully."});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/siparis/delete/:ID",
  tokenControl,
  siparisValidator.paramId,
  async (req, res) => {
    try {
      const result = await siparisTransactions.deleteAsync(req.params, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          {"result" :"The siparis Id you were looking for was not found!"}
        );
      res.json({"result" : "The siparis was deleted successfully."});
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);


router.put(
  "/siparis",
  tokenControl,
  authControl,
  siparisValidator.update,
  async (req, res) => {
    try {
      const result = await siparisTransactions.updateAsync(req.body, {
        ID: req.body.ID,
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          {"result" : "The siparis Id you were looking for was not found!"}
        );
      res.json({"result" : "Siparis information has been updated"});
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send({"result" : "Siparis is already registered in the system !"});
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.post(
  "/siparis",
  tokenControl,
  authControl,
  siparisValidator.insert,
  async (req, res) => {
    try {
      const result = await siparisTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          {"result" : "There was a problem adding the siparis!"}
        );
      res.json({"result" : "Siparis inserted."});
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send({"result" : "Siparis is already registered in the system !"});
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
