const category = require("../models/category");

async function  isCategory(req, res, next){
    const { id } = req.params;
    const existsCategory = await Category.findById({id});

    if (!existsCategory) {
        
        res.status(400).json({
            status: false,
            message: 'Category already exists'
        })
    }

    return true;
}

module.exports = {
    isCategory
}