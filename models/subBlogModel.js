const mongoose = require('mongoose');

const subBlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubBlog must be unique'],
      minlength: [2, 'To short SubBlog name'],
      maxlength: [32, 'To long SubBlog name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'SubBlog must be belong to parent blog'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubBlog', subBlogSchema);
