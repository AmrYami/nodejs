//Generated By Amr Awwad
const asyncHandler = require("express-async-handler");
const ApiErors = require("../utils/ApiErors");
const FeatureModel = require("../models/FeatureModel");
const stripe = require("stripe")(process.env.STRIPE_TOKEN);


exports.createFeature = asyncHandler(async (req, res) => {
  console.log(111111111111111);
  const name = req.body.name;
  const lookup_key = req.body.lookup_key;
  const feature = await stripe.entitlements.features.create({
    name: name,
    lookup_key: lookup_key,
  });

  if(req.body.productId){
  const productFeature = await stripe.products.createFeature(
    req.body.productId,
    {
      entitlement_feature: feature.id,
    });
  }
  const featureMo = await FeatureModel.create({
    name,
    lookup_key,
    'productID': req.body.productId || '',
    'stripeID': feature.id,
  });

  res.status(201).json({ data: feature });
});

exports.addFeatureToProduct = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  const featureId = req.body.featureId;
  const productFeature = await stripe.products.createFeature(
    productId,
    {
      entitlement_feature: featureId,
    });
  
  // const featureMo = await ProductModel.update({
  //   name,
  //   description,
  //   'stripeID': feature.id,
  // });

  res.status(201).json({ data: productFeature });
});

exports.getFeatures = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const features = await FeatureModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ count: features.length, data: features });
});

exports.getFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // const feature = await FeatureModel.findById(id);
  const feature = await stripe.features.retrieve(id);
  if (!feature) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: feature });
});

exports.updateFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let param = {};
  param.name = req.body.name;
  param.phone = req.body.phone;
  param.email = req.body.email;


  const featureData = stripe.features.update(
    id,
    param,
    function(err, feature) {
        // asynchronously called
        if(err) {
            console.log(err);
            // res('REQUEST ERROR');
        } 
});

// const feature_id = featureStripe.id;

  const feature = await FeatureModel.findOneAndUpdate(
    { feature_id: id },
    param,
    { new: true }
  );
  if (!feature) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: feature });
});

exports.deleteFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const feature = await FeatureModel.findByIdAndDelete(id);
  if (!feature) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(204).send();
});
