const { request, response } = require('express');
const Category = require("../models/category");
const User = require('../models/user');
const Product = require('../models/product');

async function isValidCategory(id) {

    const existsCategory = await Category.findById(id);

    if (!existsCategory) {
        throw new Error('Not valid category - id.')
    }
}

async function duplicatedCategory(name) {

    const existsCategory = await Category.findOne({ name });

    if (existsCategory) {
        throw new Error('Category already exists');
    }
}

async function isValidProduct(id) {

    const isProduct = await Product.findById(id);

    if (!isProduct) {
        throw new Error('Not valid product - id.')
    }
}


async function isValidUser(id = '') {

    const isUser = await User.findById(id);

    if (!isUser) {
        throw new Error('User not found.')
    }

}


module.exports = {
    isValidCategory,
    duplicatedCategory,
    isValidUser,
    isValidProduct
}