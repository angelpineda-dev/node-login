const { response, request } = require("express");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Token is required",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "No valid token - user",
      });
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "No valid token - user no valid",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "No valid token",
      error
    });
  }
};

module.exports = {
  validarJWT,
};
