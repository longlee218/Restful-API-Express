const errorCreator = require("../helpers/error");
const { verifyToken } = require("../helpers/token");
const knex = require("../knex");

module.exports = async function (req, res, next) {
    const { headers } = req;
    const { authorization } = headers;
    const authObj = {
        user: {},
        isAuth: false,
    };

    if (!authorization) {
        req.auth = authObj;
        return next();
    }

    const authHeader = authorization.split(" ");
    const bearer = authHeader[0];
    if (bearer !== "Bearer") {
        return res
            .status(401)
            .json(errorCreator("Authorization header is malformed"));
    }
    const token = authHeader[1];
    if (!token) {
        req.auth = authObj;
        return next();
    }

    try {
        const decoded = verifyToken(token);
        const { id } = decoded;
        const user = await knex("users").where("id", id).first();
        authObj.user = user;
        authObj.isAuth = true;
        req.auth = authObj;
        return next();
    } catch (error) {
        let message = "";
        switch (error.message) {
            case "jwt malformed":
                message = "Invalid JWT token";
                break;
            default:
                message = "JWT token has expired";
                break;
        }
        return res.status(401).json(errorCreator(message));
    }
};
