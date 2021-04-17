const joi = require("joi");
const HttpStatusCode = require("http-status-codes");

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          EmailAddress: joi.string().email().max(200).required(),
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async delete(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          FirstName: joi
            .string()
            .min(3)
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          LastName: joi
            .string()
            .min(2)
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          Password: joi.string().max(99).required(),
          EmailAddress: joi.string().min(3).max(200).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async changePassword(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().min(6).max(99).required(),
          NewPassword: joi.string().min(6).max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async passwordControl(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = AuthValidator;
