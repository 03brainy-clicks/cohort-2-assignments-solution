const express = require("express");
const router = express.Router();
const {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
} = require("../controller/IdentityController");

// GET /api/cards
router.get("/", getCards);
// GET /api/cards/:id
router.get("/:id", getCard);
// POST /api/cards
router.post("/", createCard);
// PUT /api/cards/:id
router.put("/:id", updateCard);
// DELETE /api/cards/:id
router.delete("/:id", deleteCard);

module.exports = router;
