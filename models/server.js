const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            category: "/api/category",
            products: "/api/product",
            uploads: "/api/uploads",
        }

        this.database();

        this.middlewares();

        this.routes();
    }

    async database() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`listening on port: ${this.port}`)
        })
    }

}

module.exports = Server;