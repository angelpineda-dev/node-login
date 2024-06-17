const {Schema, model } = require("mongoose");

const TodoSchema = Schema({
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    completed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

TodoSchema.methods.toJSON = function(){
    const {_id, ...todo } = this.toObject();

    todo.id = _id;

    return todo;
}

module.exports = model('todo', TodoSchema);