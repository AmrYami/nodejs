//Generated By Amr Awwad
const express = require("express");

const {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
} = require("../services/CardService");
const {
  getCardValidator,
  createCardValidator,
  updateCardValidator,
  deleteCardValidator,
} = require("../utils/validators/cardValidator");

const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(getCards)
  .post(authService.protect,  createCard);
router
  .route("/:id")
  .get(getCard)
  .put(authService.protect, updateCardValidator, updateCard)
  .delete(authService.protect, deleteCardValidator, deleteCard);
module.exports = router;
