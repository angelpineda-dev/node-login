const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category es required for a product."]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User es required for a product."]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"],
        default: 1
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
    versionKey: false,
});

ProductSchema.methods.toJSON = function(){
    const { _id, ...product } = this.toObject();

    product.id = _id;

    return product;
}

module.exports = model('product', ProductSchema)