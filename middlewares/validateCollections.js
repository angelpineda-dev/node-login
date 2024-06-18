const { request, response } = require('express');
const Category = require("../models/category");

async function  isValidCategory( id ){

    const existsCategory = await Category.findById(id);

    if (!existsCategory) {
        throw new Error('Not valid category - id.')
    }
}

async function duplicatedCategory(name){
    
    const existsCategory = await Category.findOne({name});

    if (existsCategory) {
        throw new Error('Category already exists');
    }
}

module.exports = {
    isValidCategory,
    duplicatedCategory
}