const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        if (!uid) {
            reject("UID required");
        }

        jwt.sign( { uid } , process.env.TOKEN_KEY, {
            expiresIn: '8h',
            algorithm: 'HS256'
        }, (err, token) => {
            if (err) {
                console.log(err);

                reject("Token not generated");
            } else {
                resolve(token)
            }
        });
    })
}

module.exports = generateJWT;