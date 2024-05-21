const { validationResult } = require("express-validator");

const validateFields = (req, res, next) =>{
    const validation = validationResult(req);
    
    if (!validation.isEmpty()) {
        console.log(validation)
        
        let errorMsg = validation.errors.map(err => {
            return `${err.msg} - ${err.path}`;
        })

        return res.status(400).json({
            status: false,
            error: errorMsg
        });
    }

    next();
};

module.exports = {
    validateFields,
};