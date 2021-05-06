const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require("./commonValidator");

class MasalarValidator extends CommonValidator {
  constructor() {}

  static async update(req, res, next) {
    try {
      await joi
        .object({
          ID: joi.number().required(),
          Ad: joi.string().max(20).required(),
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
          ID: joi.number().required(),
          Ad: joi.string().max(20).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}
module.exports = MasalarValidator;
