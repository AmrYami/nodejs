//Generated By Amr Awwad
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: [true, 'unique'],
    minlength: [3, 'too short'],
    maxlength: [50, 'too long']
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,

}, { timestamps: true }
);
    
  const BlogModel = mongoose.model('Blog', blogSchema);
module.exports = BlogModel;