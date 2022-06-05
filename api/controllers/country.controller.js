const knex = require("../knex");
const errorCreator = require("../helpers/error");

module.exports = {
    get: async (req, res, next) => {
        const { query } = req;
        try {
            if (Object.keys(query).length !== 0) {
                return res.status(400).json({
                    error: true,
                    message:
                        "Invalid query parameters. Query parameters are not permitted.",
                });
            }
            const rows = await knex("data")
                .select("country")
                .orderBy("country", "asc")
                .groupBy("country");
            const results = rows.map((row) => row.country);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json(errorCreator());
        }
    },
};
