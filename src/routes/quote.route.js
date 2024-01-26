const express = require("express");
const quoteRouter = express.Router();
const { getQuotes, getQuote, getContractorQuotes, getContractorQuote, createQuote, updateQuote, deleteQuote } = require("../controllers/quote.controller");
const { validateQuoteCreation, validateQuoteUpdate } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");


quoteRouter.get("/", getQuotes);
quoteRouter.get("/:id", getQuote);
quoteRouter.get("/contractor", verifyToken("Contractor"), getContractorQuotes);
quoteRouter.get("/contractor/:id", verifyToken("Contractor"), getContractorQuote);
quoteRouter.post("/", verifyToken("Contractor"), validateQuoteCreation, createQuote);
quoteRouter.patch("/contractor/:id", verifyToken("Contractor"), validateQuoteUpdate, updateQuote);
quoteRouter.delete("/contractor/:id", verifyToken("Contractor"), deleteQuote);

module.exports = quoteRouter;