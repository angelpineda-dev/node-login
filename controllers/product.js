const { request, response } = require('express');
const Product = require('../models/product');

async function index(req, res = response) {

    const products = await Product.find({});

    try {
        res.json({
            status: true,
            products
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

async function create(req, res) {

    try {
        const product = new Product(req.body);
        
        await product.save()

        res.json({
            status:true,
            product
        });

    } catch (error) {
        res.status(400).json(error)
    }

}

async function update(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        res.json({
            status:true,
            product
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            error
        })
    }
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({
                status: false,
                error: 'Product not found.'
            })
        }

        res.json({
            status: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            error
        })
    }
}

module.exports = {
    index,
    create,
    update,
    remove
}