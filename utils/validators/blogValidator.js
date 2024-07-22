const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getBlogValidator = [
  check('id').isMongoId().withMessage('Invalid blog id format'),
  validatorMiddleware,
];

exports.createBlogValidator = [
  check('name')
    .notEmpty()
    .withMessage('Blog required')
    .isLength({ min: 3 })
    .withMessage('Too short blog name')
    .isLength({ max: 32 })
    .withMessage('Too long blog name'),
  validatorMiddleware,
];

exports.updateBlogValidator = [
  check('id').isMongoId().withMessage('Invalid blog id format'),
  validatorMiddleware,
];

exports.deleteBlogValidator = [
  check('id').isMongoId().withMessage('Invalid blog id format'),
  validatorMiddleware,
];