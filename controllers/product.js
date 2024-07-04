const { request, response } = require('express');
const Product = require('../models/product');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

async function index(req, res = response) {


    try {
        const products = await Product.find().
            populate('category').
            exec();

        res.json({
            status: true,
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

async function create(req, res) {
    let image = '';

    try {

        if (req.files.image) {
            const { tempFilePath } = req.files.image;
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            console.log(secure_url)
            image = secure_url;
        }

        const product = new Product({...req.body, image});

        const isProduct = await product.save();

        if (!isProduct && image !== '') {
                const urlArr = image.split("/");
                const file = urlArr[urlArr.length - 1];
                const [ public_id ] = file.split(".");

                cloudinary.uploader.destroy(public_id);
        }

        res.json({
            status: true,
            data: product
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
            data: product
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
        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true }) ;

        if (!product) {
            return res.status(404).json({
                status: false,
                error: 'Product not found.'
            })
        }

        res.json({
            status: true,
            data: product
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