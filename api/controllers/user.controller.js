const knex = require("../knex");
const errorCreator = require("../helpers/error");
const { generateToken } = require("../helpers/token");

module.exports = {
    regsiter: async (req, res, next) => {
        const { body } = req;
        const { email, password } = body;
        try {
            const user = await knex("users").where("email", email).first();
            if (user) {
                return res
                    .status(409)
                    .json(errorCreator("User already exists."));
            }
            await knex("users").insert({
                email,
                password,
            });
            return res.status(201).json({ message: "User created." });
        } catch (error) {
            return res.status(500).json(errorCreator());
        }
    },

    login: async (req, res, next) => {
        const { body } = req;
        const { email, password } = body;
        try {
            const user = await knex("users").where({ email, password }).first();
            if (!user) {
                return res
                    .status(401)
                    .json(errorCreator("Incorrect email or password."));
            }
            const token = generateToken({ id: user.id, email: user.email });
            return res.json({
                token,
                token_type: "Bearer",
                expires_in: +process.env.TOKEN_LIFE_TIME,
            });
        } catch (error) {
            return res.status(500).json(errorCreator());
        }
    },

    profile: async (req, res, next) => {
        const { params } = req;
        const { email } = params;
        const isAuth = req.auth.isAuth && email === req.auth.user?.email;
        const selectedField = isAuth
            ? ["email", "firstName", "lastName", "address", "dob"]
            : ["email", "firstName", "lastName"];

        const user = await knex("users")
            .where("email", email)
            .select(...selectedField)
            .first();
        if (!user) {
            return res.status(404).json(errorCreator("User not found."));
        }
        return res.json(user);
    },

    update: async (req, res, next) => {
        const { params } = req;
        const { email } = params;
        const { body } = req;
        const { firstName, lastName, dob, address } = body;
        try {
            await knex("users").where("email", email).update({
                lastName,
                firstName,
                dob,
                address,
            });
            const userUpdated = await knex("users")
                .where("email", email)
                .select("email", "firstName", "lastName", "dob", "address")
                .first();
            return res.json(userUpdated);
        } catch (error) {
            console.log(error);
            return res.status(500).json(errorCreator());
        }
    },
};
