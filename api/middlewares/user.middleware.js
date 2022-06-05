const errorCreator = require("../helpers/error");

const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) {
        return false;
    }
    const date = new Date(dateStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        return false;
    }
    return date.toISOString().startsWith(dateStr);
};

const isDateInPast = (date) => {
    const current = new Date();
    const dob = new Date(date);
    return dob.setHours(0, 0, 0, 0) < current.setHours(0, 0, 0, 0);
};

exports.validateRegisterUser = (req, res, next) => {
    const { body } = req;
    const email = body?.email;
    const password = body?.password;
    if (!email || !password) {
        return res
            .status(400)
            .json(
                errorCreator(
                    "Request body incomplete, both email and password are required."
                )
            );
    }
    next();
};

exports.validateLoginUser = (req, res, next) => {
    const { body } = req;
    const email = body?.email;
    const password = body?.password;
    if (!email || !password) {
        return res
            .status(400)
            .json(
                errorCreator(
                    "Request body incomplete, both email and password are required."
                )
            );
    }
    next();
};

exports.validateUpdateUser = (req, res, next) => {
    const { body } = req;
    const { params } = req;
    const { email } = params;
    if (!req.auth.isAuth) {
        return res
            .status(401)
            .json(
                errorCreator("Authorization header ('Bearer token') not found")
            );
    }
    if (req.auth.user.email !== email) {
        return res.status(403).json(errorCreator("Forbidden"));
    }
    const firstName = body?.firstName;
    const lastName = body?.lastName;
    const dob = body?.dob;
    const address = body?.address;
    if (!firstName || !lastName || !dob || !address) {
        return res
            .status(400)
            .json(
                errorCreator(
                    "Request body incomplete: firstName, lastName, dob and address are required."
                )
            );
    }

    if (
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof address !== "string"
    ) {
        return res
            .status(400)
            .json(
                errorCreator(
                    "Request body invalid: firstName, lastName and address must be strings only."
                )
            );
    }
    if (!isValidDate(dob)) {
        return res
            .status(400)
            .json(
                errorCreator(
                    "Invalid input: dob must be a real date in format YYYY-MM-DD."
                )
            );
    }
    if (!isDateInPast(dob)) {
        return res
            .status(400)
            .json(
                errorCreator("Invalid input: dob must be a date in the past.")
            );
    }
    next();
};
