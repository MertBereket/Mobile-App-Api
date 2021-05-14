const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonUserValidator = require("./commonValidator");

class UserValidator extends CommonUserValidator {
  constructor() {}

  static async find(req, res, next) {
    try {
      await joi
        .object({
          ID: joi.number().min(1).required(),
        })
        .validateAsync({ Id: parseInt(req.params.Id) });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          userName: joi.string(),
          ID: joi.number().required(),
          name: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          surname: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          eMail: joi.string().max(200).email(),
          password: joi.string().max(99).required(),
          UserTypeName: joi.string(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          userName: joi.string().required(),
          name: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          surname: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          eMail: joi.string().max(200).email().required(),
          UserTypeName: joi.string().required(),
          password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = UserValidator;
