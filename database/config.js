const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../models/user');

async function dbConnection(){
    try {
        mongoose.set('strictQuery',false);
        
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log("Database online");

        const defaultUser = await User.findOne({ email: 'admin@test.com'});

        if (!defaultUser) {
            const password = await bcrypt.hash(process.env.ADMIN_PASS, 11);
            
            const newUser = new User({
                name: 'admin',
                email: 'admin@test.com',
                password,
                rol: 'ADMIN'
            })

            await newUser.save();

            console.log('User created: admin');
        }
    } catch (error) {
        console.log(error)

        throw new Error("Error to connect database");
    }
}

module.exports = {
    dbConnection
};