const {Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, "Usar name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required."],
        unique: true
    },
    password: {
        type:String,
        required: [true, "Password is required."]
    }
},{
    timestamps: true,
    versionKey: false,
})

UserSchema.methods.toJSON = function(){
    const { _id, password, ...user } = this.toObject();

    user.uid = _id;

    return user;
};

module.exports = model('User', UserSchema);