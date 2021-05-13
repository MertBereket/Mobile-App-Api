const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require("./commonValidator");

class MenuValidator extends CommonValidator {
  constructor() {}

  static async update(req, res, next) {
    try {
      await joi
        .object({
          ID: joi.number().required(),
          Ad: joi.string().max(20),
          Kategori: joi.string().max(30),
          Fiyat: joi.number(),
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
          Ad: joi.string().max(20).required(),
          Kategori: joi.string().max(30).required(),
          Fiyat: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}
module.exports = MenuValidator;
