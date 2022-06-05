const knex = require("../knex");
const errorCreator = require("../helpers/error");

module.exports = {
    get: async (req, res, next) => {
        const { query } = req;
        if (!query.country) {
            return res
                .status(400)
                .json(
                    errorCreator(
                        "Invalid query parameters. Query parameters are not permitted."
                    )
                );
        }
        for (const key in query) {
            if (key !== "country" && key !== "populatedWithin") {
                return res.status(400).json(errorCreator("Invalid paramters."));
            }
        }
        const { country, populatedWithin } = query;
        const selectedField = ["id", "name", "country", "region", "subregion"];
        const validPopulateWithin = ["5km", "10km", "30km", "100km"];
        const queryKnex = knex("data")
            .where({ country })
            .select(...selectedField);
        let data = [];
        if (
            !populatedWithin ||
            !validPopulateWithin.includes(populatedWithin)
        ) {
            data = await queryKnex;
        } else {
            const populateFields = validPopulateWithin.map(
                (item) => "population_" + item
            );
            const populateField =
                populateFields[
                    validPopulateWithin.findIndex(
                        (value) => value === populatedWithin
                    )
                ];
            data = await queryKnex.whereRaw(`${populateField} > ?`, [0]);
        }
        return res.json(data);
    },

    find: async (req, res, next) => {
        const { params } = req;
        const id = params.id;
        if (!id) {
            return res
                .status(400)
                .json(
                    errorCreator(
                        "Invalid query parameters. Query parameters are not permitted."
                    )
                );
        }
        // valid JWT
        const selectedField = req.auth.isAuth
            ? [
                  "id",
                  "name",
                  "country",
                  "region",
                  "subregion",
                  "last_eruption",
                  "summit",
                  "elevation",
                  "latitude",
                  "longitude",
                  "population_5km",
                  "population_10km",
                  "population_30km",
                  "population_100km",
              ]
            : [
                  "id",
                  "name",
                  "country",
                  "region",
                  "subregion",
                  "last_eruption",
                  "summit",
                  "elevation",
                  "latitude",
                  "longitude",
              ];
        const data = await knex("data")
            .where("id", id)
            .select(...selectedField)
            .first();
        if (!data) {
            return res
                .status(404)
                .json(errorCreator(`Volcano with ID: ${id} not found.`));
        }
        return res.send(data);
    },
};
