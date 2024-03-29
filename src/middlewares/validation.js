const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.validateHomeowner = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(8),
        userType : Joi.string(),
        address : Joi.string(),
        city : Joi.string(),
        state : Joi.string(),
        phoneNumber : Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateHomeownerUpdate = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().optional().min(0).max(255).trim(),
        lastName : Joi.string().optional().min(0).max(255).trim(),
        email : Joi.string().email().optional().trim().lowercase(),
        password : Joi.string().optional().min(8),
        userType : Joi.string(),
        address : Joi.string().optional(),
        city : Joi.string(),
        state : Joi.string(),
        phoneNumber : Joi.string().optional()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateContractorSignup = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(8),
        phoneNumber : Joi.string().required().min(9).max(13),
        userType : Joi.string().optional(),
        address : Joi.string().optional(),
        city : Joi.string(),
        state : Joi.string(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateContractorUpdate = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().optional().min(0).max(255).trim(),
        lastName : Joi.string().optional().min(0).max(255).trim(),
        email : Joi.string().email().optional().trim().lowercase(),
        password : Joi.string().optional().min(8),
        phoneNumber : Joi.string().optional().min(9).max(13),
        userType : Joi.string().optional(),
        yearsOfExperience : Joi.string().optional(),
        businessAddress : Joi.string().optional(),
        city : Joi.string().optional(),
        state : Joi.string().optional(),
        commsPreference : Joi.string().optional(),
        refrences : Joi.string().optional(),
        workSchedule : Joi.string().optional(),
        licensing : Joi.string().optional(),
        insurance : Joi.string().optional(),
        scopeOfWork : Joi.string().optional(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateLogin = function(req, res, next){
    const schema = Joi.object({
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(8),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateSupplierSignup = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(8),
        phoneNumber : Joi.string().required().min(9).max(13),
        userType : Joi.string().optional(),
        address : Joi.string(),
        city : Joi.string(),
        state : Joi.string()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateSupplierUpdate = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().optional().min(0).max(255).trim(),
        lastName : Joi.string().optional().min(0).max(255).trim(),
        email : Joi.string().email().optional().trim().lowercase(),
        password : Joi.string().optional().min(8),
        userType : Joi.string().optional(),
        businessAddress : Joi.string().optional(),
        city : Joi.string().optional(),
        state : Joi.string().optional(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateQuoteCreation = function(req, res, next){
    const schema = Joi.object({
        amount : Joi.number().required(),
        status : Joi.string().required(),
        dateAvailable : Joi.date().required(),
        priorExperience : Joi.boolean().required(),
        detailsOfPriorExperience : Joi.string().required(),
        paymentTerms : Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateQuoteUpdate = function(req, res, next){
    const schema = Joi.object({
        amount : Joi.number().optional(),
        status : Joi.string().optional(),
        dateAvailable : Joi.date().optional(),
        priorExperience : Joi.boolean().optional(),
        detailsOfPriorExperience : Joi.string().optional(),
        paymentTerms : Joi.string().optional()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateProductCreation = function(req, res, next){
    const schema = Joi.object({
        unitPrice : Joi.number().required(),
        numberInStock : Joi.number().required(),
        name : Joi.string().required(),
        brand : Joi.string().required(),
        category : Joi.string().required(),
        technicalSpecification : Joi.string().required(),
        description : Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateProductUpdate = function(req, res, next){
    const schema = Joi.object({
        unitPrice : Joi.number().optional(),
        numberInStock : Joi.number().optional(),
        name : Joi.string().optional(),
        brand : Joi.string().optional(),
        category : Joi.string().optional(),
        technicalSpecification : Joi.string().optional(),
        description : Joi.string().optional()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateProjectCreation = function(req, res, next){
    const schema = Joi.object({
        name : Joi.string().required(),
        type : Joi.string().required(),
        description : Joi.string().required(),
        budget : Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        permitsRequired : Joi.boolean().required(),
        permits : Joi.string().required(),
        materialRequirements : Joi.string().required(),
        projectPhase : Joi.string().required(),
        address : Joi.string().required(),
        accessibilityNeeds : Joi.string().required(),
    });
    

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateProjectUpdate = function(req, res, next){
    const schema = Joi.object({
        name : Joi.string().optional(),
        type : Joi.string().optional(),
        budget : Joi.number().optional(),
        description : Joi.string().optional(),
        accessibilityNeeds : Joi.string().optional(),
        address : Joi.string().optional(),
        projectPhase : Joi.string().optional(),
        materialRequirements : Joi.string().optional(),
        permitsRequired : Joi.boolean().optional(),
        permits : Joi.array().optional(),
        timeline : Joi.object().optional(),
    });
    

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};

module.exports.validateOrder = function(req, res, next){
    const schema = Joi.object({
        supplier: Joi.objectId().required(),
        product: Joi.objectId().required(),
        quantity : Joi.number().required(),
        additionalCosts : Joi.object()
    });

    const {error} = schema.validate(req.body);
    if(error){
        res.status(400).json({
            message : "An error occured",
            error : error.details[0].message
        });
        return;
    }
    next();
};


