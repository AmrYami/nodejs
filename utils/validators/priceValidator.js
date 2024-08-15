//Generated By Amr Awwad
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getPriceValidator = [
  check("id").isMongoId().withMessage("Invalid price id format"),
  validatorMiddleware,
];

exports.createPriceValidator = [
  check("unit_amount")
    .notEmpty()
    .withMessage("unit_amount required")
    .isLength({ min: 2 })
    .withMessage("Too short unit_amount")
    .isLength({ max: 32 })
    .withMessage("Too long unit_amount"),
  validatorMiddleware,

  check("currency")
    .notEmpty()
    .withMessage("currency required")
    .withMessage("Invalid currency"),
    
  check("recurring")
      .notEmpty()
      .withMessage("recurring required")
      .withMessage("Invalid currency"),

  check("product")
        .notEmpty()
        .withMessage("product required")
        .withMessage("Invalid currency")
];

exports.updatePriceValidator = [
  check("name")
    .notEmpty()
    .withMessage("Price required")
    .isLength({ min: 2 })
    .withMessage("Too short price name")
    .isLength({ max: 32 })
    .withMessage("Too long price name"),
  validatorMiddleware,

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .withMessage("Invalid email address"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
];

exports.deletePriceValidator = [
  check("id").isMongoId().withMessage("Invalid price id format"),
  validatorMiddleware,
];
