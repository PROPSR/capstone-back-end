const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.validateHomeowner = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(6),
        userType : Joi.string(),
        address : Joi.string().required(),
        profilePhoto : Joi.string(),
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

module.exports.validateContractorSignup = function(req, res, next){
    const schema = Joi.object({
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(6),
        phoneNumber : Joi.string().required().min(9).max(13),
        userType : Joi.string().optional(),
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
        password : Joi.string().optional().min(6),
        phoneNumber : Joi.string().optional().min(9).max(13),
        userType : Joi.string().optional(),
        yearsOfExperience : Joi.string().optional(),
        businessAddress : Joi.string().optional(),
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
        password : Joi.string().required().min(6),
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
        password : Joi.string().required().min(6),
        phoneNumber : Joi.string().required().min(9).max(13),
        userType : Joi.string().optional(),
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
        firstName : Joi.string().required().min(0).max(255).trim(),
        lastName : Joi.string().required().min(0).max(255).trim(),
        email : Joi.string().email().required().trim().lowercase(),
        password : Joi.string().required().min(6),
        userType : Joi.string().required(),
        businessAddress : Joi.string().required()
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

module.exports.validateQuote= function(req, res, next){
    const schema = Joi.object({
        contractorId: Joi.objectId().required(),
        projectId: Joi.objectId().required(),
        amount : Joi.number().required(),
        status : Joi.string().required(),
        dateAvailable : Joi.date().required(),
        priorExperience : Joi.boolean().required(),
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


module.exports.validateProduct = function(req, res, next){
    const schema = Joi.object({
        supplierId: Joi.objectId().required(),
        numberInStock : Joi.number().required(),
        unitPrice : Joi.number().required(),
        name : Joi.string().required(),
        brand : Joi.string().required(),
        category : Joi.string().required(),
        status : Joi.string().required(),
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

module.exports.validateProject = function(req, res, next){
    const schema = Joi.object({
        name : Joi.string().required(),
        type : Joi.string().required(),
        budget : Joi.number().required(),
        description : Joi.string().required(),
        homewnerId: Joi.objectId().required(),
        assignedContractor: Joi.objectId().required(),
        status : Joi.string().required(),
        accessibilityNeeds : Joi.string().required(),
        address : Joi.string().required(),
        projectPhase : Joi.string().required(),
        materialRequirements : Joi.string().required(),
        permitsRequired : Joi.boolean().required(),
        permits : Joi.array().required(),
        timeline : Joi.object().required(),
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
        supplierId: Joi.objectId().required(),
        homeownerId: Joi.objectId().required(),
        products: Joi.object().objectId().required(),
        totalPrice : Joi.number().required(),
        additionalCosts : Joi.array().number().required(),
        status : Joi.string().required()
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

