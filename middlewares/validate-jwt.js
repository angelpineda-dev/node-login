const { response, request } = require("express");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({
            msg: "Token is required",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.TOKEN_KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "No valid token - user not found",
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: "No valid token - no valid user",
            });
        }

        req.user = user;

        next();
    } catch (error) {

        res.status(401).json({
            error,
            message: "No valid token",
        });
    }
};

module.exports = {
    validateJWT,
};
