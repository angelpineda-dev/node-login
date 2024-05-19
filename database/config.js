const mongoose = require('mongoose');

async function dbConnection(){
    try {
        mongoose.set('strictQuery',false);
        
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log("Database online");
    } catch (error) {
        console.log(error)

        throw new Error("Error to connect database");
    }
}

module.exports = {
    dbConnection
};