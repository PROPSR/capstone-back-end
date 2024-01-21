const express = require("express");
const quoteRouter = express.Router();
const quoteController = require("../controllers/quote");


quoteRouter.get("/", quoteController.getQuotes);
quoteRouter.get("/:id", quoteController.getQuote);
quoteRouter.post("/", quoteController.createQuote);
quoteRouter.patch("/:id", quoteController.updateQuote);
quoteRouter.delete("/:id", quoteController.deleteQuote);

module.exports = quoteRouter;