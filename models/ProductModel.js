//Generated By Amr Awwad
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    description: {
      type: String,
      required: [true, "description required"],
      lowercase: true,
    },
    stripeID: {
      type: String
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
