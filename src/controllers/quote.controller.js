const Quote = require("../models/quote.model");
const Contractor = require("../models/contractor.model");

module.exports.getQuotes = async function(req, res){
    try {
        const quotes = await Quote.find();
        if(!quotes) {
            return res.status(404).json({
                message: "Quotes not available"
            });
        };
        res.status(200).json({
            message: "Quotes retrieved successfully",
            quotes: quotes
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Quotes retrieval failed"
        });
    };
};

module.exports.getQuote = async function(req, res){
    try {
        const quoteId = req.params.id;
        const quote = await Quote.findById(quoteId);
        if(!quote) {
            return res.status(404).json({
                message: "Quote not found"
            });
        };
        res.status(200).json({
            message: "Quote retrieval successful",
            quote: quote
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to retrieve quote"
        });
    };
};

module.exports.getContractorQuotes = async function (req, res) {
    try {
        const id = req.user.id;
        const contractor = await Contractor.findById(id);
        if(!contractor) {
            return res.status(404).json({
                message: "Contractor not found"
            });
        };
        const quotes = await Quote.find({contractor: contractor._id});
        if (!quotes) {
            return res.status(404).json({
                message: "Contractor has no quotes"
            });
        };
        res.status(200).json({
            message: "Quotes retrieval successful",
            quotes: quotes
        });
    } catch (error) {
        res.status(500).json({
            message: "Quotes retrieval failed",
            error: error.message
        });
    };
};

module.exports.getContractorQuote = async function (req, res) {
    try {
        const id = req.user.id;
        const quoteId = request.params.id;
        const contractor = await Contractor.findById(id);
        if (!contractor) {
            return res.status(404).json({
                message: "Contractor not found"
            });
        };
        const quote = await Quote.findOne({_id: quoteId, contractor: contractor._id});
        if (!quote) {
            return res.status(404).json({
                message: "Quote not found"
            });
        };
        res.status(200).json({
            message: "Quote retrieval successful",
            quote: quote
        })
    } catch (error) {
        res.status(500).json({
            message: "Quote retrieval failed",
            error: error.message
        });
    };
};

module.exports.createQuote = async function(req, res){
    try {
        const id = req.user.id;
        const contractor = await Contractor.findById(id);
        if(!contractor) {
            return res.status(404).json({
                message: "Contractor not found"
            });
        };
        const { project, amount, status, dateAvailable, priorExperience, detailsOfPriorExperience, paymentTerms } = req.body;
        const newQuote = new Quote({
            contractor: Contractor._id,
            project,
            amount,
            status,
            dateAvailable,
            priorExperience,
            detailsOfPriorExperience,
            paymentTerms
        });
        await newQuote.save();
        res.status(200).json({
            message: "New quote created",
            quote: newQuote
        });
    } catch (error) {
        res.status(500).json({
            message: "Quote creation failed"
        });
    };
};

module.exports.updateQuote = async function(req, res){
    try {
        const id = req.user.id;
        const quoteId = req.params.id;
        const quote = await Quote.findOne({ _id: quoteId, contractor: id });

        if(!quote) {
            return res.status(402).json({
                message: "You are not authorized to update this quote"
            });
        };
        const { amount, status, dateAvailable, priorExperience, detailsOfPriorExperience, paymentTerms } = req.body;
        const updatedQuote = await Quote.findByIdAndUpdate(quoteId, {
            amount,
            status,
            dateAvailable,
            priorExperience,
            detailsOfPriorExperience,
            paymentTerms,
        }, { new: true });
        res.status(200).json({
            message: "Quote updated successfully",
            quote: updatedQuote
        })
    } catch (error) {
       res.status(500).json({
        message: "Quote update failed",
        error: error.message
       }); 
    };
};

module.exports.deleteQuote = async function(req, res){
    try {
        const id = req.user.id;
        const quoteId = req.params.id;
        const contractor = await Contractor.findById(id);
        if (!contractor) {
            return res.status(404).json({
                message: "Contractor not found"
            });
        };
        const deletedQuote = await Quote.findByIdAndDelete(quoteId);
        if(!deletedQuote) {
            return res.status(404).json({
                message: "Quote not found"
            });
        };
        res.status(200).json({
            message: "Quote deleted successfully",
            quote: deletedQuote
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed To Delete Product"
        }); 
    };
};