const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubBlogValidator = [
  check("id").isMongoId().withMessage("Invalid Subblog id format"),
  validatorMiddleware,
];

exports.createSubBlogValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubBlog required")
    .isLength({ min: 2 })
    .withMessage("Too short Subblog name")
    .isLength({ max: 32 })
    .withMessage("Too long Subblog name"),
  check("blog")
    .notEmpty()
    .withMessage("subBlog must be belong to blog")
    .isMongoId()
    .withMessage("Invalid Blog id format"),
  validatorMiddleware,
];

exports.updateSubBlogValidator = [
  check("id").isMongoId().withMessage("Invalid Subblog id format"),
  validatorMiddleware,
];

exports.deleteSubBlogValidator = [
  check("id").isMongoId().withMessage("Invalid SubBlog id format"),
  validatorMiddleware,
];
