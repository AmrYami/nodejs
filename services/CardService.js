//Generated By Amr Awwad
const asyncHandler = require("express-async-handler");
const ApiErors = require("../utils/ApiErors");
const CardModel = require("../models/CardModel");
const stripe = require("stripe")(process.env.STRIPE_TOKEN);


exports.createCard = asyncHandler(async (req, res) => {
  // var param = {};
    // param.card ={
    //   number: '4242424242424242',
    //   exp_month: 2,
    //   exp_year:2024,
    //   cvc:'212'
    // }
    const paymentMethod = await  stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: 9,
        exp_year: 2022,
        cvc: '314',
      },
    });
  //  const card = await stripe.tokens.create(param);

   param.stripId = paymentMethod.id;
  const cardMO = await CardModel.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 9,
      exp_year: 2022,
      cvc: '314',
      stripId: paymentMethod.id,
    },
  });


  res.status(201).json({ data: paymentMethod });
});

exports.getCards = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const cards = await CardModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ count: cards.length, data: cards });
});

exports.getCard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // const card = await CardModel.findById(id);
  const card = await stripe.cards.retrieve(id);
  if (!card) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: card });
});

exports.updateCard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let param = {};
  param.name = req.body.name;
  param.phone = req.body.phone;
  param.email = req.body.email;


  const cardData = stripe.cards.update(
    id,
    param,
    function(err, card) {
        // asynchronously called
        if(err) {
            console.log(err);
            // res('REQUEST ERROR');
        } 
});

// const card_id = cardStripe.id;

  const card = await CardModel.findOneAndUpdate(
    { card_id: id },
    param,
    { new: true }
  );
  if (!card) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(200).json({ data: card });
});

exports.deleteCard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const card = await CardModel.findByIdAndDelete(id);
  if (!card) {
    return next(new ApiErors(`not found this ${id}`, 404));
  }
  res.status(204).send();
});
