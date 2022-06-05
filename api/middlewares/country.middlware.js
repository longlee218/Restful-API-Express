exports.getAllCountries = (req, res, next) => {
    const { query } = req;
    if (Object.keys(query).length !== 0) {
        return res.status(400).json({
            error: true,
            message:
                "Invalid query parameters. Query parameters are not permitted.",
        });
    }
    next();
};
