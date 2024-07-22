const express = require("express");

const {
  createSubBlog,
  getSubBlog,
  getSubCategories,
  updateSubBlog,
  deleteSubBlog,
  setBlogIdToBody,
  createFilterObj,
} = require("../services/subBlogService");
const {
  createSubBlogValidator,
  getSubBlogValidator,
  updateSubBlogValidator,
  deleteSubBlogValidator,
} = require("../utils/validators/subBlogValidator");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access blogId from blog router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setBlogIdToBody, createSubBlogValidator, createSubBlog)
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubBlogValidator, getSubBlog)
  .put(updateSubBlogValidator, updateSubBlog)
  .delete(deleteSubBlogValidator, deleteSubBlog);

module.exports = router;
