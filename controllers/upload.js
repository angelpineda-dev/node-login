const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers/uploadFile");
const { User, Product } = require("../models");

async function create (req, res) {

    try {
        const pathName = await uploadFile(req.files);

        res.json({
            path: pathName
        })
    } catch (error) {

        res.status(400).json({
            error
        })
    }
}

async function update(req, res) {
    const { collection , id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            break;

        case 'products':
            model = await Product.findById(id);
            break;

        default:
            res.status(400).json({
                message: `Missing logic for collection ${collection}`
            })
            break;
    }

    if (!model) {
        return res.status(400).json({
            message: `ID not found for collection ${collection}.`
        })
    }

    try {

        if (model.image) {
            const fullPath = path.join(__dirname, '../uploads', collection, model.image);

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath)
            }
        }

        const fileName = await uploadFile(req.files, undefined, collection);

        model.image = fileName;
        model.save();

        res.json({
            status: true,
            model,
        });

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

async function show(req, res) {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            break;

        case 'products':
            model = await Product.findById(id);
            break;

        default:
            res.status(400).json({
                message: `Missing logic for collection ${collection}`
            })
            break;
    }

    if (!model) {
        return res.status(400).json({
            message: `ID not found for collection ${collection}.`
        })
    }

    try {

        if (model.image) {
            const fullPath = path.join(__dirname, '../uploads', collection, model.image);

            if (fs.existsSync( fullPath )) {
                return res.sendFile( fullPath )
            }
        }

        const noImage = path.join(__dirname, '../assets', 'no-image.jpg');

        res.sendFile( noImage )

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

async function updateCloudinary(req, res) {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            break;

        case 'products':
            model = await Product.findById(id);
            break;

        default:
            res.status(400).json({
                message: `Missing logic for collection ${collection}`
            })
            break;
    }

    if (!model) {
        return res.status(400).json({
            message: `ID not found for collection ${collection}.`
        })
    }

    if (model.img) {
        const urlArr = model.img.split("/");
        const file = urlArr[urlArr.length - 1];
        const [public_id] = file.split(".");

        cloudinary.uploader.destroy(public_id);
    }

    try {

        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

        model.image = secure_url;
        model.save();

        res.json({
            status: true,
            model,
        });

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

module.exports = {
    create,
    update,
    show,
    updateCloudinary
}