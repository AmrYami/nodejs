//Generated By Amr Awwad
const asyncHandler = require("express-async-handler");
const ApiErors = require("../utils/ApiErors");
const ProductModel = require("../models/ProductModel");
const PriceModel = require("../models/PriceModel");
const stripe = require("stripe")(process.env.STRIPE_TOKEN);


exports.createProduct = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const unit_amount = req.body.unit_amount;
  const currency = req.body.currency;
  const recurring = req.body.recurring;
  const product = await stripe.products.create({
    name: name,
    description: description,
  });
  const price = await stripe.prices.create({
    unit_amount: unit_amount,
    currency: currency,
    recurring: {
      interval: recurring,
    },
    product: product.id,
  });

  const productMo = await ProductModel.create({
    name,
    description,
    'stripeID': product.id,
  });
  const PriceMo = await PriceModel.create({
    'unit_amount': unit_amount,
    'currency': currency,
    'product': product.id,
    'stripeID': price.id,
    'recurring': {
      'interval': recurring,
    },
  });

  res.status(201).json({ data: product });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ count: products.length, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // const product = await ProductModel.findById(id);
  const product = await stripe.products.retrieve(id);
  if (!product) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let param = {};
  param.name = req.body.name;
  param.phone = req.body.phone;
  param.email = req.body.email;


  const productData = stripe.products.update(
    id,
    param,
    function(err, product) {
        // asynchronously called
        if(err) {
            console.log(err);
            // res('REQUEST ERROR');
        } 
});

// const product_id = productStripe.id;

  const product = await ProductModel.findOneAndUpdate(
    { product_id: id },
    param,
    { new: true }
  );
  if (!product) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(204).send();
});
