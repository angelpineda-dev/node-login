const User = require("../models/user")

const validateEmail = async (email) => {
    const isEmail = await User.findOne({email});
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(!email){
        throw new Error("Email is required.");
    }

    if (!emailRegex.test(email)) {
        throw new Error("Email is not valid format.");
    }

    if(isEmail){
        throw new Error("Email already exists.");;
    }
    
}

const validatePassword = async (password = '') => {
    const length = 6

    if (password.length < length) {
        throw new Error(`Password should be at least ${length} characters`);
    }
}

module.exports = {
    validateEmail,
    validatePassword
}