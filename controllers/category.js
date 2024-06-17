const { request, response } = require('express');
const Category = require('../models/category');

const index = async (req, res = response) => {

    try {
        const categories = await Category.find({ status: true });

        res.json({
            status: true,
            categories
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const show = async (req, res = response) => {
    const { id } = req.body;

    try {
        const category = await Category.findOne({ id, status: true });

        res.json({
            status: true,
            category
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const create = async (req, res) => {
    const { name } = req.body;

    isDuplicatedCategory(res, name)

    try {

        const newCategory = new Category({
            name,
            user: req.user._id
        });

        await newCategory.save();

        res.status(201).json({
            status: true,
            msg: "Created created"
        })
    } catch (error) {

        res.status(500).json({ status: false, message: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    isDuplicatedCategory(res, name);

    try {
        const category = await Category.findById(id);

        if (!category || !category.status) {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            })
        }

        category.name = name;

        await category.save();

        res.status(200).json({
            status: true,
            category
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { status: false },
            { new: true, runValidators: true }
        )

        if (!category) {
            res.status(404).json({
                status: false,
                msg: "Not found"
            })
        }

        res.json({
            status: true,
            category
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error
        })
    }
}


/* Inner validations */

// could be a middleware
const isDuplicatedCategory = async (res, word) => {
    const name = word.toUpperCase()

    const isCategory = await Category.findOne({ name });

    if (isCategory) {

        return res.json({
            status: false,
            message: 'Category already exists'
        })
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    remove
}