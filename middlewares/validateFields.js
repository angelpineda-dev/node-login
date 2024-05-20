const { validationResult } = require("express-validator");

const validateFields = (req, res, next) =>{
    const validation = validationResult(req);
    
    if (!validation.isEmpty()) {
        console.log(validation)
        
        let errorMsg = validation.errors.map(err => {
            return { field: err.path, msg: err.msg }
        })
        return res.status(400).json(errorMsg);
    }

    next();
};

module.exports = {
    validateFields,
};