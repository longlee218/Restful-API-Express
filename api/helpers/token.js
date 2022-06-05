const jwt = require("jsonwebtoken");

exports.generateToken = (payload) =>
    jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: +process.env.TOKEN_LIFE_TIME * 10, // convert seconds to miliseconds token life time 1 day
    });

exports.verifyToken = (token) => jwt.verify(token, process.env.PRIVATE_KEY);
