const BlogModel = require("../models/blogModels");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiErors = require("../utils/ApiErors");

// exports.createBlog = (req, res) => {
//     const name = req.body.name;
//     console.log(name, slugify(name));
//     BlogModel.create(
//         {
//             name,
//             slug: slugify(name)
//         }
//     )
//         .then((blog) => res.status(201).json({ data: blog }))
//         .catch((err) => res.status(400).send(err));

// }
exports.createBlog = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const blog = await BlogModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: blog });
});

exports.getBlogs = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const blogs = await BlogModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ count: blogs.length, data: blogs });
});

exports.getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const blog = await BlogModel.findById(id);
  if (!blog) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: blog });
});

exports.updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const blog = await BlogModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!blog) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: blog });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const blog = await BlogModel.findByIdAndDelete(id);
  if (!blog) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(204).send();
});
