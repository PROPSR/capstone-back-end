const express = require("express");
const quoteRouter = express.Router();
const { getQuotes, getQuote, createQuote, updateQuote, deleteQuote } = require("../controllers/quote.controller");


quoteRouter.get("/", getQuotes);
quoteRouter.get("/:id", getQuote);
quoteRouter.post("/", createQuote);
quoteRouter.patch("/:id", updateQuote);
quoteRouter.delete("/:id", deleteQuote);

module.exports = quoteRouter;