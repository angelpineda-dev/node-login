const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
    name: {
        type: String,
        get: capitalize ,
        set: v => v.toUpperCase(),
        required: [true, "Name is required"],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

// Ensure that getters are included in the output
// CategorySchema.set('toJSON', { getters: true });
CategorySchema.set('toObject', { getters: true });


CategorySchema.methods.toJSON = function () {
    const { _id, ...category } = this.toObject();

    category.id = _id;

    return category;
}

function capitalize(word){
    const firstLetter = word.charAt(0);
    const rest = word.substring(1);

    return firstLetter.toUpperCase() + rest.toLowerCase();
}

module.exports = model('category', CategorySchema);