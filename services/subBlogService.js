const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiErors = require("../utils/ApiErors");

const SubBlog = require("../models/subBlogModel");

exports.setBlogIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.blog) req.body.blog = req.params.blogId;
  next();
};
// @desc    Create subBlog
// @route   POST  /api/v1/subblogs
// @access  Private
exports.createSubBlog = asyncHandler(async (req, res) => {
  const { name, blog } = req.body;
  const subBlog = await SubBlog.create({
    name,
    slug: slugify(name),
    blog,
  });
  res.status(201).json({ data: subBlog });
});

// Nested route
// GET /api/v1/blogs/:blogId/subblogs
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.blogId) filterObject = { blog: req.params.blogId };
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of subblogs
// @route   GET /api/v1/subblogs
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubBlog.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: "blog", select: "name -_id" });

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc    Get specific subblog by id
// @route   GET /api/v1/subblogs/:id
// @access  Public
exports.getSubBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subBlog = await SubBlog.findById(id).populate({
    path: "blog",
    select: "name slug -_id",
  });

  if (!subBlog) {
    return next(new ApiErors(`No subblog for this id ${id}`, 404));
  }
  res.status(200).json({ data: subBlog });
});

// @desc    Update specific subblog
// @route   PUT /api/v1/subblogs/:id
// @access  Private
exports.updateSubBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, blog } = req.body;

  const subBlog = await SubBlog.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), blog },
    { new: true }
  );

  if (!subBlog) {
    return next(new ApiErors(`No  subblog for this id ${id}`, 404));
  }
  res.status(200).json({ data: subBlog });
});

// @desc    Delete specific subBlog
// @route   DELETE /api/v1/subblogs/:id
// @access  Private
exports.deleteSubBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subBlog = await SubBlog.findByIdAndDelete(id);

  if (!subBlog) {
    return next(new ApiErors(`No subblog for this id ${id}`, 404));
  }
  res.status(204).send();
});
