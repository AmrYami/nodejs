//Generated By Amr Awwad
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    currency: String,
    customer_id: String,
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", customerSchema);
module.exports = CustomerModel;
