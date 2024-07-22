const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../services/blogService");
const {
  getBlogValidator,
  createBlogValidator,
  updateBlogValidator,
  deleteBlogValidator,
} = require("../utils/validators/blogValidator");
const subblogsRoute = require("./subBlogRoute");

const router = express.Router();

// router.post('/', createBlog);
// router.get('/', getBlogs);
// router.get('/:id', getBlog);
// router.put('/:id', updateBlog);
// router.delete('/:id', deleteBlog);
router.use("/:blogId/subblogs", subblogsRoute);
router.route("/").get(getBlogs).post(createBlogValidator, createBlog);
router
  .route("/:id")
  .get(getBlogValidator, getBlog)
  .put(updateBlogValidator, updateBlog)
  .delete(deleteBlogValidator, deleteBlog);
// router.route('/').post(createBlog);
module.exports = router;
