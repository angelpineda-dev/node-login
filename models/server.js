const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            todo: "/api/todo"
        }

        this.database();

        this.middlewares();

        this.routes();
    }

    async database(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.auth, require('../routes/todo'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`listening on port: ${this.port}`)
        })
    }

}

module.exports = Server;