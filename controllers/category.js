const { request, response } = require('express');
const Category = require('../models/category');
const Product = require('../models/product');

const index = async (req, res = response) => {
    const { limit = 10, page = 1, search = '' } = req.query;

    const query = search
        ? { status: true, $text: { $search: `\"${search}\"` } }
        : { status: true }

    let skip = (page - 1) * limit;

    try {
        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find( query )
                .skip( Number( skip ))
                .limit( Number( limit))
        ]);

        const totalPages = Math.ceil(total / limit);

        res.json({
            status: true,
            data: {
                categories, 
                pagination: {
                    total,
                    itemsPerPage: limit,
                    page,
                    totalPages
                } 
            }
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
            data:  category
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
    
    try {

        const category = new Category({
            name,
            user: req.user._id
        });

        await category.save();

        res.status(201).json({
            status: true,
            data: category
        })
    } catch (error) {
        res
            .status(500)
            .json({ status: false, message: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate(
            id, 
            req.body, 
            {new: true, runValidators: true}
        );

        if (!category || !category.status) {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            })
        }

        res.status(201).json({
            status: true,
            data: category
        })
    } catch (error) {
        res
            .status(500)
            .json({ status: false, message: error.message });
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
            data: category
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
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