const express = require("express");
const quoteRouter = express.Router();
const { getQuotes, getQuote, getContractorQuotes, getContractorQuote, createQuote, updateQuote, deleteQuote } = require("../controllers/quote.controller");
const { validateQuoteCreation, validateQuoteUpdate } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");


quoteRouter.get("/", getQuotes);
quoteRouter.get("/:id", getQuote);
quoteRouter.get("/quotes", verifyToken("Contractor"), getContractorQuotes);
quoteRouter.get("/quotes/:id", verifyToken("Contractor"), getContractorQuote);
quoteRouter.post("/", verifyToken("Contractor"), validateQuoteCreation, createQuote);
quoteRouter.patch("/quotes/:id", verifyToken("Contractor"), validateQuoteUpdate, updateQuote);
quoteRouter.delete("/quotes/:id", verifyToken("Contractor"), deleteQuote);

module.exports = quoteRouter;