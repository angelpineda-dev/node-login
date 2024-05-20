const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const generateJWT = require('../helpers/generateJWT');

const register = async (req = request, res = response) => {
    const { password, ...data} = req.body;
    
    let user = new User(data);
    
    try {
        
        user.password = await bcrypt.hash(password, 11);

        await user.save();

        res.json({
            status: true,
            user
        });

    } catch (error) {

        let errors = [];

        for (let [key, value] of Object.entries(error.errors)) {
            errors.push({field:key, message: value.message})
        }

        console.log(errors)

        res.json({
            status: false,
            errors
        });
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        
        if (!user) {
            throw ("Email or Password incorrect");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw ("Email or Password incorrect");
        }

        const token = await generateJWT();
        
        res.json({
            status: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        
        res.json({
            status: false,
            error
        })
    }

}

module.exports = {
    register,
    login
}