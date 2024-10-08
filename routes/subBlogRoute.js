//Generated By Amr Awwad
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

const authService = require("../services/authService");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access blogId from blog router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authService.protect,
    setBlogIdToBody,
    createSubBlogValidator,
    createSubBlog
  )
  .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubBlogValidator, getSubBlog)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateSubBlogValidator,
    updateSubBlog
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    deleteSubBlogValidator,
    deleteSubBlog
  );

module.exports = router;
