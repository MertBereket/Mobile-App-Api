const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const commonTransactions = TransactionsFactory.creating("userTransactions");
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require("http-status-codes");
const { errorSender } = require("../utils");

router.post("/login", authValidator.login, async (req, res) => {
  try {
    const result = await commonTransactions.findOneAsync({
      EmailAddress: req.body.EmailAddress,
      Password: req.body.Password,
    });
    if (!result)
      throw errorSender.errorObject(
        HttpStatusCode.BAD_REQUEST,
        "Check your email address or password !"
      );

    const payload = {
      UserID: result.Id,
      UserTypeName: result.UserTypeName,
    };
    const token = jwt.sign(payload, req.app.get("api_key"), {
      expiresIn: "7d",
    });
    res.json({ result, token });
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.delete(
  "/my-account",
  tokenControl,
  authValidator.delete,
  async (req, res) => {
    try {
      const result = await commonTransactions.deleteAsync(
        Object.assign(req.body, {
          Id: req.decode.UserID,
        })
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your account has been deleted.");
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/my-account",
  tokenControl,
  authValidator.update,
  async (req, res) => {
    try {
      const result = await commonTransactions.updateAsync(req.body, {
        Id: req.decode.UserID,
        Password: req.body.Password,
      });

      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your account information has been successfully edited.");
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/change-password",
  tokenControl,
  authValidator.changePassword,
  async (req, res) => {
    try {
      const result = await commonTransactions.updateAsync(
        { Password: req.body.NewPassword },
        {
          Id: req.decode.UserID,
          Password: req.body.Password,
        }
      );
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your password has been changed.");
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  "/password-control",
  tokenControl,
  authValidator.passwordControl,
  async (req, res) => {
    try {
      const result = await commonTransactions.findOneAsync({
        Id: req.decode.UserID,
        Password: req.body.Password,
      });
      if (!result)
        throw errorSender.errorObject(
          HttpStatusCode.BAD_REQUEST,
          "Wrong password !"
        );

      res.json("Password is correct.");
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get("/token-decode", tokenControl, async (req, res) => {
  res.json(req.decode);
});

module.exports = router;
