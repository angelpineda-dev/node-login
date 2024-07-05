const { request, response } = require('express');

const cloudinary = require('cloudinary').v2;

const Product = require('../models/product');

cloudinary.config(process.env.CLOUDINARY_URL);

async function show(req, res = response) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)
            .populate('category')
            .exec();
        
        if (!product) {
            res.status(404).json({
                status:false,
                message: `Product not found.`
            })
        }

        res.json({
            status: true,
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

async function index(req, res = response) {
    const { limit = 10, page = 1, search = '' } = req.query;

    const query = search 
        ? { status: true, $text: { $search: `\"${search}\"` }}
        : { status: true }

    let skip = (page - 1) * limit;
    
    try {
        const [ total, products ] = await Promise.all([
            Product.countDocuments(),
            Product.find(query)
                .populate('category', 'name')
                .skip(Number( skip ))
                .limit(Number( limit ))
                .exec()
        ]);

        const totalPages = Math.ceil( total / limit);

        res.json({
            status: true,
            data: { 
                products, 
                pagination: { 
                    total,
                    itemsPerPage: limit,
                    page,
                    totalPages
                 } 
            }
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

async function create(req, res) {
    let image;

    try {

        if (req?.files && req.files?.image) {
            const { tempFilePath } = req.files.image;
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath, {
                format: 'jpg'
            } );
            image = secure_url;
        }

        const product = new Product({...req.body, image});
        const isProduct = await product.save();

        if (!isProduct && !!image) {
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

        if (!product || !product.status ) {
            return res.status(404).json({
                status: false,
                message: 'Product not found.'
            })
        }

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
    show,
    index,
    create,
    update,
    remove
}